import TaskPage from "@/components/dashboard/TaskPage";

export default async function Page({ params }: { params?: Promise<{ id: string }> }) {
    
    const id = (await params)?.id;

    return <TaskPage id={id ?? 'all'} title="Project" />
}