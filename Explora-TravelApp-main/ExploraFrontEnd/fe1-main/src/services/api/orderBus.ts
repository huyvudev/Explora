import { OrderBus } from "../../types";
import axios from "./axios";

export async function createOrderBus(data: {
    amount: number,
    idBus: number;
    createBusTicketDtos: {
        guessName: string;
        guessEmail: string;
        phoneNumber: string;
    }[];
}) {
    await axios.post("/api/OrderBus", {...data});
}

export async function getOrderBusOfCurrentUser(): Promise<OrderBus[]> {
    const res = await axios.get("/api/OrderBus/Get-by-id-user");

    return res.data.billbus;
}

export async function getOrderBusById(id: number): Promise<OrderBus | null> {
    try {
        const res = await axios.get(`/api/OrderBus/Get-order-by-orderid/${id}`);
        
        return res.data.bill;
    } catch (error) {
        return null;
    }
}