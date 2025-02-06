"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTasks } from "@/hooks/useTasks";
import { useToast } from "@/components/hooks/use-toast";
import taskStore from "@/store/taskStore";

interface CreateTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateTaskModal({ open, onOpenChange }: CreateTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const { categories, cIsLoading, cError, TaskMutation } = useTasks();
  const { toast } = useToast();
  const projectId = taskStore(state => state.projectId);

  const taskMutation = TaskMutation(projectId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      deadline: date ? format(date, "yyyy-MM-dd") : "",
      priority,
      category,
    };

    taskMutation.mutate(taskData, {
      onSuccess: () => {
        onOpenChange(false);
        toast({
          title: "Task created successfully",
          variant: "success",
        });
      },
      onError: (error: Error) => {
        console.error('Error creating task:', error);
        toast({
          title: "An error occurred",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  const isBtnDisabled = (): boolean => {
    if (!title || !description || !date || !priority) {
      return true;
    }
    return false;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] w-[95%]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>Add a new task to your list. Fill in the details below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                className="w-full border-stone-500/30 dark:border-stone-400/25"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter task description"
                className="w-full border-stone-500/30 dark:border-stone-400/25"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full border-stone-500/30 dark:border-stone-400/25 justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date || undefined} onSelect={(day) => setDate(day || null)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label>Priority</Label>
              <Select onValueChange={setPriority}>
                <SelectTrigger className="border-stone-500/30 dark:border-stone-400/25">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Category</Label>
              <Select onValueChange={setCategory}>
                <SelectTrigger className="border-stone-500/30 dark:border-stone-400/25">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {cIsLoading && <SelectItem value="loading" className="animate-pulse">Loading...</SelectItem>}
                  {cError && <SelectItem value="loading" className="text-destructive-foreground">Error.</SelectItem>}
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
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isBtnDisabled()}>Create Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}