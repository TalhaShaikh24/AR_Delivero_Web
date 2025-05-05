import Link from "next/link"
import Image from "next/image"

export default function ServiceOptions() {
  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/delivery" className="block">
            <div className="bg-white rounded-lg p-4 shadow-sm border flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Image src="../assets/delivery.svg" alt="Delivery" width={24} height={24} />
              </div>
              <div>
                <h3 className="font-semibold">Delivery</h3>
                <p className="text-sm text-gray-500">Fast & reliable delivery</p>
              </div>
            </div>
          </Link>

          <Link href="/pickup" className="block">
            <div className="bg-white rounded-lg p-4 shadow-sm border flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Image src="../assets/pickup.svg" alt="Pickup" width={24} height={24} />
              </div>
              <div>
                <h3 className="font-semibold">Pickup</h3>
                <p className="text-sm text-gray-500">Collect your order</p>
              </div>
            </div>
          </Link>

          <Link href="/offers" className="block">
            <div className="bg-white rounded-lg p-4 shadow-sm border flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Image src="../assets/offers.svg" alt="Offers" width={24} height={24} />
              </div>
              <div>
                <h3 className="font-semibold">Offers</h3>
                <p className="text-sm text-gray-500">Best deals for you</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
