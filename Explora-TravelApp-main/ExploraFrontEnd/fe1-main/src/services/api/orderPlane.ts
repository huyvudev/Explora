import { OrderPlane } from "../../types";
import axios from "./axios";

export async function createOrderPlane(data: {
    amount: number,
    idPlane: number;
    createPlaneTicketDtos: {
        guessName: string;
        guessEmail: string;
        phoneNumber: string;
        dateOfBirth: Date;
        nationality: string;
        passpostNumber: string;
        expiredTime: Date;
    }[];
}) {
    await axios.post("/api/OrderPlane", {...data});
}

export async function getOrderPlanesOfCurrentUser(): Promise<OrderPlane[]> {
    const res = await axios.get("/api/OrderPlane/Get-by-id-user");

    return res.data.billplane;
}

export async function getOrderPlaneById(id: number): Promise<OrderPlane | null> {
    try {
        const res = await axios.get(`/api/OrderPlane/Get-order-by-orderid/${id}`);
        
        return res.data.bill;
    } catch (error) {
        return null;
    }
}