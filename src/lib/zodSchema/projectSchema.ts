import { z } from 'zod';

export const projectSchema = z.object({
  projectName: z.string().min(1, "Project name is required").max(50, "Project name is too long"),
  projectDescription: z.string().min(1, "Project description is required").max(255, "Project description is too long"),
});

export type ProjectSchema = z.infer<typeof projectSchema>;


export const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.string().optional(),
});

export const deleteProjectSchema = z.object({
  id: z.number().min(1, "Project ID is required"),
});


export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.string().optional(),
  category: z.string().optional(),
  deadline: z.string().optional(),
  projectId: z.union([z.string(), z.number()]).optional(),
});

export const updateTaskSchema = z.object({
  id: z.number().min(1, "Task ID is required"),
  status: z.string().min(1, "Task status is required"),
});