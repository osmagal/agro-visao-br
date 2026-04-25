import { buildFunctionUrl } from './firebase';

export interface QuerySidraResult<T = unknown> {
  source: string;
  data: T;
}

export const fetchSidra = async <T = unknown>(query: Record<string, string | number | boolean>) => {
  const url = buildFunctionUrl('querySidra', query);
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Falha ao consultar o IBGE: ${response.statusText}`);
  }

  return (await response.json()) as QuerySidraResult<T>;
};
