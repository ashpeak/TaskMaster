// Task list page types
export interface PropsT {
  filters: {
    searchTerm: string,
    filterStatus: string,
    priority: string,
    category: string,
  },
  setFilters: (name: string, value: string) => void,
  tError: Error | null,
  tIsLoading: boolean,
  id: string
}

export type taskT = {
  id?: number;
  title: string;
  status?: string;
  priority: string;
  deadline: string;
  description: string;
  category?: string;
}

export type projectT = {
  id?: number;
  title: string;
  description: string;
  priority: string;
  task_count?: number;
}

// Define the store
export interface projectStoreT {
    name: string | number;
    projects: Array<projectT>;
    updateProjects: (newProject: Array<projectT>) => void;
}

export type analyticsT = {
  totaltasks_count: number | string;
  completedtask: number | string;
  ongoingtask: number | string;
  duetask: number | string;
  upcomingdeadline: Array<{
    id: number | string;
    title: string;
    deadline: string;
  }>;
}