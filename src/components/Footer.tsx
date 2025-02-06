import Link from "next/link"

export default function Footer() {

  const year = new Date().getFullYear()

  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Product</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/features" className="text-base text-muted-foreground hover:text-foreground">
                  Features
                </Link>
              </li>
              <li id="pricing">
                <Link href="#pricing" className="text-base text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-base text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/about" className="text-base text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li id="blog">
                <Link href="#blog" className="text-base text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li id="careers">
                <Link href="#careers" className="text-base text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/contact" className="text-base text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-base text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li id="privacy">
                <Link href="#privacy" className="text-base text-muted-foreground hover:text-foreground">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li id="terms">
                <Link href="#terms" className="text-base text-muted-foreground hover:text-foreground">
                  Terms
                </Link>
              </li>
              <li id="privacy">
                <Link href="#privacy" className="text-base text-muted-foreground hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li id="cookies">
                <Link href="#cookies" className="text-base text-muted-foreground hover:text-foreground">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-muted-foreground/20 pt-8 flex justify-between items-center">
          <p className="text-base text-gray-400">&copy; {year} TaskMaster. All rights reserved.</p>
          <div className="flex space-x-6">{/* Add social media icons here */}</div>
        </div>
      </div>
    </footer>
  )
}

