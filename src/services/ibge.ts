// Caminho: src/services/ibge.ts
import axios from "axios";

export interface IbgeParams {
    agregado: string | number;
    periodos?: string;
    variaveis?: string;
    localidades?: string;
    classificacao?: string;
}

export const fetchAgroData = async (params: IbgeParams) => {
    try {
        const isDev = import.meta.env.DEV;
        const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || "agro-visao-br";

        // Aponta dinamicamente: Emulador se for local, Nuvem se for em Produção
        const functionUrl = isDev
            ? `http://127.0.0.1:5001/${projectId}/us-central1/querySidra`
            : `https://querysidra-zzxxccvv-uc.a.run.app`; // Dica: A url exata aparecerá quando você fizer 'firebase deploy --only functions'

        const response = await axios.get(functionUrl, { params });

        // Retorna apenas os dados para facilitar o binding nos componentes dos Dashboards
        return response.data.data;
    } catch (error) {
        console.error("Falha ao buscar dados no BFF AgroVisão:", error);
        throw error;
    }
};