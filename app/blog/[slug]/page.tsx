import Header from "@/components/header"
import SearchBar from "@/components/search-bar"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // This would normally come from an API based on the slug
  const blogPost = {
    title: params.slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    image: "/placeholder.svg?height=400&width=1200",
    category: "Food Delivery",
    date: "December 12, 2023",
    readTime: "5 min read",
    author: "John Doe",
    authorImage: "/placeholder.svg?height=50&width=50",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.</p>
      
      <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.</p>
      
      <h2>The Rise of Food Delivery</h2>
      
      <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.</p>
      
      <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.</p>
      
      <h2>The Future of Food Delivery</h2>
      
      <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.</p>
      
      <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.</p>
    `,
    relatedPosts: [
      {
        id: "healthy-eating",
        title: "Healthy Eating Habits for Busy Professionals",
        image: "/placeholder.svg?height=120&width=200",
        category: "Health",
        date: "December 3, 2023",
      },
      {
        id: "restaurant-tech",
        title: "Technology Transforming the Restaurant Industry",
        image: "/placeholder.svg?height=120&width=200",
        category: "Technology",
        date: "December 1, 2023",
      },
    ],
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SearchBar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-[#328bb8] mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
          </Link>

          <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
            <div className="h-[300px] md:h-[400px] relative">
              <Image src={blogPost.image || "/placeholder.svg"} alt={blogPost.title} fill className="object-cover" />
            </div>

            <div className="p-6 md:p-8">
              <Badge className="mb-4 bg-[#328bb8]">{blogPost.category}</Badge>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{blogPost.title}</h1>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full overflow-hidden relative mr-3">
                    <Image
                      src={blogPost.authorImage || "/placeholder.svg"}
                      alt={blogPost.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{blogPost.author}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{blogPost.date}</span>
                      <span className="mx-2">•</span>
                      <span>{blogPost.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" aria-label="Share">
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Bookmark">
                    <Bookmark className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blogPost.content }} />

              <div className="mt-12 pt-8 border-t">
                <h2 className="text-xl font-bold mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogPost.relatedPosts.map((post) => (
                    <Link href={`/blog/${post.id}`} key={post.id} className="block">
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm border flex flex-col sm:flex-row">
                        <div className="sm:w-1/3 h-[120px] sm:h-auto relative">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4 sm:w-2/3">
                          <Badge className="mb-2 bg-[#328bb8]">{post.category}</Badge>
                          <h3 className="font-bold">{post.title}</h3>
                          <p className="text-sm text-gray-500 mt-2">{post.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
