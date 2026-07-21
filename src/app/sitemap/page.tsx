import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { InfoLayout } from "@/components/layout/info-layout"

export const metadata = {
  title: 'Sitemap | BBN NEWS',
  description: 'Navigate BBN NEWS with our complete sitemap.',
}

export default async function SitemapPage() {
  const supabase = await createClient()
  
  // Fetch active categories
  const { data: categories } = await supabase
    .from('categories')
    .select('name, slug')
    .order('name')

  return (
    <InfoLayout title="Sitemap">
      <p className="lead">
        Find what you are looking for on BBN NEWS with our comprehensive sitemap.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12 not-prose">
        
        {/* Main Sections */}
        <div>
          <h3 className="font-heading font-bold text-xl uppercase tracking-wider mb-4 border-b pb-2">Main Pages</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="text-primary hover:underline font-medium">Home</Link></li>
            <li><Link href="/search" className="text-primary hover:underline font-medium">Search</Link></li>
            <li><Link href="/video" className="text-primary hover:underline font-medium">Video Center</Link></li>
            <li><Link href="/admin" className="text-primary hover:underline font-medium">Admin Dashboard</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-heading font-bold text-xl uppercase tracking-wider mb-4 border-b pb-2">News Categories</h3>
          <ul className="space-y-2">
            {categories?.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/category/${cat.slug}`} className="text-primary hover:underline font-medium">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company & Legal */}
        <div>
          <h3 className="font-heading font-bold text-xl uppercase tracking-wider mb-4 border-b pb-2">Company</h3>
          <ul className="space-y-2 mb-8">
            <li><Link href="/about-us" className="text-primary hover:underline font-medium">About Us</Link></li>
            <li><Link href="/contact-us" className="text-primary hover:underline font-medium">Contact Us</Link></li>
            <li><Link href="/careers" className="text-primary hover:underline font-medium">Careers</Link></li>
            <li><Link href="/advertise-with-us" className="text-primary hover:underline font-medium">Advertise With Us</Link></li>
            <li><Link href="/help-center" className="text-primary hover:underline font-medium">Help Center / Support</Link></li>
            <li><Link href="/rss-feeds" className="text-primary hover:underline font-medium">RSS Feeds</Link></li>
          </ul>

          <h3 className="font-heading font-bold text-xl uppercase tracking-wider mb-4 border-b pb-2">Legal & Policies</h3>
          <ul className="space-y-2">
            <li><Link href="/privacy-policy" className="text-primary hover:underline font-medium">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions" className="text-primary hover:underline font-medium">Terms & Conditions</Link></li>
            <li><Link href="/cookie-policy" className="text-primary hover:underline font-medium">Cookie Policy</Link></li>
            <li><Link href="/disclaimer" className="text-primary hover:underline font-medium">Disclaimer</Link></li>
            <li><Link href="/editorial-policy" className="text-primary hover:underline font-medium">Editorial Policy</Link></li>
            <li><Link href="/fact-checking-policy" className="text-primary hover:underline font-medium">Fact-Checking Policy</Link></li>
            <li><Link href="/corrections-policy" className="text-primary hover:underline font-medium">Corrections Policy</Link></li>
            <li><Link href="/accessibility" className="text-primary hover:underline font-medium">Accessibility</Link></li>
          </ul>
        </div>
      </div>
    </InfoLayout>
  )
}
