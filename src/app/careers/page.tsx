import { InfoLayout } from "@/components/layout/info-layout"

export const metadata = {
  title: 'Careers | BBN NEWS',
  description: 'Join the BBN NEWS team and help shape the future of journalism.',
}

export default function CareersPage() {
  return (
    <InfoLayout title="Careers">
      <p className="lead text-2xl text-muted-foreground mb-8">
        Shape the future of digital journalism. Join the passionate team at BBN NEWS.
      </p>

      <h2>Why Work With Us?</h2>
      <p>
        At BBN NEWS, we are building a media company for the modern era. We combine the rigor of traditional journalism with the agility of a technology startup. We are looking for curious, driven, and innovative individuals to join us in our mission to inform the world.
      </p>

      <h3>What We Offer</h3>
      <ul>
        <li>Competitive salary and equity packages.</li>
        <li>Comprehensive health, dental, and vision insurance.</li>
        <li>Flexible, remote-first work environment.</li>
        <li>Unlimited paid time off (PTO).</li>
        <li>Opportunities for continuous learning and professional development.</li>
      </ul>

      <h2>Open Positions</h2>
      <p>
        We are currently hiring for the following roles. If you don't see a perfect fit but believe you belong at BBN NEWS, please send your resume and a cover letter to <a href="mailto:jobs@bbnnews.com">jobs@bbnnews.com</a>.
      </p>

      <div className="space-y-6 mt-8">
        <div className="border rounded-lg p-6">
          <h3 className="mt-0">Senior Investigative Reporter</h3>
          <p className="text-sm text-muted-foreground">Remote (US/UK) • Full-Time</p>
          <p className="mb-4">We are seeking a seasoned investigative reporter to lead deep-dive projects into politics, corporate accountability, and social issues.</p>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm font-bold">Apply Now</button>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="mt-0">Full Stack Engineer (Next.js)</h3>
          <p className="text-sm text-muted-foreground">Remote (Global) • Full-Time</p>
          <p className="mb-4">Join our core engineering team to build and scale the high-performance Next.js applications that power BBN NEWS.</p>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm font-bold">Apply Now</button>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="mt-0">Audience Editor</h3>
          <p className="text-sm text-muted-foreground">New York / Remote • Full-Time</p>
          <p className="mb-4">Manage our social media presence and develop strategies to grow our readership and engagement across all platforms.</p>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm font-bold">Apply Now</button>
        </div>
      </div>
    </InfoLayout>
  )
}
