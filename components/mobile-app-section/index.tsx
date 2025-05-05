import Image from "next/image"
import Link from "next/link"

export default function MobileAppSection() {
  return (
    <section className="py-16 bg-[#f8f6f2] relative overflow-hidden">
      {/* Dotted background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{ backgroundImage: "radial-gradient(#328bb8 1px, transparent 1px)", backgroundSize: "20px 20px" }}
        ></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gray-800">Get More With </span>
              <span className="text-[#328bb8]">Our Application</span>
            </h2>
            <p className="mb-8 text-gray-600 max-w-lg">
              Experience the convenience of food delivery at your fingertips. Track your orders in real-time, discover
              exclusive deals, and enjoy a seamless ordering experience with our mobile app.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#328bb8] text-white flex items-center justify-center font-bold text-lg mr-4">
                  01
                </div>
                <div>
                  <h3 className="font-bold text-lg">Follow Delivery Status</h3>
                  <p className="text-gray-600">Track your order in real-time on a live map</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#328bb8] text-white flex items-center justify-center font-bold text-lg mr-4">
                  02
                </div>
                <div>
                  <h3 className="font-bold text-lg">Order From Any Location</h3>
                  <p className="text-gray-600">Place orders from anywhere, anytime</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#328bb8] text-white flex items-center justify-center font-bold text-lg mr-4">
                  03
                </div>
                <div>
                  <h3 className="font-bold text-lg">Get Important Notices</h3>
                  <p className="text-gray-600">Receive updates about your order and special offers</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                <Image
                  src="../assets/playstore.png"
                  alt="Download on the App Store"
                  width={140}
                  height={42}
                  className="h-auto"
                />
              </Link>
              <Link href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                <Image
                  src="../assets/appstore.png"
                  alt="Get it on Google Play"
                  width={140}
                  height={42}
                  className="h-auto"
                />
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center md:justify-end z-10">
            <div className="relative">
              <Image
                src="../assets/MobileApp.png"
                alt="AR Delivero Mobile App"
                width={300}
                height={600}
                className="object-contain"
              />
              <div className="absolute -right-4 -bottom-4 -z-10 w-[300px] h-[600px] bg-[#328bb8]/10 rounded-[40px]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
