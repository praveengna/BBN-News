import Link from "next/link"

const FOOTER_LINKS = {
  Regions: ["World", "India", "Madhya Pradesh", "City News"],
  Topics: ["Politics", "Business", "Technology", "Science", "Health", "Sports", "Entertainment", "Economy"],
  Company: ["About Us", "Careers", "Contact Us", "Advertise With Us", "Help Center"],
  Legal: ["Privacy Policy", "Terms and Conditions", "Cookie Policy", "Disclaimer", "Accessibility"],
  Ethics: ["Editorial Policy", "Fact-Checking Policy", "Corrections Policy"],
  Services: ["RSS Feeds", "Sitemap"]
}

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16 border-t border-zinc-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-heading text-3xl font-bold tracking-tight text-white">
                BBN NEWS
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              BBN NEWS provides comprehensive global and local coverage, trusted by millions. We deliver the truth, faster.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, items]) => (
            <div key={category} className="col-span-1">
              <h4 className="font-heading font-bold text-white uppercase tracking-wider mb-4">{category}</h4>
              <ul className="space-y-2 text-sm">
                {items.map((item) => {
                  // Determine href based on category
                  let href = `/${item.toLowerCase().replace(/\s+/g, '-').replace('&-', '')}`
                  if (category === "Regions" || category === "Topics") {
                    href = `/category${href}`
                  }
                  
                  return (
                    <li key={item}>
                      <Link href={href} className="hover:text-primary transition-colors">
                        {item}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} BBN NEWS Corporation. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Made with precision globally</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
