import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#328bb8] text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">AR Delivero</h3>
            <p className="text-sm text-gray-200">
              Your one-stop solution for food, groceries, petrol, and pharmacy needs.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>  
                <Link href="/refund-policy">Refund Policy</Link>
              </li>
              <li>
                <Link href="/return-policy-suppliers">Return Policy for Suppliers</Link>
              </li>
              <li>
                <Link href="/terms-and-conditions">Terms and Conditions</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-sm">
              Rehmani Tech building, Bye pass road Handwara, Kashmir. Near North Kashmir nursing home.
            </p>
            <p className="text-sm mt-2">📞 +91 1955295310, +91 9682329952</p>
            <p className="text-sm mt-1">✉️ admin@ardelivero.com</p>
          </div>
        </div>
        <div className="border-t border-blue-400 pt-6">
          <p className="text-sm text-center">© 2023 AR Delivero. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
