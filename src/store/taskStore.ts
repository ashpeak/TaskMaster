import { create } from 'zustand';
import { taskT, analyticsT } from '@/types/misc';


// Define the store
type taskStore = {
    name: string | number;
    tasks: Array<taskT>;
    projectId: string;
    analytics: analyticsT;
    setAnalytics: (newAnalytics: analyticsT) => void;
    updateProjectId: (newId: string) => void;
    removeAllTasks: () => void;
    updateTasks: (newTasks: Array<taskT>) => void;
}

const taskStore = create<taskStore>((set) => ({
    name: 'taskStore',
    tasks: [],
    projectId: 'all',
    analytics: {
        totaltasks_count: 0,
        completedtask: 0,
        ongoingtask: 0,
        duetask: 0,
        upcomingdeadline: [],
    },
    setAnalytics: (newAnalytics) => set({ analytics: newAnalytics }),
    updateProjectId: (newId) => set({ projectId: newId }),
    removeAllTasks: () => set({ tasks: [] }),
    updateTasks: (newTasks) => set({ tasks: newTasks }),
}))

export default taskStore;