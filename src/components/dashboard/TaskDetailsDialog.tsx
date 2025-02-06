import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface Task {
  title: string;
  description: string;
  deadline: Date;
  priority: string;
  category: string;
}

export function TaskDetailsDialog({ tasks, onClose, isOpen }: { tasks: Task, onClose: () => void, isOpen: boolean}) {
  if (!tasks) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tasks for {new Date(tasks.deadline).toLocaleDateString()}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-4 max-h-[60vh] pr-4">
            <div className="mb-6 last:mb-0">
              <h3 className="text-lg font-semibold mb-2">{tasks.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{tasks.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline" className="bg-stone-200 text-stone-800 dark:bg-stone-800 dark:text-stone-100">{new Date(tasks.deadline).toLocaleTimeString()}</Badge>
                <Badge variant="outline" className="capitalize bg-stone-200 text-stone-800 dark:bg-stone-800 dark:text-stone-100">
                  {tasks.priority} Priority
                </Badge>
              </div>
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

