import { InfoLayout } from "@/components/layout/info-layout"

export const metadata = {
  title: 'Advertise With Us | BBN NEWS',
  description: 'Reach a global audience by advertising on BBN NEWS.',
}

export default function AdvertisePage() {
  return (
    <InfoLayout title="Advertise With Us">
      <p className="lead text-2xl text-muted-foreground mb-8">
        Connect your brand with our highly engaged, global audience.
      </p>

      <h2>Our Audience</h2>
      <p>
        BBN NEWS reaches millions of unique visitors every month. Our readers are educated, affluent, and influential decision-makers who rely on us for accurate, breaking news and deep analysis. By partnering with BBN NEWS, your brand gains access to a premium audience that values quality and trust.
      </p>

      <h2>Advertising Solutions</h2>
      <p>
        We offer a variety of high-impact advertising solutions tailored to meet your campaign goals:
      </p>
      <ul>
        <li><strong>Display Advertising:</strong> Premium banner placements across our homepage, category pages, and article pages.</li>
        <li><strong>Sponsored Content:</strong> Native articles and branded content crafted in collaboration with our BBN Custom Studios team.</li>
        <li><strong>Newsletter Sponsorships:</strong> Direct access to our subscribers' inboxes through exclusive sponsorships of our daily and weekly newsletters.</li>
        <li><strong>Video Advertising:</strong> Pre-roll and mid-roll video ads on our original video content.</li>
      </ul>

      <h2>Why Partner With Us?</h2>
      <ul>
        <li><strong>Brand Safety:</strong> We provide a brand-safe environment, ensuring your ads appear alongside high-quality, verified journalism.</li>
        <li><strong>Targeting:</strong> Advanced contextual and geographic targeting capabilities to reach your exact desired demographic.</li>
        <li><strong>Performance:</strong> Detailed reporting and analytics to measure the ROI of your campaigns.</li>
      </ul>

      <h2>Get in Touch</h2>
      <p>
        To request our media kit, discuss custom partnerships, or launch a campaign, please contact our sales team:
      </p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:advertise@bbnnews.com">advertise@bbnnews.com</a></li>
        <li><strong>Phone:</strong> +1 (555) 019-8372</li>
      </ul>
      <p>
        Our team will respond within 24 hours to discuss how we can help achieve your marketing objectives.
      </p>
    </InfoLayout>
  )
}
