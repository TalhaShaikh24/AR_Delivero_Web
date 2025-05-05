import Header from "@/components/header"
import SearchBar from "@/components/search-bar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HelpCircle, Phone, Mail, MessageSquare } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SearchBar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Help & Support</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <Phone className="h-10 w-10 mx-auto mb-4 text-[#328bb8]" />
              <h2 className="text-lg font-bold mb-2">Call Us</h2>
              <p className="text-gray-600 mb-4">Our support team is available 24/7</p>
              <p className="font-medium">📞 +91 1955295310, +91 9682329952</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <Mail className="h-10 w-10 mx-auto mb-4 text-[#328bb8]" />
              <h2 className="text-lg font-bold mb-2">Email Us</h2>
              <p className="text-gray-600 mb-4">We'll respond within 24 hours</p>
              <p className="font-medium">✉️ admin@ardelivero.com</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <MessageSquare className="h-10 w-10 mx-auto mb-4 text-[#328bb8]" />
              <h2 className="text-lg font-bold mb-2">Live Chat</h2>
              <p className="text-gray-600 mb-4">Chat with our support team</p>
              <Button className="bg-[#328bb8]">Start Chat</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <h3 className="font-bold flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-[#328bb8]" />
                    How do I place an order?
                  </h3>
                  <p className="mt-2 text-gray-600">
                    You can place an order by browsing restaurants or food items, selecting the items you want, and
                    proceeding to checkout.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <h3 className="font-bold flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-[#328bb8]" />
                    What payment methods do you accept?
                  </h3>
                  <p className="mt-2 text-gray-600">
                    We accept credit/debit cards, digital wallets, and cash on delivery for most orders.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <h3 className="font-bold flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-[#328bb8]" />
                    How can I track my order?
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Once your order is confirmed, you can track it in real-time through the "Track Order" section in
                    your account.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <h3 className="font-bold flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-[#328bb8]" />
                    What if I need to cancel my order?
                  </h3>
                  <p className="mt-2 text-gray-600">
                    You can cancel your order within 5 minutes of placing it. After that, please contact our support
                    team.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Contact Us</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <Input id="name" name="name" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <Input id="subject" name="subject" required />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full bg-[#328bb8]">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
