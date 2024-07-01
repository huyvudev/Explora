import { NhaXe } from "../../types";
import axios from "./axios";

export async function createNhaXe(data: {
    nhaXeName: string,
    email: string,
    addressNhaXe: string,
    phoneNumber: string,
}) {
    await axios.post("/api/NhaXe/create", {...data});
}

export async function updateNhaXe(id: number, data: {
    email: string,
    addressNhaXe: string,
    phoneNumber: string,
}) {
    await axios.put(`/api/NhaXe/update/${id}`, {...data});
}

export async function deleteNhaXe(id: number) {
    await axios.delete(`/api/NhaXe/delete/${id}`);
}

export async function getAllNhaXe(): Promise<NhaXe[]> {
    const res = await axios.get("/api/NhaXe/Get-all");

    return res.data.nhaxe;
}

export async function getNhaXeById(id: number): Promise<NhaXe | null> {
    try {
        const res = await axios.get(`/api/NhaXe/Get-by-id/${id}`);
        
        return res.data.nhaxe;
    } catch (error) {
        return null;
    }
}