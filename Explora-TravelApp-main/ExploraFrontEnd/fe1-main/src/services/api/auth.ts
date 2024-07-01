import { User } from "../../types";
import axios from "./axios";

export const login = async (
    email: string,
    password: string
): Promise<{
    accessToken: string;
    user: User;
}> => {
    const response = await axios.post("/api/auth/login", {
        email,
        password,
    });

    return {
        accessToken: response.data.accessToken,
        user: response.data.user,
    };
};

export const signUp = async ({
    name,
    email,
    password,
    phoneNumber,
    dateOfBirth,
}: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    dateOfBirth: Date;
}): Promise<void> => {
    await axios.post("/api/auth/Sign-up", {
        name,
        email,
        passwordUser: password,
        phoneNumber,
        dateOfBirth,
        urlAvatar: "https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-479x512-n8sg74wg.png"
    });
};

export const sendResetPasswordEmail = async (email: string): Promise<void> => {
    await axios.post("/api/Auth/Send-email-reset-password", { email });
};

export const resetPassword = async ({
    email,
    password,
    token,
}: {
    email: string;
    password: string;
    token: string;
}): Promise<void> => {
    await axios.post("/api/Auth/reset-password", {
        email,
        passwordUser: password,
        token,
    });
};
