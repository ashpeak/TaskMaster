"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useProjects } from "@/hooks/useProjects";
import { useToast } from "../hooks/use-toast"
import { projectSchema } from "@/lib/zodSchema/index";

interface CreateProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateProjectModal({ open, onOpenChange }: CreateProjectModalProps) {
  const { projectMutation } = useProjects();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [priority, setPriority] = useState<string>('low');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = projectSchema.safeParse({ projectName, projectDescription });
    if (!result.success) {
      const errors = result.error.errors.map((error) => error.message).join(", ");
      toast({
        title: "Validation Error",
        description: errors,
        variant: "destructive",
      });
      return;
    }

    projectMutation.mutate({ title: projectName, description: projectDescription, priority: priority }, {
      onSuccess: () => {
        setProjectName("")
        setProjectDescription("")
        onOpenChange(false);
      },
      onError: (error: Error) => {
        console.error('Error creating project:', error);
        toast({
          title: "An error occurred",
          description: error.message,
          variant: "destructive",
        });
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] w-[95%] rounded-md">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>Add a new project to your workspace. Fill in the details below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={projectName}
                className="border-stone-500/30 dark:border-stone-400/25"
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={projectDescription}
                className="border-stone-500/30 dark:border-stone-400/25"
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Enter project description"
              />
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

          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

