import { EmptyRoomType, Hotel, SearchedHotel } from "../../types";
import axios from "./axios";

export async function createHotel(data: {
    hotelName: string;
    email: string;
    addressHotel: string;
    phoneNumber: string;
    image?: {
        name?: string;
        type?: string;
        uri: string;
    };
}) {
    const formData = new FormData();
    formData.append("hotelName", data.hotelName);
    formData.append("email", data.email);
    formData.append("addressHotel", data.addressHotel);
    formData.append("phoneNumber", data.phoneNumber);

    if (data.image) {
        formData.append("imageUrl", data.image);
    }

    await axios.post("/api/Hotel/create", formData, {
        headers: {
            "content-type": "multipart/form-data",
        },
    });
}

export async function updateHotel(
    id: number,
    data: {
        email: string;
        addressHotel: string;
        phoneNumber: string;
        image?: {
            name?: string;
            type?: string;
            uri: string;
        };
    }
) {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("addressHotel", data.addressHotel);
    formData.append("phoneNumber", data.phoneNumber);

    if (data.image) {
        formData.append("imageUrl", data.image);
    }

    await axios.put(`/api/Hotel/update/${id}`, formData, {
        headers: {
            "content-type": "multipart/form-data",
        },
    });
}

export async function deleteHotel(id: number) {
    await axios.delete(`/api/Hotel/delete/${id}`);
}

export async function getHotelsOfCurrentUser(): Promise<Hotel[]> {
    const res = await axios.get("/api/Hotel/Get-by-id-hotel-owner");

    return res.data.hotels;
}

export async function getHotelById(id: number): Promise<Hotel | null> {
    try {
        const res = await axios.get(`/api/Hotel/Get-by-id/${id}`);

        return res.data.hotel;
    } catch (error) {
        return null;
    }
}

export async function getAllHotels(): Promise<Hotel[]> {
    const res = await axios.get("/api/Hotel/Get-all");

    return res.data.hotels;
}

export async function searchHotels(query: {
    addressHotel: string;
    startTime: string;
    endTime: string;
    roomNumber: number;
}): Promise<SearchedHotel[]> {
    const res = await axios.get("/api/hotel/get-by-keyword", {
        params: {...query}
    });

    return res.data.query2;
}

export async function getEmptyRoomsByHotel(hotelId: number, query: {
    startTime: string;
    endTime: string;
}): Promise<EmptyRoomType[]> {
    const res = await axios.get(`/api/hotel/get-empty-room-by-hotelid/${hotelId}`, {
        params: {...query}
    });

    return res.data.query2;
}