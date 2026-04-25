// Caminho: functions/src/index.ts
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import axios from "axios";

// Inicializa o app admin para ter acesso irrestrito ao Firestore interno
admin.initializeApp();
const db = admin.firestore();

// Configurações do Cache
const CACHE_COLLECTION = "ibge_cache";
const CACHE_EXPIRATION_DAYS = 30; // Dados do IBGE mudam devagar (anual/mensal)

export const querySidra = onRequest(
    {
        cors: true, // Permite requisições do seu front-end
        timeoutSeconds: 60,
    },
    async (req, res) => {
        try {
            const { agregado, periodos, localidades, variaveis, classificacao } = req.query;

            if (!agregado) {
                res.status(400).json({ error: "O parâmetro 'agregado' é obrigatório." });
                return;
            }

            // 1. Montar a URL da API oficial do IBGE
            let ibgeUrl = `https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}`;
            if (periodos) ibgeUrl += `/periodos/${periodos}`;
            if (variaveis) ibgeUrl += `/variaveis/${variaveis}`;

            const queryParams = new URLSearchParams();
            if (localidades) queryParams.append("localidades", localidades as string);
            if (classificacao) queryParams.append("classificacao", classificacao as string);

            if (queryParams.toString()) {
                ibgeUrl += `?${queryParams.toString()}`;
            }

            // 2. Criar uma chave de cache baseada na URL
            // Convertendo em base64 e limpando para formar um ID válido no Firestore
            const cacheKey = Buffer.from(ibgeUrl).toString('base64').replace(/[/+=]/g, '_');
            const cacheRef = db.collection(CACHE_COLLECTION).doc(cacheKey);
            const cacheDoc = await cacheRef.get();

            // 3. Verificar o Firestore (Cache Hit)
            if (cacheDoc.exists) {
                const data = cacheDoc.data();
                const timestamp = data?.timestamp?.toDate();
                const diffDays = (new Date().getTime() - timestamp.getTime()) / (1000 * 3600 * 24);

                if (diffDays < CACHE_EXPIRATION_DAYS) {
                    logger.info("Cache hit!", { cacheKey });
                    // Retorna direto do banco de dados (muito rápido e gratuito no Firebase)
                    res.status(200).json({ source: "cache", data: data?.payload });
                    return;
                }
            }

            // 4. Caso não tenha cache (Cache Miss), consultar o IBGE
            logger.info("Cache miss. Consultando IBGE...", { ibgeUrl });
            const response = await axios.get(ibgeUrl);
            const payload = response.data;

            // 5. Salvar resultado no Firestore sem bloquear o retorno ao usuário
            cacheRef.set({
                payload,
                url: ibgeUrl,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            }).catch(err => logger.error("Erro ao escrever cache:", err));

            // 6. Retornar dados frescos ao Frontend
            res.status(200).json({ source: "ibge_api", data: payload });

        } catch (error: any) {
            logger.error("Erro BFF IBGE:", error.message);
            res.status(500).json({ error: "Erro ao consultar base governamental." });
        }
    }
);