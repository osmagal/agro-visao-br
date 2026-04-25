import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();
const CACHE_COLLECTION = 'ibge-cache';
const CACHE_TTL_SECONDS = 3600;

const createCacheKey = (path: string, params: Record<string, string | string[]>) => {
  const sortedKeys = Object.keys(params).sort();
  const normalizedParams = sortedKeys
    .map((key) => {
      const value = params[key];
      return Array.isArray(value)
        ? `${key}=${value.sort().join(',')}`
        : `${key}=${value}`;
    })
    .join('&');
  return `${path}?${normalizedParams}`;
};

export const querySidra = functions
  .region('us-central1')
  .https.onRequest(async (req, res) => {
    try {
      const path = Array.isArray(req.query.path) ? req.query.path[0] : String(req.query.path || 'values');
      const params: Record<string, string | string[]> = {};

      for (const [key, value] of Object.entries(req.query)) {
        if (key === 'path') continue;
        params[key] = value as string | string[];
      }

      const cacheKey = createCacheKey(path, params);
      const cacheRef = db.collection(CACHE_COLLECTION).doc(cacheKey);
      const cacheDoc = await cacheRef.get();

      if (cacheDoc.exists) {
        const cached = cacheDoc.data();
        const expiresAt = cached?.expiresAt as admin.firestore.Timestamp | undefined;

        if (expiresAt?.toMillis() > Date.now()) {
          return res.status(200).json({ source: 'cache', data: cached.payload });
        }
      }

      const queryString = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => queryString.append(key, item));
        } else {
          queryString.append(key, value);
        }
      });

      const url = `https://apis.sidra.ibge.gov.br/${path}?${queryString.toString()}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`IBGE request failed with status ${response.status}`);
      }

      const payload = await response.json();
      await cacheRef.set({
        path,
        params,
        payload,
        expiresAt: admin.firestore.Timestamp.fromMillis(Date.now() + CACHE_TTL_SECONDS * 1000),
        updatedAt: admin.firestore.Timestamp.now(),
      });

      return res.status(200).json({ source: 'ibge', data: payload });
    } catch (error) {
      console.error('querySidra error', error);
      return res.status(500).json({ error: String(error) });
    }
  });
