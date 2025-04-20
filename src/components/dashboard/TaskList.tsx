"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useTasks } from "@/hooks/useTasks";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropsT } from "@/types/misc";
import React from "react";


const TaskList = ({
  tIsLoading, tError, filters: { searchTerm, filterStatus, priority, category }, setFilters, id
}: PropsT) => {

  const { tasks, categories, cIsLoading, cError, TaskMutationDelete, TaskMutationUpdate } = useTasks();

  const filteredTasks = Array.isArray(tasks) ? tasks.filter((task) => {
    const matchesTitle = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesPriority = priority === "all" || task.priority === priority;
    const matchesCategory = category === "all" || task.category === category;

    return matchesTitle && matchesStatus && matchesPriority && matchesCategory;
  }) : [];

  const taskMutationUpdate = TaskMutationUpdate(id);
  const taskMutationDelete = TaskMutationDelete(id);

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setFilters('searchTerm', e.target.value)}
          className="flex-grow border border-stone-600/20 dark:border-stone-600/50 rounded-md"
        />

        {/* For category filtering */}
        <Select value={category} name="category" onValueChange={(value) => setFilters('category', value)}>
          <SelectTrigger className="w-[180px] border border-stone-600/20 dark:border-stone-600/50">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {cIsLoading && <SelectItem value="loading" className="animate-pulse">Loading...</SelectItem>}
            {cError && <SelectItem value="loading" className="text-destructive-foreground">Error.</SelectItem>}
            <SelectItem value="all">All</SelectItem>
            {categories?.map((category: {
              name: string;
              id: number;
            }) => (
              <SelectItem key={`${category.name}${category.id}`} value={category.name}>
                {(category.name).charAt(0).toUpperCase() + category.name.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>


        {/* For priority filtering */}
        <Select value={priority} onValueChange={(value) => setFilters('priority', value)}>
          <SelectTrigger className="w-[180px] border border-stone-600/20 dark:border-stone-600/50">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>


        {/* For status filtering */}
        <Select value={filterStatus} onValueChange={(value) => setFilters('filterStatus', value)}>
          <SelectTrigger className="w-[180px] border border-stone-600/20 dark:border-stone-600/50">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="not-started">Not Started</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>


      <ul className="space-y-2">
        {tIsLoading && <li className="animate-pulse">Loading...</li>}
        {tError && <li className="text-destructive-foreground">Error loading...</li>}
        {filteredTasks.map((task, index) => (
          <li key={`${task.id} + ${index}`} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={task.status === "completed"}
                onCheckedChange={(checked) => taskMutationUpdate.mutate({ taskId: task.id!, status: checked ? "completed" : "in-progress" })}
              />
              <span className={task.status === "completed" ? "line-through" : ""}>{task.title}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Select value={task.status} onValueChange={(newStatus) => taskMutationUpdate.mutate({ taskId: task.id!, status: newStatus })}>
                <SelectTrigger className="w-[120px] border border-stone-600/20 dark:border-stone-600/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-started">Not Started</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Button className="h-8 w-4" variant={"destructive"} onClick={() => taskMutationDelete.mutate(task.id!)}>
                <Trash2 size={10} />
              </Button>
            </div>

          </li>
        ))}
      </ul>

    </div>
  )
}

export default TaskList;
