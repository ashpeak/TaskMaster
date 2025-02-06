import { create } from 'zustand';
import { projectStoreT } from '@/types/misc';


const projectStore = create<projectStoreT>((set) => ({
    name: 'projectStore',
    projects: [],
    updateProjects: (newProject) => set({ projects: newProject }),
}))

export default projectStore;