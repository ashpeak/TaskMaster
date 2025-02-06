import { create } from 'zustand';

type categoryT = {
    id: number;
    name: string;
}

interface categoryStoreT {
    name: string;
    categories: Array<categoryT>;
    setCategories: (categories: Array<categoryT>) => void;
}

const categoryStore = create<categoryStoreT>((set) => ({
    name: 'categoryStore',
    categories: [],
    setCategories: (categories) => set({ categories }),
}));

export default categoryStore;