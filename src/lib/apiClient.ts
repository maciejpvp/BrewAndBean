import axios from 'axios';

declare const BASE_URL: string;

console.log(BASE_URL);

export const API_URL = `${BASE_URL}/api`;
export const CDN_URL = `${BASE_URL}/cdn`;

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach the Amplify id token to every request when available
apiClient.interceptors.request.use(async (config) => {
    try {
        const { fetchAuthSession } = await import('aws-amplify/auth');
        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch {
        // Not signed in — proceed without auth header
    }
    return config;
});
