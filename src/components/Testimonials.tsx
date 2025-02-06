import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Ashish Singh",
    role: "Web Developer",
    content:
      "TaskMaster has revolutionized how I manage my team's projects. The intuitive interface and powerful features have boosted our productivity significantly.",
    avatar: "AJ",
  },
  {
    name: "Rajat Sharma",
    role: "Freelance Designer",
    content:
      "As a freelancer juggling multiple clients, TaskMaster has been a game-changer. I can easily track deadlines and prioritize tasks across different projects.",
    avatar: "BS",
  },
  {
    name: "Sonam Gupta",
    role: "Marketing Specialist",
    content:
      "The calendar view in TaskMaster is fantastic! It helps me visualize my marketing campaigns and ensures I never miss an important deadline.",
    avatar: "CD",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-muted">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">{testimonial.content}</p>
              </CardContent>
              <CardFooter className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback className="bg-red-500/90 text-secondary dark:text-[#0A0A0A]">{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

