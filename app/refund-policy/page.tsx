import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function RefundPolicy() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Return & Refund Policy</h1>
        <p className="mb-2">Last updated: October 04, 2024</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">1. Overview</h2>
        <p className="mb-4">At AR DELIVERO, customer satisfaction is our priority. We ensure the highest quality standards in the products we deliver. However, if you are not satisfied with your order, we offer a transparent return and refund policy under specific conditions.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">2. Eligibility for Return / Refund</h2>
        <p className="mb-4">You may request a return or refund if:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><b>Wrong Item Delivered</b> – If the delivered item is different from what was ordered.</li>
          <li><b>Damaged or Expired Products</b> We don’t provide any replacement or exchange , If the order is damaged, spoiled, expired we will credit the amount in 8 to 10 days in original payment method.</li>
          <li><b>Missing Items</b> – If an item from the confirmed order is missing.</li>
          <li><b>Poor Quality or Stale Products</b> – Especially for bakery or perishable items.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">3. Conditions for Return</h2>
        <p className="mb-4">Requests must be raised within 2 hours of delivery.</p>
        <p className="mb-4">Product must be unused and untampered (except for perishables).</p>
        <p className="mb-4">You must provide photo or video proof via the app or customer support email.</p>
        <p className="mb-4">For bakery or fresh items, refunds will only be processed if the product is stale, moldy, or has visible defects at delivery time only.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">4. Non-Returnable Items</h2>
        <p className="mb-4">The following items are non-returnable unless delivered in unacceptable condition:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Fresh dairy, fruits, and vegetables and processed and prepared Foods</li>
          <li>Frozen and ready-to-eat food.</li>
          <li>Breads and pastries.</li>
          <li>Customized bakery items (e.g., birthday cakes).</li>
        </ul>

.Shapes new chunk from line: 138
        <h2 className="text-2xl font-semibold mt-8 mb-2">5. How to Request a Refund</h2>
        <p className="mb-4">You can initiate a return or refund request by:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Going to the “Order History” section in the app.</li>
          <li>Selecting the relevant order and tapping “Report an Issue”.</li>
          <li>Uploading required photos and submitting the request.</li>
        </ul>
        <p className="mb-4">Or contact:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><b>Customer Support:</b> 9682329952</li>
          <li><b>Email:</b> support@ardelivero.com</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">6. Refund Methods</h2>
        <p className="mb-4">Approved refunds will be processed via:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>If refund is approved than it will get credited in the original payment method</li>
          <li>Original payment method (UPI/card/net banking) within 5–7 business days.</li>
          <li>Wallet credit in the app (if selected). Preferred.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">7. Cancellation Policy</h2>
        <p className="mb-4">Orders can be cancelled before the vendor confirms preparation.</p>
        <p className="mb-4">Once confirmed or dispatched, cancellation is not possible unless:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Delay exceeds 45 minutes beyond estimated time.</li>
          <li>Item becomes unavailable.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">8. Dispute Resolution</h2>
        <p className="mb-4">In case of unresolved issues, you may contact our escalation team at:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><b>Escalation Email:</b> admin@ardelivero.com</li>
        </ul>
        <p className="mb-4">We aim to resolve all queries within 72 hours.</p>
      </main>
      <Footer />
    </>
  );
}