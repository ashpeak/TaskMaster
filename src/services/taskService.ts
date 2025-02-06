import { taskT } from "@/types/misc";

export const fetchCategories = async () => {
    const response = await fetch('/api/category');
    const data = await response.json();
    return data;
};

export const fetchTasks = async (projectId?: string | number) => {
    const url = (projectId && projectId !== 'all') ? `/api/task?projectId=${projectId}` : '/api/task';

    const response = await fetch(url);
    const data = await response.json();
    return data;
};

//create new task
export const createTask = async (taskData: taskT, projectId: string) => {
    const response = await fetch('/api/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskData, projectId }),
    });

    if (!response.ok) {
        return false;
    }

    return true;
};

// delete a task
export const deleteTask = async (taskId: number) => {
    const response = await fetch('/api/task', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: taskId }),
    });

    if (!response.ok) {
        return false;
    }

    return true;
};

// update a task
export const updateTask = async (taskId: number, status: string) => {
    const response = await fetch('/api/task', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: taskId, status }),
    });

    if (!response.ok) {
        return false;
    }

    return true;
};


// fetch tasks analytics
export const fetchTaskAnalytics = async (projectId: string) => {
    const url = (projectId && projectId !== 'all') ? `/api/task/analytics?projectId=${projectId}` : '/api/task/analytics';

    const response = await fetch(url);
    const data = await response.json();
    return data;
};