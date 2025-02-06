"use client";

import React, { useEffect, useState, Suspense } from "react";
import TaskStatistics from "@/components/dashboard/TaskStatistics";
import UpcomingDeadlines from "@/components/dashboard/UpcomingDeadlines";
import TaskProgress from "@/components/dashboard/TaskProgress";
import TaskList from "@/components/dashboard/TaskList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTasks } from "@/hooks/useTasks";
import taskStore from "@/store/taskStore";
const CalendarWidget = React.lazy(() => import("@/components/dashboard/CalendarWidget"));

export default function TaskPage({ title, id }: { title?: string, id: string }) {

    const [filters, setFilters] = useState({
        searchTerm: "",
        filterStatus: "all",
        priority: "all",
        category: "all",
    });
    const updateProjectId = taskStore(state => state.updateProjectId);
    const setAnalytics = taskStore(state => state.setAnalytics);

    const handleFilterChange = (name: string, value: string) => {
        setFilters({ ...filters, [name]: value });
    }

    const { useProductTasks, setTasks, useTaskAnalytics } = useTasks();
    const { data: task, isLoading: tIsLoading, error: tError, refetch } = useProductTasks(id);
    const { data: analyticsData, refetch: analyticsRefetch } = useTaskAnalytics(id);

    useEffect(() => {
        if (task) {
            // Update task store
            setTasks(task);
            setAnalytics(analyticsData);
        }
    }, [task, setTasks, setAnalytics, analyticsData]);
    useEffect(() => { analyticsRefetch() }, [analyticsRefetch, task]);
    useEffect(() => {
        updateProjectId(id);
        refetch();
        analyticsRefetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, refetch, updateProjectId]);

    return (
        <div className="container mx-auto p-4 space-y-6">
            <h1 className="text-3xl font-bold">{title ?? 'Dashboard'}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TaskStatistics />
                <UpcomingDeadlines />
                <TaskProgress />
            </div>
            <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
                <Card className="w-full 2xl:col-span-2">
                    <CardHeader>
                        <CardTitle>Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TaskList
                            id={id}
                            tIsLoading={tIsLoading}
                            tError={tError}
                            filters={filters}
                            setFilters={handleFilterChange}
                        />
                    </CardContent>
                </Card>

                <Card className="w-full h-[37rem]">
                    <ScrollArea className="h-[37rem] w-full">
                        <CardHeader>
                            <CardTitle>Calendar</CardTitle>
                        </CardHeader>
                        <CardContent className="h-full">
                            <Suspense fallback={<p>Loading...</p>}>
                                <CalendarWidget />
                            </Suspense>
                        </CardContent>
                    </ScrollArea>
                </Card>
            </div>
        </div>
    )
}