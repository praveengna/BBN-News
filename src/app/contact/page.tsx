import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-2xl">
      <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary mb-8 text-center border-b pb-8">
        Contact Us
      </h1>
      
      <p className="text-center text-muted-foreground mb-10 text-lg">
        Have a news tip, feedback, or a general inquiry? We&apos;d love to hear from you.
      </p>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Subject</label>
          <Input id="subject" placeholder="How can we help?" />
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message</label>
          <textarea 
            id="message" 
            className="flex min-h-[150px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Your message here..."
          ></textarea>
        </div>
        <Button size="lg" className="w-full text-md font-bold uppercase tracking-wider">
          Send Message
        </Button>
      </form>
      
      <div className="mt-16 text-center text-sm text-muted-foreground">
        <p>Email: bhaskarbreaking@gmail.com</p>
        <p>Phone: 8770037950</p>
        <p className="mt-4">Suraj Bhawan, Behind Jio Office, B.G. Road, Guna, M.P, India</p>
      </div>
    </div>
  )
}
