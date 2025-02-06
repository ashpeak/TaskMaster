import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, CheckSquare, Clock, UserPlus, BarChart, Share2, Bell, Lock } from "lucide-react"

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
  {
    title: "Analytics",
    description: "Gain insights into your productivity with detailed task completion analytics.",
    icon: BarChart,
  },
  {
    title: "Collaboration",
    description: "Share tasks and projects with team members for seamless cooperation.",
    icon: Share2,
  },
  {
    title: "Notifications",
    description: "Receive timely reminders and updates about your tasks and deadlines.",
    icon: Bell,
  },
  {
    title: "Data Security",
    description: "Your data is encrypted and securely stored to ensure privacy and confidentiality.",
    icon: Lock,
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-12 text-foreground">Our Features</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-muted">
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
      </main>
      <Footer />
    </div>
  )
}

