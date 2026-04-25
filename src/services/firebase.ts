const baseUrl = import.meta.env.VITE_FIREBASE_FUNCTIONS_URL ?? '';

if (!baseUrl) {
  console.warn('VITE_FIREBASE_FUNCTIONS_URL is not defined. Cloud Functions calls will fail without a valid URL.');
}

export const firebaseFunctionsUrl = baseUrl.replace(/\/+$/, '');

export const buildFunctionUrl = (name: string, queryParams?: Record<string, string | number | boolean>) => {
  const url = new URL(`${firebaseFunctionsUrl}/${name}`);

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
};
