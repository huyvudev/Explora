import { create } from "zustand";
import EncryptedStorage from 'react-native-encrypted-storage';
import { User } from "../types/";
import { getCurrentUser } from "../services/api/user";
import * as authService from "../services/api/auth";

interface AuthStore {
    isLoading: boolean;
    authenticated: boolean;
    user?: User;

    login: (email: string, password: string) => Promise<void>;

    logout: () => Promise<void>;

    loadCurrentUser: () => Promise<void>;
}

const useAuthStore = create<AuthStore>((set, get) => ({
    isLoading: true,
    authenticated: false,
    user: undefined,

    async login(email: string, password: string) {
        const data = await authService.login(email, password);

        await EncryptedStorage.setItem("accessToken", data.accessToken);

        set({
            authenticated: true,
            user: data.user
        });
    },

    async logout() {
        set({
            authenticated: false,
            user: undefined,
            isLoading: false,
        });

        await EncryptedStorage.clear();
    },

    async loadCurrentUser() {
        const value = await EncryptedStorage.getItem("accessToken");
        
        if (!value) {
            set({
                authenticated: false,
                user: undefined,
                isLoading: false,
            });
            return;
        };

        console.log(value);

        set({
            isLoading: true,
        });

        const user = await getCurrentUser();

        if (user) {
            set({
                authenticated: true,
                user,
                isLoading: false,
            });
        } else {
            get().logout();
        }
    },
}));

export default useAuthStore;