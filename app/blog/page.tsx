import Header from "@/components/header"
import SearchBar from "@/components/search-bar"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function BlogPage() {
  // This would normally come from an API
  const blogPosts = [
    {
      id: "city-cafes",
      title: "All City Cafes and Restaurants Switched to Delivery Mode",
      excerpt:
        "The pandemic has forced restaurants to adapt quickly to changing consumer behaviors and safety regulations.",
      image: "/placeholder.svg?height=200&width=600",
      category: "Food Blogging",
      date: "December 12, 2023",
      readTime: "5 min read",
    },
    {
      id: "creative-packaging",
      title: "Creative Packaging as a Successful Marketing Move",
      excerpt: "How innovative packaging designs can boost brand recognition and customer satisfaction.",
      image: "/placeholder.svg?height=120&width=200",
      category: "Marketing",
      date: "December 10, 2023",
      readTime: "3 min read",
    },
    {
      id: "food-delivery-services",
      title: "Modern Food Delivery Services Overview",
      excerpt: "A comprehensive look at how food delivery services have evolved and what the future holds.",
      image: "/placeholder.svg?height=120&width=200",
      category: "Food Delivery",
      date: "December 8, 2023",
      readTime: "4 min read",
    },
    {
      id: "bottled-water",
      title: "Bottled Water Home Delivery Companies",
      excerpt: "The growing trend of water delivery services and how they're changing consumer habits.",
      image: "/placeholder.svg?height=120&width=200",
      category: "Bottled Water",
      date: "December 5, 2023",
      readTime: "3 min read",
    },
    {
      id: "healthy-eating",
      title: "Healthy Eating Habits for Busy Professionals",
      excerpt: "Tips and tricks for maintaining a balanced diet despite a hectic schedule.",
      image: "/placeholder.svg?height=200&width=600",
      category: "Health",
      date: "December 3, 2023",
      readTime: "6 min read",
    },
    {
      id: "restaurant-tech",
      title: "Technology Transforming the Restaurant Industry",
      excerpt: "How digital innovations are reshaping the way restaurants operate and serve customers.",
      image: "/placeholder.svg?height=200&width=600",
      category: "Technology",
      date: "December 1, 2023",
      readTime: "7 min read",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SearchBar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Our Blog</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {blogPosts.slice(0, 2).map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id} className="block">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm border h-full">
                  <div className="h-[200px] relative">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    <Badge className="absolute bottom-2 left-2 bg-[#328bb8]">{post.category}</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <p className="text-gray-600 mt-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(2).map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id} className="block">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm border h-full">
                  <div className="h-[160px] relative">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    <Badge className="absolute bottom-2 left-2 bg-[#328bb8]">{post.category}</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold">{post.title}</h3>
                    <p className="text-gray-600 mt-2 text-sm">{post.excerpt}</p>
                    <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
