import type { UserProfile } from "../services/authService";

export const getUser = (): UserProfile => {
    const obj = localStorage.getItem('brew-and-bean-user');

    const user = JSON.parse(obj || '{}').state;
    return user;
};