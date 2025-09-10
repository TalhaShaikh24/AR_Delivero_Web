"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthService } from "@/services/auth-service"
import { toast } from "@/hooks/use-toast"

interface OtpVerificationFormProps {
  email: string
  password: string
  isGuest?: boolean
  onSuccess: () => void
  onBack: () => void
}

export default function OtpVerificationForm({ email, password, isGuest = false, onSuccess, onBack }: OtpVerificationFormProps) {
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes
  const router = useRouter()

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()
    setLoading(true)

    try {
     
      const response = await AuthService.verifyOtp(email, otp)
      
      if (response.status) {

        if (isGuest) {
          await AuthService.login(email, password)
          router.push('/checkout');
        }


        toast({
          title: "Success!",
          description: "Email verified successfully. Redirecting to login...",
        })
        router.push("/login") // Redirect to login page
      } else {
        toast({
          title: "Failure!",
          description: response?.error?.message || "Email verification failed",
        })
      }
    } catch (error: any) {
     
      toast({
        title: "Verification failed",
        description: error?.data?.error?.message || "An error occurred during verification",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setResending(true)
    try {
      const response = await AuthService.resendOtp(email)
      toast({
        title: "OTP resent",
        description: "A new OTP has been sent to your email",
      })
      setTimeLeft(120)
    } catch (error: any) {
      toast({
        title: "Failed to resend OTP",
        description: error.message || "An error occurred while resending OTP",
        variant: "destructive",
      })
    } finally {
      setResending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <p className="text-sm text-gray-500">
        We've sent a verification code to <strong>{email}</strong>. Please enter it below.
      </p>
      <div className="space-y-2">
        <Label htmlFor="otp">Verification Code</Label>
        <Input id="otp" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
      </div>
      <div className="text-sm text-gray-500">
        {timeLeft > 0 ? (
          <p>
            OTP expires in: <span className="font-medium">{timeLeft} seconds</span>
          </p>
        ) : (
          <p>OTP has expired. Please request a new one.</p>
        )}
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="button" variant="ghost" onClick={handleResendOtp} disabled={resending || timeLeft > 0}>
          {resending ? "Resending..." : "Resend Code"}
        </Button>
      </div>
      <Button type="submit" className="w-full bg-[#328bb8]" disabled={loading}>
        {loading ? "Verifying..." : "Verify"}
      </Button>
    </form>
  )
}