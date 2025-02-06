import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress";
import taskStore from "@/store/taskStore";

export default function TaskProgress() {
  const analytics = taskStore(state => state.analytics);
  
  const totalTasks = Number(analytics?.totaltasks_count) ?? 0;
  const completedTasks = Number(analytics?.completedtask) ?? 0;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Completion Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="w-full" />
        <p className="text-center mt-2 text-sm text-muted-foreground">{progress}% Complete</p>
      </CardContent>
    </Card>
  )
}

