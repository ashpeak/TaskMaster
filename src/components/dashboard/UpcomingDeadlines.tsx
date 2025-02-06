import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import taskStore from "@/store/taskStore";

export default function UpcomingDeadlines() {

  const analytics = taskStore(state => state.analytics);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {Array.isArray(analytics?.upcomingdeadline) && analytics.upcomingdeadline.length === 0 && (
            <li className="text-muted-foreground">No upcoming deadlines</li>
          )}
          {Array.isArray(analytics?.upcomingdeadline) && analytics.upcomingdeadline.map((task) => (
            <li key={task.id + task.title} className="flex justify-between items-center">
              <span className="text-sm font-medium line-clamp-1">{task.title}</span>
              <span className="text-sm text-muted-foreground text-nowrap">{task.deadline}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

