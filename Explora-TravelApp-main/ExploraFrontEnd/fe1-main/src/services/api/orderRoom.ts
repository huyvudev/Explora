import axios from "./axios";
import { OrderRoom } from "../../types";

export async function getOrderRoomsByHotelId(hotelId: number): Promise<OrderRoom[]> {
    const res = await axios.get(`/api/OrderRoom/Get-by-id-hotel/${hotelId}`);

    return res.data.billroom;
}

export async function getOrderRoomsOfCurrentUser(): Promise<OrderRoom[]> {
    const res = await axios.get(`/api/OrderRoom/Get-by-id-user`);

    return res.data.billroom;
}

export async function createOrderRoom(data: {
    guessName: string;
    guessEmail: string;
    phoneNumber: string;
    startTime: string;
    endTime: string;
    amount: number;
    idHotel: number;
    roomTypeId: number;
}) {
    await axios.post("/api/OrderRoom/CreateBillRoom", {...data});
}