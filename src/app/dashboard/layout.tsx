"use client"

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LayoutDashboard, Calendar, House, FolderKanban } from "lucide-react";
const CreateTaskModal = React.lazy(() => import("@/components/dashboard/CreateTaskModal"));
import { Protect } from '@clerk/nextjs';
import ThemeToggle from "@/components/ThemeToggle";

function MenuItem({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <SidebarMenuItem>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarMenuButton asChild>
              <Link href={href} className="flex items-center">
                <Icon className="h-5 w-5" />
                {!isCollapsed && <span className="ml-2">{label}</span>}
              </Link>
            </SidebarMenuButton>
          </TooltipTrigger>
          {isCollapsed && <TooltipContent side="right">{label}</TooltipContent>}
        </Tooltip>
      </TooltipProvider>
    </SidebarMenuItem>
  )
}

function SidebarWrapper() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="flex h-14 items-center justify-center">
        {!isCollapsed && <Link href='/'><h1 className="text-xl font-bold">TaskMaster</h1></Link>}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className={`flex flex-col ${isCollapsed && 'items-center'}`}>
          <MenuItem href="/" icon={House} label="Home" />
          <MenuItem href="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <MenuItem href="/dashboard/projects" icon={FolderKanban} label="Projects" />
          <MenuItem href="/dashboard/calendar" icon={Calendar} label="Calendar" />
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [createTaskOpen, setCreateTaskOpen] = useState(false)

  return (
    <Protect>
      <SidebarProvider>
        <div className="flex h-screen dark:bg-[#111110] w-full">
          <SidebarWrapper />
          <main className="flex-1 overflow-y-auto">
            <header className="sticky top-0 z-10 border-b border-border dark:bg-[#111110] drop-shadow-md filter backdrop-blur-lg bg-white dark:bg-opacity-50 dark:backdrop-blur-lg">
              <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <SidebarTrigger className="h-8 w-8" />
                    <h1 className="text-2xl font-semibold ml-4 hidden md:block">Dashboard</h1>
                  </div>
                  <div className="flex items-center space-x-4">
                    <ThemeToggle />
                    <Button onClick={() => setCreateTaskOpen(true)} className="">Create New Task</Button>
                  </div>
                </div>
              </div>
            </header>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <CreateTaskModal open={createTaskOpen} onOpenChange={setCreateTaskOpen} />
        </Suspense>

      </SidebarProvider>
    </Protect>
  )
}

export default DashboardLayout