
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ShipmentPolicy() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Shipment Policy</h1>
        <p className="mb-2">Last updated: August 23, 2025</p>
        <p className="mb-4">
          Welcome to AR Delivero. This Shipment Policy outlines the terms and conditions related to the shipping and delivery of products ordered through our services. By placing an order with AR Delivero, you agree to the terms below.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">1. Business Information</h2>
        <p className="mb-4 font-medium">
          <strong>AR Delivero</strong><br />
          First floor, C/O: Musadiq Nazir, ByePass Road, Handwara<br />
          Jammu & Kashmir, India-193221
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">2. Processing Time</h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>All orders are processed within <strong>1-2 working hours</strong> after payment confirmation for fast delivery</li>
          <li><strong>1-2 Business working days</strong> for post-dated orders</li>
          <li>Orders placed on weekends or public holidays will be processed on the next working day for Bakery or Grocery items</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">3. Delivery Areas</h2>
        <p className="mb-4">AR Delivero currently provides delivery services within <strong>Jammu & Kashmir, India</strong>.</p>
        <p className="mb-4">We do not ship outside this service region at the moment.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">4. Delivery Timelines</h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Standard Delivery:</strong> 1-2 hours after food processing (depending on location within Jammu & Kashmir)</li>
          <li><strong>Express Delivery</strong> (where available): 1 working hour</li>
        </ul>
        <p className="mb-4">
          <em>Note:</em> All the orders are delivered in 1-2 hrs depending on location. Delivery timelines are estimates and may vary due to weather, road conditions, strikes, or other unforeseen circumstances.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">5. Shipping Charges</h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Standard Delivery:</strong> ₹20-₹200 depending on the distance of delivery address from the service area</li>
          <li><strong>Express Delivery:</strong> ₹50-₹400</li>
        </ul>
        <p className="mb-4">Shipping costs (if any) will be displayed at checkout before final payment.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">6. Order Tracking</h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Once your order has been dispatched, you will receive a confirmation message (SMS/WhatsApp/email) with delivery details</li>
          <li>Customers can also contact our support team for real-time updates</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">7. Delivery Attempts</h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Our delivery team will make up to <strong>two attempts</strong> to deliver your order</li>
          <li>If the order cannot be delivered after two attempts due to customer unavailability, it may be returned to our warehouse</li>
          <li>Additional delivery charges may apply for re-dispatch</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">8. Damaged or Missing Shipments</h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Customers are requested to check packages upon delivery</li>
          <li>If you receive a damaged package, please refuse delivery and notify us immediately</li>
          <li>In case of missing or incorrect items, report to our customer support within <strong>1 hour of delivery</strong></li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">9. Shipping Restrictions</h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Deliveries may not be possible in certain remote or restricted areas</li>
          <li>In such cases, our support team will contact you to arrange alternatives</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">10. Customer Support</h2>
        <p className="mb-4">For any shipping-related queries, please contact us:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>📍 Address:</strong> Bye Pass Road, Handwara, Jammu & Kashmir, India-193221</li>
          <li><strong>📞 Phone:</strong> +91 1955295310, +91 9682329952</li>
          <li><strong>📧 Email:</strong> support@ardelivero.com</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
          <p className="text-blue-800">
            If you have any questions about our shipment policy or need assistance with your order, 
            don't hesitate to contact our customer support team. We're here to help!
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
