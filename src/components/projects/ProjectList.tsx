"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2Icon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useProjects } from "@/hooks/useProjects";
import Link from "next/link"
import React from "react"

const ProjectList = () => {
  const { projectList, pError, pIsLoading, projectDelete } = useProjects();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {pIsLoading && <p className="animate-pulse">Loading...</p>}
      {!pIsLoading && projectList?.length === 0 && <p className="w-full">It&apos;s all Empty. Create a new Project</p>}
      {pError && <p className="text-red-500">An error occurred.</p>}
      {Array.isArray(projectList) && projectList.map((project) => (
        <Card key={project.id + 'protect'} className="flex flex-col bg-card">
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">Tasks: {project.task_count}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">
              <Link href={`/dashboard/projects/${project.id}`}>View Details</Link>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the project and all associated tasks.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => projectDelete.mutate(Number(project.id))}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default ProjectList;

