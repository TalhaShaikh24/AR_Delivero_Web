import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ReturnPolicySuppliers() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Return Policy for Supplier Partners</h1>
        <p className="mb-2">Effective Date: October 04, 2024</p>
        <p className="mb-2">Applies To: All supplier partners providing goods to AR DELIVERO customers in Jammu and Kashmir, India.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">1. Objective</h2>
        <p className="mb-4">This return policy ensures fair handling of returned products and protects the interests of both our customers and supplier partners. It outlines the conditions under which items can be returned and the responsibilities of each party.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">2. Return Eligibility</h2>
        <p className="mb-4">Customers can request returns for the following reasons:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Wrong item delivered (different from what was ordered)</li>
          <li>Damaged or spoiled products at the time of delivery</li>
          <li>Expired items</li>
          <li>Missing items from the order</li>
        </ul>
        <h3 className="text-xl font-semibold mt-6 mb-2">Return Window</h3>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Perishable items (e.g., bakery, dairy, fresh produce): Must be reported within 2 hours of delivery.</li>
          <li>Packaged or non-perishable grocery items: Must be reported within 24 hours of delivery.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">3. Supplier Responsibilities</h2>
        <p className="mb-4">Suppliers must:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Ensure accurate, high-quality, and fresh inventory</li>
          <li>Properly package items to avoid damage or spoilage during transit</li>
          <li>Accept returns initiated within the allowed time frame and for valid reasons</li>
          <li>Coordinate with AR DELIVERO logistics team for pickup of returned goods</li>
        </ul>
        <p className="mb-4">Failure to comply with quality and packaging standards may lead to:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Deduction of the value of returned goods from the supplier’s payment</li>
          <li>Temporary suspension from the platform for repeated issues</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">4. Return Process</h2>
        <ol className="list-decimal pl-6 mb-4 space-y-1">
          <li>Customer Initiates Return via the AR DELIVERO app</li>
          <li>AR DELIVERO Verifies Claim (photos, description, timestamps)</li>
          <li>Logistics Team Picks Up Item, if required</li>
          <li>Returned Product Assessed and reported to supplier</li>
          <li>Refund/Deduction Processed based on the outcome</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 mb-2">5. Non-Returnable Items</h2>
        <p className="mb-4">Unless delivered in error or defective, the following are non-returnable:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Custom-made bakery products</li>
          <li>Opened or used items</li>
          <li>Items without original packaging (unless the issue is spoilage or damage)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">6. Dispute Resolution</h2>
        <p className="mb-4">If the supplier disputes a return:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>They must notify AR DELIVERO support within 24 hours of return notification</li>
          <li>Disputes will be reviewed by our Quality Assurance team with supporting evidence (photos, delivery timestamps, etc.)</li>
          <li>Final decision will be made within 3 business days</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">7. Modifications</h2>
        <p className="mb-4">AR DELIVERO reserves the right to update this policy. Supplier partners will be notified of changes at least 7 days in advance.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Contact</h2>
        <p className="mb-4">For support or questions regarding returns:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><b>Email:</b> support@ardelivero.in</li>
          <li><b>Phone:</b> +91-XXXXXXXXXX</li>
        </ul>
      </main>
      <Footer />
    </>
  );
}