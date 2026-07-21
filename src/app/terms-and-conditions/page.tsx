import { InfoLayout } from "@/components/layout/info-layout"

export const metadata = {
  title: 'Terms & Conditions | BBN NEWS',
  description: 'Terms and conditions for using BBN NEWS services.',
}

export default function TermsAndConditionsPage() {
  return (
    <InfoLayout title="Terms & Conditions" lastUpdated={new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}>
      <p>
        Welcome to BBN NEWS. By accessing or using our website, mobile applications, and services, you agree to comply with and be bound by the following terms and conditions of use.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By using BBN NEWS, you agree to these Terms & Conditions. If you do not agree, please do not use our services.
      </p>

      <h2>2. Intellectual Property</h2>
      <p>
        All content on BBN NEWS, including text, graphics, logos, images, audio clips, digital downloads, and data compilations, is the property of BBN NEWS or its content suppliers and protected by international copyright laws.
      </p>

      <h2>3. Use of Content</h2>
      <p>
        You may access and view the content on BBN NEWS for your personal, non-commercial use only. You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information obtained from our services without prior written consent.
      </p>

      <h2>4. User Contributions</h2>
      <p>
        If you submit comments, ideas, or other content to BBN NEWS, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content.
      </p>

      <h2>5. Disclaimer of Warranties</h2>
      <p>
        BBN NEWS is provided "as is" without any representations or warranties, express or implied. We make no representations or warranties in relation to the completeness, accuracy, reliability, suitability, or availability of the website or the information contained on it.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        BBN NEWS shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of our services.
      </p>

      <h2>7. Governing Law</h2>
      <p>
        These Terms & Conditions are governed by and construed in accordance with the laws of our operating jurisdiction, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have any questions about these Terms & Conditions, please contact us at <a href="mailto:legal@bbnnews.com">legal@bbnnews.com</a>.
      </p>
    </InfoLayout>
  )
}
