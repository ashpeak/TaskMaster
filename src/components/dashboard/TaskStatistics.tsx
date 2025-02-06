import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import taskStore from "@/store/taskStore";

export default function TaskStatistics() {

  const analytics = taskStore(state => state.analytics);  
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Statistics</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
          <p className="text-2xl font-bold">{analytics?.completedtask ?? '0'}</p>
          <p className="text-sm text-muted-foreground">Completed</p>
        </div>
        <div className="flex flex-col items-center">
          <Clock className="h-8 w-8 text-yellow-500 mb-2" />
          <p className="text-2xl font-bold">{analytics?.ongoingtask ?? '0'}</p>
          <p className="text-sm text-muted-foreground">In Progress</p>
        </div>
        <div className="flex flex-col items-center">
          <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
          <p className="text-2xl font-bold">{analytics?.duetask ?? '0'}</p>
          <p className="text-sm text-muted-foreground">Due</p>
        </div>
      </CardContent>
    </Card>
  )
}

