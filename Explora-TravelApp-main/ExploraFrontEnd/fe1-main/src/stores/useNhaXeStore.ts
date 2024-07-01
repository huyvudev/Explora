import { create } from "zustand";
import { NhaXe } from "../types";
import * as nhaxeService from "../services/api/nhaxe";

interface CreateNhaXeInterface {
    nhaXeName: string,
    email: string,
    addressNhaXe: string,
    phoneNumber: string,
}

interface UpdateNhaXeInterface {
    email: string,
    addressNhaXe: string,
    phoneNumber: string,
}

interface NhaXeStore {
    isLoading: boolean;
    nhaXes: NhaXe[];

    loadAllNhaXes: () => Promise<void>;

    createNhaXe: (data: CreateNhaXeInterface) => Promise<void>;
    updateNhaXe: (
        id: number,
        data: UpdateNhaXeInterface
    ) => Promise<void>;
    deleteNhaXe: (id: number) => Promise<void>;
}

const useNhaXeStore = create<NhaXeStore>((set, get) => ({
    isLoading: false,
    nhaXes: [],

    async loadAllNhaXes() {
        set({ isLoading: true });

        const nhaXes = await nhaxeService.getAllNhaXe();

        set({
            nhaXes,
            isLoading: false,
        });
    },

    async createNhaXe(data: CreateNhaXeInterface) {
        await nhaxeService.createNhaXe(data);

        get().loadAllNhaXes();
    },

    async updateNhaXe(id: number, data: UpdateNhaXeInterface) {
        await nhaxeService.updateNhaXe(id, data);

        get().loadAllNhaXes();
    },

    async deleteNhaXe(id) {
        await nhaxeService.deleteNhaXe(id);

        set(state => ({
            nhaXes: state.nhaXes.filter(a => a.idNhaXe != id)
        }));
    },
}));

export default useNhaXeStore;
