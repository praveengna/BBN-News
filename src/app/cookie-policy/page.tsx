import { InfoLayout } from "@/components/layout/info-layout"

export const metadata = {
  title: 'Cookie Policy | BBN NEWS',
  description: 'Information about how BBN NEWS uses cookies and tracking technologies.',
}

export default function CookiePolicyPage() {
  return (
    <InfoLayout title="Cookie Policy" lastUpdated={new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}>
      <p>
        This Cookie Policy explains how BBN NEWS ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
      </p>

      <h2>What are cookies?</h2>
      <p>
        Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
      </p>

      <h2>Why do we use cookies?</h2>
      <p>
        We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our website.
      </p>

      <h2>Types of Cookies We Use</h2>
      <ul>
        <li><strong>Essential Cookies:</strong> These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas.</li>
        <li><strong>Performance and Functionality Cookies:</strong> These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.</li>
        <li><strong>Analytics and Customization Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you.</li>
        <li><strong>Advertising Cookies:</strong> These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.</li>
      </ul>

      <h2>How can I control cookies?</h2>
      <p>
        You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager or by amending your web browser controls to accept or refuse cookies.
      </p>

      <h2>More Information</h2>
      <p>
        If you have any questions about our use of cookies or other technologies, please email us at <a href="mailto:privacy@bbnnews.com">privacy@bbnnews.com</a>.
      </p>
    </InfoLayout>
  )
}
