import axios from "./axios";

export async function createRoom(data: {
    hotelId: number;
    roomTypeId: number;
    roomNumber: number;
}) {
    await axios.post("/api/room/create", {...data});
}
