import axios from "axios";
import EncryptedStorage from 'react-native-encrypted-storage';

const instance = axios.create({
    baseURL: "https://exploraapp.azurewebsites.net",
});

instance.interceptors.request.use(async (config) => {
    const accessToken = await EncryptedStorage.getItem("accessToken")
    
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

export default instance;
