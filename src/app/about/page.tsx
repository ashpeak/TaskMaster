import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-12 text-foreground">About TaskMaster</h1>
            <Card className="bg-muted">
              <CardContent className="flex flex-col gap-y-5 max-w-none p-6">
                <p>
                  TaskMaster was born out of a simple idea: to make task management effortless and intuitive for
                  everyone. Our journey began when a group of productivity enthusiasts came together, frustrated with
                  the complexity of existing task management tools.
                </p>
                <p>
                  We believe that managing tasks should be as simple as thinking about them. That&apos;s why we&apos;ve created a
                  platform that combines powerful features with a user-friendly interface, allowing you to focus on what
                  really matters - getting things done.
                </p>
                <p>
                  At TaskMaster, we&apos;re committed to continuous improvement. We regularly update our platform based on
                  user feedback and the latest productivity research. Our goal is to evolve alongside our users,
                  providing tools that adapt to your changing needs.
                </p>
                <p>
                  Join us in our mission to boost productivity worldwide. Whether you&apos;re a student, professional, or
                  anyone in between, TaskMaster is here to help you achieve more, stress less, and live better.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}