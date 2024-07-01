import { create } from "zustand";
import { Bus } from "../types";
import * as busService from "../services/api/bus";

interface CreateBusInterface {
    idNhaXe: number;
    busName: string;
    startPoint: string;
    endPoint: string;
    startTime: Date;
    price: number;
    slot: number;
}

interface UpdateBusInterface {
    price: number;
    startTime: Date;
}

interface BusStore {
    isLoading: boolean;
    bus: Bus[];

    loadAllBus: () => Promise<void>;

    createBus: (data: CreateBusInterface) => Promise<void>;
    updateBus: (
        id: number,
        data: UpdateBusInterface
    ) => Promise<void>;
    deleteBus: (id: number) => Promise<void>;
}

const useBusStore = create<BusStore>((set, get) => ({
    isLoading: false,
    bus: [],

    async loadAllBus() {
        set({ isLoading: true });

        const bus = await busService.getAllBus();

        set({
            bus,
            isLoading: false,
        });
    },

    async createBus(data: CreateBusInterface) {
        await busService.createBus(data);

        get().loadAllBus();
    },

    async updateBus(id: number, data: UpdateBusInterface) {
        await busService.updateBus(id, data);

        get().loadAllBus();
    },

    async deleteBus(id) {
        await busService.deleteBus(id);

        set(state => ({
            bus: state.bus.filter(p => p.idBus != id)
        }));
    },
}));

export default useBusStore;
