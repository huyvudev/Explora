import { create } from "zustand";
import { Hotel } from "../types";
import * as hotelService from "../services/api/hotel";

interface CreateHotelInterface {
    hotelName: string;
    email: string;
    addressHotel: string;
    phoneNumber: string;
    image?: {
        name?: string;
        type?: string;
        uri: string;
    };
}

interface UpdateHotelInterface {
    email: string;
    addressHotel: string;
    phoneNumber: string;
    image?: {
        name?: string;
        type?: string;
        uri: string;
    };
}

interface OwnerHotelStore {
    isLoading: boolean;
    ownerHotels: Hotel[];

    loadAllHotels: () => Promise<void>;

    createHotel: (data: CreateHotelInterface) => Promise<void>;
    updateHotel: (
        id: number,
        data: UpdateHotelInterface
    ) => Promise<void>;
    deleteHotel: (id: number) => Promise<void>;
}

const useOwnerHotelStore = create<OwnerHotelStore>((set, get) => ({
    isLoading: false,
    ownerHotels: [],

    async loadAllHotels() {
        set({ isLoading: true });

        const ownerHotels = await hotelService.getHotelsOfCurrentUser();

        set({
            ownerHotels,
            isLoading: false,
        });
    },

    async createHotel(data: CreateHotelInterface) {
        await hotelService.createHotel(data);

        get().loadAllHotels();
    },

    async updateHotel(id: number, data: UpdateHotelInterface) {
        await hotelService.updateHotel(id, data);

        get().loadAllHotels();
    },

    async deleteHotel(id) {
        await hotelService.deleteHotel(id);

        set(state => ({
            ownerHotels: state.ownerHotels.filter(a => a.idHotel != id)
        }));
    },
}));

export default useOwnerHotelStore;
