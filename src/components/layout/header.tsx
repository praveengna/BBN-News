import Link from "next/link"
import { Search, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { getLatestArticles } from "@/lib/api/articles"
import { getCategories } from "@/lib/api/taxonomies"

export async function Header() {
  // Fetch top 3 articles dynamically
  const latestArticles = await getLatestArticles(3)
  
  const topStories = latestArticles.map(article => ({
    title: article.headline,
    href: article.url,
    desc: article.summary.substring(0, 80) + '...'
  }))

  const fetchedCategories = await getCategories()
  const displayCategories = fetchedCategories?.slice(0, 8) || []

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle>Menu</SheetTitle>
              <div className="grid gap-4 py-4">
                {displayCategories.map((category: any) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="text-lg font-semibold"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-2xl font-bold tracking-tight text-primary">
              BBN NEWS
            </span>
          </Link>
        </div>
        
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Sections</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {displayCategories.map((category: any) => (
                      <li key={category.id}>
                        <NavigationMenuLink 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          render={<Link href={`/category/${category.slug}`} />}
                        >
                          <div className="text-sm font-medium leading-none">{category.name}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                            {category.description || `Latest news and analysis on ${category.name}.`}
                          </p>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Top Stories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink 
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        render={<Link href="/" />}
                      >
                        <div className="mb-2 mt-4 text-lg font-medium font-heading">
                          BBN NEWS Editor&apos;s Picks
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Handpicked, deeply researched stories from our global newsroom.
                        </p>
                      </NavigationMenuLink>
                    </li>
                    {topStories.map((story) => (
                      <li key={story.href}>
                         <NavigationMenuLink 
                           className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                           render={<Link href={story.href} />}
                         >
                           <div className="text-sm font-medium leading-none">{story.title}</div>
                           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                             {story.desc}
                           </p>
                         </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()}
                  render={<Link href="/video" />}
                >
                  Video
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/search">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
