import axios from 'axios';

// https://5w9v2sffs8.execute-api.eu-central-1.amazonaws.com/prod
// d17q0wnd7fgmqz.cloudfront.net
const BASE_URL = 'https://d17q0wnd7fgmqz.cloudfront.net/api';

export const apiClient = axios.create({
    baseURL: `${BASE_URL}`,
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
