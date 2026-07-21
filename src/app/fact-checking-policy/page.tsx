import { InfoLayout } from "@/components/layout/info-layout"

export const metadata = {
  title: 'Fact-Checking Policy | BBN NEWS',
  description: 'How BBN NEWS verifies information and ensures accuracy.',
}

export default function FactCheckingPolicyPage() {
  return (
    <InfoLayout title="Fact-Checking Policy" lastUpdated={new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}>
      <p>
        Accuracy is the cornerstone of BBN NEWS. We are committed to publishing truthful, verified information. Our fact-checking policy dictates the rigorous standards our journalists and automated systems must adhere to before any content is published.
      </p>

      <h2>1. Verification Process</h2>
      <p>
        All original reporting is subject to a multi-layered verification process. Reporters are required to independently verify facts, cross-reference data, and corroborate statements with primary sources whenever possible. We do not publish rumors or unsubstantiated claims as fact.
      </p>

      <h2>2. Source Reliability</h2>
      <p>
        We evaluate the credibility of our sources rigorously. Anonymous sources are used sparingly and only when the information is critical to the public interest and the source is known to our editorial leadership to be reliable.
      </p>

      <h2>3. Aggregated Content</h2>
      <p>
        For our aggregated news feeds, we exclusively partner with established, reputable news organizations that maintain their own strict fact-checking standards. If an aggregated source is found to consistently violate factual standards, they will be removed from our network.
      </p>

      <h2>4. Combating Misinformation</h2>
      <p>
        In an era of rampant digital misinformation, BBN NEWS actively works to debunk false narratives. We may publish specific fact-check articles to clarify complex issues and hold public figures accountable for their statements.
      </p>
    </InfoLayout>
  )
}
