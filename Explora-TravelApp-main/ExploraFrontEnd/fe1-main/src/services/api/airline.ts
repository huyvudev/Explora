import { Airline } from "../../types";
import axios from "./axios";

export async function createAirline({
    airlineName,
    email,
    addressAirline,
    phoneNumber,
}: {
    airlineName: string,
    email: string,
    addressAirline: string,
    phoneNumber: string,
}) {
    await axios.post("/api/airline/create", {
        airlineName,
        email,
        addressAirline,
        phoneNumber
    });
}

export async function getAllAirlines(): Promise<Airline[]> {
    const response = await axios.get("/api/airline/get-all");

    return response.data.arilines;
}

export async function getAirlineById(id: number): Promise<Airline | null> {
    try {
        const response = await axios.get(`/api/airline/get-by-id/${id}`);
        return response.data.airline;
    } catch (error) {
        return null;
    }
}

export async function updateAirline(airlineId: number, {
    email,
    addressAirline,
    phoneNumber,
}: {
    email: string,
    addressAirline: string,
    phoneNumber: string,
}): Promise<Airline> {
    const response = await axios.put(`/api/airline/update/${airlineId}`, {
        email,
        addressAirline,
        phoneNumber
    });

    return response.data.airline;
}

export async function deleteAirline(airlineId: number): Promise<void> {
    await axios.delete(`/api/airline/delete/${airlineId}`);
}