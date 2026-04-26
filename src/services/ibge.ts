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
        const { agregado, periodos, variaveis, localidades, classificacao } = params;

        // 1. Monta a URL base da API do IBGE
        let url = `https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}`;

        // 2. Adiciona os parâmetros de rota (Períodos e Variáveis)
        if (periodos) url += `/periodos/${periodos}`;
        if (variaveis) url += `/variaveis/${variaveis}`;

        // 3. Adiciona os parâmetros de query string (Localidades e Classificação)
        const queryParams = new URLSearchParams();
        if (localidades) queryParams.append("localidades", localidades);
        if (classificacao) queryParams.append("classificacao", classificacao);

        const queryString = queryParams.toString();
        if (queryString) {
            url += `?${queryString}`;
        }

        // 4. Faz a requisição direta ao IBGE pelo navegador do usuário
        const response = await axios.get(url);

        // 5. Retorna o payload de dados para os componentes de gráfico
        return response.data;

    } catch (error) {
        console.error("Falha ao buscar dados diretamente do IBGE:", error);
        throw new Error("Não foi possível carregar os dados agrícolas no momento.");
    }
};