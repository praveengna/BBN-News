import { InfoLayout } from "@/components/layout/info-layout"

export const metadata = {
  title: 'Privacy Policy | BBN NEWS',
  description: 'Learn how BBN NEWS collects, uses, and protects your data.',
}

export default function PrivacyPolicyPage() {
  return (
    <InfoLayout title="Privacy Policy" lastUpdated={new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}>
      <p>
        At BBN NEWS, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard the data you provide when interacting with our website and services.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We may collect the following types of information when you use BBN NEWS:
      </p>
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, and other contact details when you subscribe to our newsletters or create an account.</li>
        <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and links clicked.</li>
        <li><strong>Device Information:</strong> IP address, browser type, and operating system used to access our site.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>
        The information we collect is used to:
      </p>
      <ul>
        <li>Provide and improve our news coverage and website experience.</li>
        <li>Send you newsletters, breaking news alerts, and promotional materials (with your consent).</li>
        <li>Analyze website traffic and user behavior to optimize our content strategy.</li>
        <li>Respond to your inquiries and support requests.</li>
      </ul>

      <h2>3. Data Sharing and Disclosure</h2>
      <p>
        We do not sell, trade, or rent your personal information to third parties. We may share your data with trusted service providers who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
      </p>

      <h2>4. Data Security</h2>
      <p>
        We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        You have the right to access, update, or delete your personal information. If you wish to exercise these rights, please contact us using the information provided below.
      </p>

      <h2>6. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have any questions or concerns about our Privacy Policy, please contact us at <a href="mailto:privacy@bbnnews.com">privacy@bbnnews.com</a>.
      </p>
    </InfoLayout>
  )
}
