import { InfoLayout } from "@/components/layout/info-layout"

export const metadata = {
  title: 'Disclaimer | BBN NEWS',
  description: 'Legal disclaimer regarding the content published on BBN NEWS.',
}

export default function DisclaimerPage() {
  return (
    <InfoLayout title="Disclaimer" lastUpdated={new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}>
      <p>
        The information provided by BBN NEWS on our website and mobile applications is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
      </p>

      <h2>1. External Links Disclaimer</h2>
      <p>
        The site may contain (or you may be sent through the site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
      </p>

      <h2>2. Professional Advice Disclaimer</h2>
      <p>
        The site cannot and does not contain legal, financial, or medical advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice.
      </p>

      <h2>3. Affiliates Disclaimer</h2>
      <p>
        The site may contain links to affiliate websites, and we may receive an affiliate commission for any purchases made by you on the affiliate website using such links.
      </p>

      <h2>4. Views and Opinions Disclaimer</h2>
      <p>
        The views and opinions expressed in opinion pieces, columns, and editorial content belong solely to the original authors and do not necessarily represent the views and opinions of BBN NEWS, its staff, or its management.
      </p>

      <h2>5. Contact Us</h2>
      <p>
        If you have any questions regarding this disclaimer, please contact us at <a href="mailto:legal@bbnnews.com">legal@bbnnews.com</a>.
      </p>
    </InfoLayout>
  )
}
