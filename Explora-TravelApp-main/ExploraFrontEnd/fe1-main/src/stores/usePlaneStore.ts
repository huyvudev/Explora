import { create } from "zustand";
import { Plane } from "../types";
import * as planeService from "../services/api/plane";

interface CreatePlaneInterface {
    idAirline: number;
    planeName: string;
    startPoint: string;
    endPoint: string;
    startTime: Date;
    price: number;
    slot: number;
}

interface UpdatePlaneInterface {
    price: number;
    startTime: Date;
}

interface PlaneStore {
    isLoading: boolean;
    planes: Plane[];

    loadAllPlanes: () => Promise<void>;

    createPlane: (data: CreatePlaneInterface) => Promise<void>;
    updatePlane: (
        planeId: number,
        data: UpdatePlaneInterface
    ) => Promise<void>;
    deletePlane: (planeId: number) => Promise<void>;
}

const usePlaneStore = create<PlaneStore>((set, get) => ({
    isLoading: false,
    planes: [],

    async loadAllPlanes() {
        set({ isLoading: true });

        const planes = await planeService.getAllPlanes();

        set({
            planes,
            isLoading: false,
        });
    },

    async createPlane(data: CreatePlaneInterface) {
        await planeService.createPlane(data);

        get().loadAllPlanes();
    },

    async updatePlane(planeId: number, data: UpdatePlaneInterface) {
        await planeService.updatePlane(planeId, data);

        get().loadAllPlanes();
    },

    async deletePlane(planeId) {
        await planeService.deletePlane(planeId);

        set(state => ({
            planes: state.planes.filter(p => p.idPlane != planeId)
        }));
    },
}));

export default usePlaneStore;
