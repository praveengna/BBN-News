import { InfoLayout } from "@/components/layout/info-layout"

export const metadata = {
  title: 'Corrections Policy | BBN NEWS',
  description: 'Our policy on issuing corrections and clarifications.',
}

export default function CorrectionsPolicyPage() {
  return (
    <InfoLayout title="Corrections Policy" lastUpdated={new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}>
      <p>
        Despite our rigorous fact-checking and editorial standards, errors do happen. At BBN NEWS, we believe that transparency in acknowledging and correcting our mistakes is essential to maintaining your trust.
      </p>

      <h2>1. Prompt Correction</h2>
      <p>
        When a factual error is identified in our original reporting, we commit to correcting it as quickly as possible. We do not quietly delete or alter inaccurate information; we update the article and append a clear correction notice.
      </p>

      <h2>2. Types of Corrections</h2>
      <ul>
        <li><strong>Correction:</strong> Used when a factual error was published. The article is updated with the correct information, and a note is added at the bottom (or top, for major errors) explaining what was changed.</li>
        <li><strong>Clarification:</strong> Used when the facts in the article are technically correct, but the phrasing or context may be misleading.</li>
        <li><strong>Editor's Note:</strong> Used for significant ethical breaches or systemic errors that require a detailed explanation from editorial leadership.</li>
        <li><strong>Retraction:</strong> Used in the rare event that an article's central premise is found to be entirely false or fundamentally flawed. The article may be removed or replaced with a comprehensive explanation of why it was retracted.</li>
      </ul>

      <h2>3. Aggregated Content Errors</h2>
      <p>
        If an error is discovered in an article aggregated from a third-party partner via RSS, we will attempt to pull the updated/corrected version from the partner's feed. If the error is egregious and the partner has not corrected it, we will remove the article from our platform entirely.
      </p>

      <h2>4. Reporting an Error</h2>
      <p>
        We rely on our vigilant readers to help us maintain accuracy. If you believe you have found a factual error in our reporting, please contact us immediately at <a href="mailto:corrections@bbnnews.com">corrections@bbnnews.com</a>. Please include a link to the article and the specific details of the alleged error.
      </p>
    </InfoLayout>
  )
}
