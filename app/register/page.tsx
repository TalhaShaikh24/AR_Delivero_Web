
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import RegisterForm from "@/components/auth/register-form"
import OtpVerificationForm from "@/components/auth/otp-verification-form"
import { AuthService } from "@/services/auth-service"

export default function RegisterPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showOtpVerification, setShowOtpVerification] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    // Check if user is already logged in
    if (AuthService.isLoggedIn()) {
      setIsAuthenticated(true)
      router.push("/")
    }
  }, [router])

  const handleRegisterSuccess = (userEmail: string) => {
    setEmail(userEmail)
    setShowOtpVerification(true)
  }

  const handleVerificationSuccess = () => {
    router.push("/")
  }

  const handleBackToRegister = () => {
    setShowOtpVerification(false)
  }

  if (isAuthenticated) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-md p-6">
            {!showOtpVerification ? (
              <>
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
                  <p className="text-gray-600">Sign up to get started</p>
                </div>
                
                <RegisterForm onSuccess={handleRegisterSuccess} />
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#328bb8] hover:underline font-medium">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
                  <p className="text-gray-600">Enter the OTP sent to {email}</p>
                </div>
                
                <OtpVerificationForm
                  email={email}
                  password="123456"
                  onSuccess={handleVerificationSuccess}
                  onBack={handleBackToRegister}
                />
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
