"use client"

import React, { useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import ProjectList from "@/components/projects/ProjectList"
const CreateProjectModal = React.lazy(() => import("@/components/projects/CreateProjectModal"));

export default function ProjectsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <div className="space-y-4 px-4 md:px-0">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Create Project
        </Button>
      </div>
      <ProjectList />

      <Suspense fallback={<p>Loading...</p>}>
        <CreateProjectModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
      </Suspense>
    </div>
  )
}

