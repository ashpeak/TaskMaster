import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, CheckSquare, Clock, UserPlus } from "lucide-react"

const features = [
  {
    title: "Calendar View",
    description: "Visualize your tasks and events in a clear, intuitive calendar interface.",
    icon: CalendarDays,
  },
  {
    title: "Task Tracker",
    description: "Keep track of your tasks, set priorities, and never miss a deadline.",
    icon: CheckSquare,
  },
  {
    title: "Upcoming Tasks",
    description: "Stay ahead with a clear view of your upcoming tasks and commitments.",
    icon: Clock,
  },
  {
    title: "User Accounts",
    description: "Secure login and signup to keep your tasks and data private and accessible.",
    icon: UserPlus,
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Powerful Features for Effortless Task Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-background">
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

