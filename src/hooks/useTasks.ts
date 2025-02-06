import categoryStore from "@/store/categoryStore";
import { createTask, deleteTask, fetchCategories, fetchTaskAnalytics, fetchTasks, updateTask } from "@/services/taskService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import taskStore from "@/store/taskStore";
import { taskT } from "@/types/misc";

export const useTasks = () => {
    const queryClient = useQueryClient();

    const categories = categoryStore(state => state.categories);
    const setCategories = categoryStore(state => state.setCategories);

    const tasks = taskStore(state => state.tasks);
    const setTasks = taskStore(state => state.updateTasks);

    // Fetch all categories
    const { data: category, isLoading: cIsLoading, error: cError } = useQuery({
        queryKey: ["category"],
        queryFn: fetchCategories,
        refetchOnMount: true,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });

    // Update category store when data changes
    useEffect(() => {
        if (category) {
            // Update category store
            setCategories(category);
        }
    }, [category, setCategories]);



    // Fetch all tasks
    const useProductTasks = (projectId: string | number) => {
        return useQuery({
            queryKey: ['tasks', projectId],
            queryFn: () => fetchTasks(projectId),
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            staleTime: 1000 * 60 * 5, // 5 minutes
        });
    };

    // Create new task
    const TaskMutation = (projectId: string) => {
        return useMutation({
            mutationFn: (newTask: taskT) => createTask(newTask, projectId),
            onMutate: async (newTask: taskT) => {
                // Cancel any outgoing refetches
                // (so they don't overwrite our optimistic update)
                await queryClient.cancelQueries({ queryKey: ['tasks', projectId] })
    
                // Snapshot the previous value
                const previousTasks = queryClient.getQueryData<taskT[]>(['tasks', projectId]) || []
    
                // Optimistically update to the new value
                queryClient.setQueryData(['tasks', projectId], (old: Array<taskT>) => [newTask, ...old])
    
                // Return a context object with the snapshotted value
                return { previousTasks }
            },
            onError: (err, newTask, context: { previousTasks: taskT[] } | undefined) => {
                if (context) {
                    return queryClient.setQueryData(['tasks', projectId], context.previousTasks);
                }
            },
            onSettled: () => {
                queryClient.invalidateQueries({ queryKey: ['tasks', projectId] })
            },
        });
    }

    // Delete task
    const TaskMutationDelete = (projectId: string) => {
       return useMutation({
            mutationFn: (taskId: number) => deleteTask(taskId),
            onMutate: async (taskId: number) => {
                // Cancel any outgoing refetches
                // (so they don't overwrite our optimistic update)
                await queryClient.cancelQueries({ queryKey: ['tasks', projectId] })
    
                // Snapshot the previous value
                const previousTasks = queryClient.getQueryData<taskT[]>(['tasks', projectId]) || []
    
                // Optimistically update to the new value
                queryClient.setQueryData(['tasks', projectId], (old: Array<taskT>) =>
                    old.filter(task => task.id !== taskId)
                );
    
                // Return a context object with the snapshotted value
                return { previousTasks }
            },
            onError: (err, newTask, context: { previousTasks: taskT[] } | undefined) => {
                if (context) {
                    return queryClient.setQueryData(['tasks', projectId], context.previousTasks);
                }
            },
            onSettled: () => {
                queryClient.invalidateQueries({ queryKey: ['tasks', projectId] })
            },
        });
    }

    // Change status of task
    const TaskMutationUpdate = (projectId: string) => {
        return useMutation({
            mutationFn: ({ taskId, status }: { taskId: number; status: string }) => updateTask(taskId, status),
            onMutate: async ({ taskId, status }: { taskId: number; status: string }) => {
                await queryClient.cancelQueries({ queryKey: ['tasks', projectId] });
    
                // Snapshot the previous value
                const previousTasks = queryClient.getQueryData<taskT[]>(['tasks', projectId]) || [];
    
                // Optimistically update to the new value
                queryClient.setQueryData(['tasks', projectId], (old: Array<taskT>) =>
                    old.map(task => (task.id === taskId ? { ...task, status } : task))
                );
    
                // Return a context object with the snapshotted value
                return { previousTasks };
            },
            onError: (err, { }, context: { previousTasks: taskT[] } | undefined) => {
                if (context) {
                    queryClient.setQueryData(['tasks', projectId], context.previousTasks);
                }
            },
            onSettled: () => {
                queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
            },
        });
    }


    // Fetch tasks analytics
    const useTaskAnalytics = (projectId: string) => {
        return useQuery({
            queryKey: ['analytics', projectId],
            queryFn: () => fetchTaskAnalytics(projectId),
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            staleTime: 1000 * 60 * 5, // 5 minutes
        });
    };


    return {
        useProductTasks,
        categories,
        cIsLoading,
        cError,
        tasks,
        setTasks,
        TaskMutation,
        TaskMutationDelete,
        TaskMutationUpdate,
        useTaskAnalytics
    };
};