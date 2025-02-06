import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is TaskMaster really free?",
    answer:
      "Yes, TaskMaster is completely free to use. We believe in providing powerful productivity tools accessible to everyone.",
  },
  {
    question: "How do I get started with TaskMaster?",
    answer:
      "Getting started is easy! Simply sign up for an account on our website, and you'll be able to start creating and managing tasks right away.",
  },
  {
    question: "Can I use TaskMaster on my mobile device?",
    answer:
      "TaskMaster is fully responsive and works on all devices. We also have dedicated mobile apps for iOS and Android for an optimized mobile experience.",
  },
  {
    question: "Is my data secure with TaskMaster?",
    answer:
      "We take data security very seriously. All your data is encrypted and stored securely. We never share your personal information with third parties.",
  },
  {
    question: "Can I collaborate with my team using TaskMaster?",
    answer:
      "Yes, TaskMaster supports team collaboration. You can easily share tasks and projects with team members and work together efficiently.",
  },
  {
    question: "How often is TaskMaster updated?",
    answer:
      "We regularly update TaskMaster with new features and improvements. We listen to user feedback and strive to implement useful suggestions in our updates.",
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-12 text-foreground">Frequently Asked Questions</h1>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

