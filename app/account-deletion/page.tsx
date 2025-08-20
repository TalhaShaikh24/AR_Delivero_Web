"use client";

import React, { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AccountDeletion() {
  const [email, setEmail] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-100 py-16 px-4">
        <div className="bg-white/90 shadow-xl rounded-2xl p-8 max-w-md w-full border border-gray-200">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center text-[#328bb8]">Account Deletion</h1>
          <p className="text-gray-600 mb-6 text-center">Enter your email to request account deletion. You will be asked to confirm before we proceed.</p>
          {submitted ? (
            <div className="text-green-600 text-center font-semibold py-8">Your account deletion request has been submitted.</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="bg-white/60 border border-[#328bb8] focus:border-[#6bc83e] text-gray-900 placeholder:text-gray-400 rounded-lg px-4 py-3 shadow-sm focus:bg-white/90"
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#328bb8] to-[#6bc83e] hover:from-[#2e64ab] hover:to-[#5ab32e] text-white font-semibold rounded-lg py-3 text-lg shadow-md"
              >
                Request Account Deletion
              </Button>
            </form>
          )}
        </div>
        {/* Confirmation Dialog */}
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-[#328bb8]">Confirm Deletion</h2>
              <p className="mb-6 text-gray-700">Are you sure you want to delete your account associated with <span className="font-semibold">{email}</span>? This action cannot be undone.</p>
              <div className="flex gap-4 justify-end">
                <Button variant="outline" onClick={() => setShowConfirm(false)} className="border-gray-300">Cancel</Button>
                <Button onClick={handleConfirm} className="bg-gradient-to-r from-[#328bb8] to-[#6bc83e] text-white">Yes, Delete</Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
} 