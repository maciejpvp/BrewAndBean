import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string ?? 'https://d17q0wnd7fgmqz.cloudfront.net';

export const apiClient = axios.create({
    baseURL: `${BASE_URL}/api`,
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
