import { InfoLayout } from "@/components/layout/info-layout"

export const metadata = {
  title: 'Contact Us | BBN NEWS',
  description: 'Get in touch with the BBN NEWS team.',
}

export default function ContactUsPage() {
  return (
    <InfoLayout title="Contact Us">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        <div>
          <h2>Get in Touch</h2>
          <p className="mb-6">
            We value your feedback, tips, and inquiries. Use the form to send us a direct message, or reach out to the specific departments below.
          </p>

          <h3>Department Emails</h3>
          <ul className="list-none pl-0 space-y-3">
            <li><strong>News Tips:</strong> <a href="mailto:tips@bbnnews.com">tips@bbnnews.com</a></li>
            <li><strong>Editorial Team:</strong> <a href="mailto:editor@bbnnews.com">editor@bbnnews.com</a></li>
            <li><strong>Advertising:</strong> <a href="mailto:advertise@bbnnews.com">advertise@bbnnews.com</a></li>
            <li><strong>Press Inquiries:</strong> <a href="mailto:press@bbnnews.com">press@bbnnews.com</a></li>
            <li><strong>Support:</strong> <a href="mailto:support@bbnnews.com">support@bbnnews.com</a></li>
          </ul>

          <h3 className="mt-8">Headquarters</h3>
          <p className="not-prose text-muted-foreground leading-relaxed">
            BBN NEWS Corporation<br />
            1 World Trade Center, Suite 4500<br />
            New York, NY 10007<br />
            United States
          </p>
        </div>

        <div>
          <div className="bg-muted p-8 rounded-xl border">
            <h3 className="mt-0 mb-6 font-heading text-2xl font-bold">Send a Message</h3>
            <form className="space-y-4 not-prose flex flex-col" action="mailto:support@bbnnews.com" method="POST" encType="text/plain">
              <div>
                <label htmlFor="name" className="block text-sm font-bold mb-1">Name</label>
                <input type="text" id="name" name="name" required className="w-full p-3 rounded border bg-background" placeholder="Your name" />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-bold mb-1">Email Address</label>
                <input type="email" id="email" name="email" required className="w-full p-3 rounded border bg-background" placeholder="your@email.com" />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-bold mb-1">Subject</label>
                <select id="subject" name="subject" className="w-full p-3 rounded border bg-background">
                  <option>General Inquiry</option>
                  <option>News Tip</option>
                  <option>Report an Error</option>
                  <option>Advertising</option>
                  <option>Technical Support</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-bold mb-1">Message</label>
                <textarea id="message" name="message" required rows={5} className="w-full p-3 rounded border bg-background" placeholder="How can we help you?"></textarea>
              </div>
              
              <button type="submit" className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded hover:bg-primary/90 transition-colors uppercase tracking-wide">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </InfoLayout>
  )
}
