import { InfoLayout } from "@/components/layout/info-layout"

export const metadata = {
  title: 'About Us | BBN NEWS',
  description: 'Learn about BBN NEWS, our mission, and our team.',
}

export default function AboutUsPage() {
  return (
    <InfoLayout title="About Us">
      <p className="lead text-2xl text-muted-foreground mb-8">
        BBN NEWS is a next-generation news platform dedicated to delivering fast, accurate, and comprehensive coverage of global and local events.
      </p>

      <h2>Our Mission</h2>
      <p>
        In a world overwhelmed by information, our mission is to cut through the noise and provide clear, verified, and unbiased news. We believe that an informed public is the foundation of a healthy society. We strive to empower our readers with the knowledge they need to make decisions about their lives, their communities, and the world.
      </p>

      <h2>How We Work</h2>
      <p>
        BBN NEWS combines the best of traditional journalism with cutting-edge technology. 
      </p>
      <ul>
        <li><strong>Original Reporting:</strong> Our dedicated team of journalists investigates and reports on the stories that matter most, from deep-dive investigative pieces to on-the-ground breaking news.</li>
        <li><strong>Smart Aggregation:</strong> We utilize advanced AI and RSS technology to aggregate headlines from the world's most trusted publishers, giving you a 360-degree view of the day's events in one place.</li>
      </ul>

      <h2>Our Values</h2>
      <ul>
        <li><strong>Integrity:</strong> We adhere to the highest ethical standards of journalism.</li>
        <li><strong>Accuracy:</strong> We prioritize truth over speed. If we make a mistake, we own it and correct it.</li>
        <li><strong>Independence:</strong> Our editorial decisions are made free from external influence.</li>
        <li><strong>Innovation:</strong> We continually seek new ways to deliver news more effectively and engagingly.</li>
      </ul>

      <h2>Our Team</h2>
      <p>
        BBN NEWS is powered by a diverse team of reporters, editors, engineers, and designers located across the globe. We are united by our shared passion for truth and our commitment to our readers.
      </p>

      <h2>Contact Us</h2>
      <p>
        We'd love to hear from you. Visit our <a href="/contact-us">Contact Us</a> page to get in touch with our newsroom, support team, or advertising department.
      </p>
    </InfoLayout>
  )
}
