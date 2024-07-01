import { Plane } from "../../types";
import axios from "./axios";

export async function createPlane(data: {
    idAirline: number;
    planeName: string;
    startPoint: string;
    endPoint: string;
    startTime: Date;
    price: number;
    slot: number;
}) {
    await axios.post("/api/plane/create", {...data});
}

export async function getAllPlanes(): Promise<Plane[]> {
    const response = await axios.get("/api/plane/get-all");

    return response.data;
}

export async function getPlaneById(id: number): Promise<Plane | null> {
    try {
        const response = await axios.get(`/api/plane/get-by-id/${id}`);
        return response.data.plane;
    } catch (error) {
        return null;
    }
}

export async function searchPlanes(input: {
    startPoint: string;
    endPoint: string;
    startTime: string;
}): Promise<Plane[]> {
    const res = await axios.get("/api/Plane/Get-by-keyword", {
        params: {...input}
    });

    return res.data.result;
}

export async function updatePlane(id: number, data: {
    price: number,
    startTime: Date
}): Promise<Plane> {
    const response = await axios.put(`/api/plane/update/${id}`, {
        ...data
    });

    return response.data.plane;
}

export async function deletePlane(id: number): Promise<void> {
    await axios.delete(`/api/plane/delete/${id}`);
}