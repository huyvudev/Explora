import { User } from "../../types";
import axios from "./axios";

export const getCurrentUser = async (): Promise<User> => {
    const response = await axios.get("/api/users");

    return response.data;
}