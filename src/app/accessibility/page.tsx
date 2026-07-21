import { InfoLayout } from "@/components/layout/info-layout"

export const metadata = {
  title: 'Accessibility | BBN NEWS',
  description: 'BBN NEWS is committed to digital accessibility for all users.',
}

export default function AccessibilityPage() {
  return (
    <InfoLayout title="Accessibility" lastUpdated={new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}>
      <p>
        BBN NEWS is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to guarantee we provide equal access to all of our users.
      </p>

      <h2>1. Conformance Status</h2>
      <p>
        The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. BBN NEWS strives to be fully conformant with WCAG 2.1 level AA.
      </p>

      <h2>2. Accessibility Features</h2>
      <p>
        Our website incorporates the following accessibility features:
      </p>
      <ul>
        <li>Semantic HTML markup for screen readers.</li>
        <li>High contrast modes and dark mode support.</li>
        <li>Keyboard navigability throughout the primary interfaces.</li>
        <li>Alternative text for images and non-text content.</li>
        <li>Clear, readable typography with scalable text sizes.</li>
      </ul>

      <h2>3. Limitations and Alternatives</h2>
      <p>
        Despite our best efforts to ensure accessibility of BBN NEWS, there may be some limitations. Please be aware that our site often aggregates content from third-party sources (e.g., RSS feeds). We cannot guarantee that third-party content, embedded videos, or external widgets will be fully compliant with accessibility standards.
      </p>

      <h2>4. Feedback and Contact</h2>
      <p>
        We welcome your feedback on the accessibility of BBN NEWS. Please let us know if you encounter accessibility barriers on our site:
      </p>
      <ul>
        <li>Email: <a href="mailto:accessibility@bbnnews.com">accessibility@bbnnews.com</a></li>
      </ul>
      <p>
        We try to respond to feedback within 5 business days.
      </p>
    </InfoLayout>
  )
}
