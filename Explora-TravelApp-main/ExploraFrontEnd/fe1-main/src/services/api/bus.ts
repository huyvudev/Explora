import { Bus } from "../../types";
import axios from "./axios";

export async function createBus(data: {
    idNhaXe: number;
    busName: string;
    startPoint: string;
    endPoint: string;
    startTime: Date;
    price: number;
    slot: number;
}) {
    await axios.post("/api/bus/create", {...data});
}

export async function updateBus(id: number, data: {
    startTime: Date;
    price: number;
}) {
    await axios.put(`/api/bus/update/${id}`, {...data});
}

export async function deleteBus(id: number) {
    await axios.delete(`/api/bus/delete/${id}`);
}

export async function getAllBus(): Promise<Bus[]> {
    const res = await axios.get("/api/bus/get-all");

    return res.data.bus;
}

export async function getBusById(id: number): Promise<Bus | null> {
    try {
        const res = await axios.get(`/api/bus/get-by-id/${id}`);
        
        return res.data.bus;
    } catch (error) {
        return null;   
    }
}

export async function searchBus(input: {
    startPoint: string;
    endPoint: string;
    startTime: string;
}): Promise<Bus[]> {
    const res = await axios.get("/api/bus/get-by-keyword", {
        params: { ...input }
    });

    return res.data.result;
}