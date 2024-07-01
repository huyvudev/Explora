import { create } from "zustand";
import { Airline } from "../types";
import * as airlineService from "../services/api/airline";

interface CreateAirlineInterface {
    airlineName: string;
    email: string;
    addressAirline: string;
    phoneNumber: string;
}

interface UpdateAirlineInterface {
    email: string;
    addressAirline: string;
    phoneNumber: string;
}

interface AirlineStore {
    isLoading: boolean;
    airlines: Airline[];

    loadAllAirlines: () => Promise<void>;

    createAirline: (data: CreateAirlineInterface) => Promise<void>;
    updateAirline: (
        airlineId: number,
        data: UpdateAirlineInterface
    ) => Promise<void>;
    deleteAirline: (airlineId: number) => Promise<void>;
}

const useAirlineStore = create<AirlineStore>((set, get) => ({
    isLoading: false,
    airlines: [],

    async loadAllAirlines() {
        set({ isLoading: true });

        const airlines = await airlineService.getAllAirlines();

        set({
            airlines,
            isLoading: false,
        });
    },

    async createAirline(data: CreateAirlineInterface) {
        await airlineService.createAirline(data);

        get().loadAllAirlines();
    },

    async updateAirline(airlineId: number, data: UpdateAirlineInterface) {
        await airlineService.updateAirline(airlineId, data);

        get().loadAllAirlines();
    },

    async deleteAirline(airlineId) {
        await airlineService.deleteAirline(airlineId);

        set(state => ({
            airlines: state.airlines.filter(a => a.idAirline != airlineId)
        }));
    },
}));

export default useAirlineStore;
