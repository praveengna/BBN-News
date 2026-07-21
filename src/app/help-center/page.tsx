import { InfoLayout } from "@/components/layout/info-layout"

export const metadata = {
  title: 'Help Center & Support | BBN NEWS',
  description: 'Find answers to common questions and get support for BBN NEWS.',
}

export default function HelpCenterPage() {
  return (
    <InfoLayout title="Help Center & Support">
      <p className="lead text-xl mb-8">
        How can we help you today? Browse our frequently asked questions or contact our support team.
      </p>

      <h2>Frequently Asked Questions</h2>
      
      <div className="space-y-6 mt-8">
        <div>
          <h3 className="text-xl font-bold mb-2">How do I subscribe to the BBN NEWS newsletter?</h3>
          <p>You can subscribe to our daily or weekly newsletters by entering your email address in the subscription box located in the footer of every page, or on our dedicated Newsletters page.</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">How do I use your RSS feeds?</h3>
          <p>We offer dynamic RSS feeds for all our news categories. You can find the full list of available feeds and subscription instructions on our <a href="/rss-feeds">RSS Feeds</a> page. Simply copy the feed URL into your favorite RSS reader app.</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">I found an error in an article. How do I report it?</h3>
          <p>We take accuracy very seriously. If you spot a factual error, please email us immediately at <a href="mailto:corrections@bbnnews.com">corrections@bbnnews.com</a> with a link to the article. Please review our <a href="/corrections-policy">Corrections Policy</a> for more details.</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">How can I advertise on BBN NEWS?</h3>
          <p>We offer a variety of premium advertising solutions for brands of all sizes. Please visit our <a href="/advertise-with-us">Advertise With Us</a> page to learn more and get in touch with our sales team.</p>
        </div>
      </div>

      <h2 className="mt-12">Still need help?</h2>
      <p>
        If you couldn't find the answer to your question, our dedicated support team is here to assist you.
      </p>
      <ul>
        <li><strong>General Inquiries:</strong> <a href="mailto:support@bbnnews.com">support@bbnnews.com</a></li>
        <li><strong>Technical Support:</strong> <a href="mailto:tech@bbnnews.com">tech@bbnnews.com</a></li>
      </ul>
      <p>
        You can also use the form on our <a href="/contact-us">Contact Us</a> page to send us a direct message.
      </p>
    </InfoLayout>
  )
}
