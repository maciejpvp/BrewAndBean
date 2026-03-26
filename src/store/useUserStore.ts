import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

export interface UserState {
    isLoggedIn: boolean;
    userId: string;
    username: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    groups: string[];
}

interface UserActions {
    setUser: (user: Partial<UserState>) => void;
    clearUser: () => void;
}

const initialState: UserState = {
    isLoggedIn: false,
    userId: '',
    username: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    groups: [],
};

export const useUserStore = create<UserState & UserActions>()(
    devtools(
        persist(
            (set) => ({
                ...initialState,

                setUser: (user) =>
                    set(
                        (state) => ({ ...state, ...user, isLoggedIn: true }),
                        false,
                        'setUser',
                    ),

                clearUser: () =>
                    set({ ...initialState }, false, 'clearUser'),
            }),
            {
                name: 'brew-and-bean-user',
                // Only persist identity info; skip transient fields if added later
                partialize: (state) => ({
                    isLoggedIn: state.isLoggedIn,
                    userId: state.userId,
                    username: state.username,
                    email: state.email,
                    phone: state.phone,
                    firstName: state.firstName,
                    lastName: state.lastName,
                    groups: state.groups,
                }),
            },
        ),
        { name: 'UserStore' },
    ),
);
