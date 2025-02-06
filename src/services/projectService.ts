import { projectT } from "@/types/misc";

// Fetch all projects
export const fetchProjects = async () => {
    const response = await fetch('/api/project');

    if (!response.ok) {
        return [];
    }

    const data = await response.json();
    
    return data;
};

// Create a new project
export const createProject = async (projectData: projectT) => {
    const response = await fetch('/api/project', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
    });

    if (!response.ok) {
        return false;
    }

    return true;
};


// Delete a project
export const deleteProject = async (projectId: number) => {
    const response = await fetch('/api/project', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: projectId }),
    });

    if (!response.ok) {
        return false;
    }

    return true;
};