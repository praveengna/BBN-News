import { InfoLayout } from "@/components/layout/info-layout"

export const metadata = {
  title: 'Editorial Policy | BBN NEWS',
  description: 'Our commitment to journalistic integrity and editorial standards.',
}

export default function EditorialPolicyPage() {
  return (
    <InfoLayout title="Editorial Policy" lastUpdated={new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}>
      <p>
        At BBN NEWS, our editorial policy is the foundation of our commitment to journalistic integrity, accuracy, and independence. We strive to provide our readers with fair, unbiased, and comprehensive news coverage.
      </p>

      <h2>1. Accuracy and Verification</h2>
      <p>
        We are dedicated to reporting the truth. Our journalists and automated aggregation systems prioritize accuracy above speed. Before publication, original content is fact-checked, and we rely on reputable, established news sources for aggregated feeds.
      </p>

      <h2>2. Independence and Bias</h2>
      <p>
        BBN NEWS maintains strict editorial independence. Our news coverage is not influenced by political affiliations, corporate interests, advertisers, or personal biases. We aim to present multiple perspectives on complex issues to allow readers to form their own opinions.
      </p>

      <h2>3. Sourcing and Attribution</h2>
      <p>
        We believe in transparent sourcing. Aggregated content is clearly attributed to its original publisher, with direct links to the source material. When reporting original news, we clearly identify our sources, protecting anonymity only when strictly necessary for the safety of the source and when the information is of significant public interest and cannot be obtained otherwise.
      </p>

      <h2>4. Distinction Between News and Opinion</h2>
      <p>
        We maintain a clear separation between news reporting and opinion/editorial content. Opinion pieces, analyses, and commentary are clearly labeled to prevent confusion with objective news reports.
      </p>

      <h2>5. AI and Automation</h2>
      <p>
        BBN NEWS utilizes artificial intelligence to aggregate, summarize, and categorize news from various sources. We are transparent about our use of AI; auto-generated summaries are clearly marked. However, the final editorial responsibility and oversight remain with our human editorial team.
      </p>
    </InfoLayout>
  )
}
