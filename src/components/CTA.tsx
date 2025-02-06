import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="bg-primary py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-primary-foreground mb-4">Ready to Boost Your Productivity?</h2>
        <p className="text-xl text-primary-foreground/80 mb-8">
          Join thousands of users who have transformed their task management with TaskMaster.
        </p>
        <Button size="lg" variant="secondary">
          Get Started for Free
        </Button>
      </div>
    </section>
  )
}