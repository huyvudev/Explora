import { RoomType } from "../../types";
import axios from "./axios";

export async function createRoomType(data: {
    roomTypeName: string;
    price: number;
    area: number;
    hotelId: number;
    image?: {
        name?: string;
        type?: string;
        uri: string;
    };
}) {
    const formData = new FormData();
    formData.append("roomTypeName", data.roomTypeName);
    formData.append("price", data.price);
    formData.append("area", data.area);
    formData.append("hotelId", data.hotelId);

    if (data.image) {
        formData.append("imageUrl", data.image);
    }

    await axios.post("/api/RoomType/create", formData, {
        headers: {
            "content-type": "multipart/form-data",
        },
    });
}

export async function updateRoomType(id: number, data: {
    roomTypeName: string;
    price: number;
    area: number;
    image?: {
        name?: string;
        type?: string;
        uri: string;
    };
}) {
    const formData = new FormData();
    formData.append("roomTypeName", data.roomTypeName);
    formData.append("price", data.price);
    formData.append("area", data.area);

    if (data.image) {
        formData.append("imageUrl", data.image);
    }

    await axios.put(`/api/RoomType/update/${id}`, formData, {
        headers: {
            "content-type": "multipart/form-data",
        },
    });
}

export async function getRoomTypesByHotelId(hotelId: number): Promise<RoomType[]> {
    const res = await axios.get(`/api/RoomType/Get-by-hotel/${hotelId}`);

    return res.data.result;
}