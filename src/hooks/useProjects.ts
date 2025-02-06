import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { projectT } from "@/types/misc";
import projectStore from "@/store/projectStore";
import { createProject, deleteProject, fetchProjects } from "@/services/projectService";

export const useProjects = () => {
    const queryClient = useQueryClient();

    const projectList = projectStore(state => state.projects);
    const setProjects = projectStore(state => state.updateProjects);


    // Fetch all projects
    const { data: project, isLoading: pIsLoading, error: pError, refetch: pRefetch } = useQuery({
        queryKey: ["projects"],
        queryFn: fetchProjects,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Update projects store when data changes
    useEffect(() => {
        if (project) {
            // Update project store
            setProjects(project);
            
        }
    }, [project, setProjects, projectList]);


    // Create a new project
    const projectMutation = useMutation({
        mutationFn: (newProject: projectT) => createProject(newProject),
        onMutate: async (newProject: projectT) => {
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['projects'] })

            // Snapshot the previous value
            const previousProjects = queryClient.getQueryData<projectT[]>(['projects']) || []

            // Optimistically update to the new value
            queryClient.setQueryData(['projects'], (old: Array<projectT>) => [newProject, ...old])

            // Return a context object with the snapshotted value
            return { previousProjects }
        },
        onError: (err, newProject, context: { previousProjects: projectT[] } | undefined) => {
            if (context) {
                return queryClient.setQueryData(['projects'], context.previousProjects);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        },
    });

    // Delete project
    const projectDelete = useMutation({
        mutationFn: (projectId: number) => deleteProject(projectId),
        onMutate: async (projectId: number) => {
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['projects'] })

            // Snapshot the previous value
            const previousProjects = queryClient.getQueryData<projectT[]>(['projects']) || []

            // Optimistically update to the new value
            queryClient.setQueryData(['projects'], (old: Array<projectT>) =>
                old.filter(project => project.id !== projectId)
            );

            // Return a context object with the snapshotted value
            return { previousProjects }
        },
        onError: (err, newProject, context: { previousProjects: projectT[] } | undefined) => {
            if (context) {
                return queryClient.setQueryData(['projects'], context.previousProjects);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        },
    });


    return {
        projectList,
        pIsLoading,
        pError,
        projectMutation,
        projectDelete,
        pRefetch
    };
};