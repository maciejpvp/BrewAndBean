import {
    signIn,
    signOut,
    getCurrentUser,
    fetchUserAttributes,
    fetchAuthSession,
    type AuthSession,
} from 'aws-amplify/auth';

export interface UserProfile {
    userId: string;
    username: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    groups: string[];
}

export async function authLogin(username: string, password: string): Promise<void> {
    const { isSignedIn, nextStep } = await signIn({ username, password });
    if (!isSignedIn) {
        throw new Error(`Additional step required: ${nextStep.signInStep}`);
    }
}

export async function authLogout(): Promise<void> {
    await signOut();
}

export async function getAuthenticatedUserProfile(): Promise<UserProfile | null> {
    try {
        const { userId, username } = await getCurrentUser();
        const attrs = await fetchUserAttributes();

        const session = await fetchAuthSession();

        const groups = extractCognitoGroups(session);

        return {
            userId,
            username,
            email: attrs.email ?? '',
            phone: attrs.phone_number ?? '',
            firstName: attrs.given_name ?? '',
            lastName: attrs.family_name ?? '',
            groups,  
        };
    } catch {
        // Not signed in
        return null;
    }
}

const extractCognitoGroups = (session: AuthSession) => {
    const groups = session.tokens?.idToken?.payload['cognito:groups'] as string[];
    return groups ?? [];
}