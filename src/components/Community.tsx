import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MessageSquare, Heart, Award } from "lucide-react"

const communityFeatures = [
  {
    title: "Join Our Community",
    description: "Connect with like-minded individuals and share productivity tips.",
    icon: Users,
  },
  {
    title: "Discussion Forums",
    description: "Engage in discussions about task management and productivity hacks.",
    icon: MessageSquare,
  },
  {
    title: "User Spotlights",
    description: "Get inspired by success stories from our community members.",
    icon: Heart,
  },
  {
    title: "Monthly Challenges",
    description: "Participate in productivity challenges and win exciting rewards.",
    icon: Award,
  },
]

export default function Community() {
  return (
    <section id="community" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Join Our Thriving Community</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {communityFeatures.map((feature, index) => (
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

