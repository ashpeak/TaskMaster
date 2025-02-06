import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Linkedin, Mail, Instagram } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-12 text-foreground">Contact Us</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Your email" />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Your message" />
                    </div>
                    <Button type="submit">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="flex items-center">
                    <Linkedin className="mr-2 h-5 w-5" />
                    <Link href="https://www.linkedin.com/in/ashpeak/" className="text-primary hover:underline">
                      linkedin.com/in/ashpeak/
                    </Link>
                  </p>
                  <p className="flex items-center">
                    <Mail className="mr-2 h-5 w-5" />
                    <a href="mailto:kumarvns130@gmail.com" className="text-primary hover:underline">
                      kumarvns130@gmail.com
                    </a>
                  </p>
                  <p className="flex items-center">
                    <Instagram className="mr-2 h-5 w-5" />
                    <Link href="https://www.instagram.com/_.singhashish/" className="text-primary hover:underline">
                      @_.singhashish
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

