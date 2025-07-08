"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthService } from "@/services/auth-service"
import { toast } from "@/hooks/use-toast"

interface OtpVerificationFormProps {
  email: string
  password: string
  onSuccess: () => void
  onBack: () => void
}

export default function OtpVerificationForm({ email, password, onSuccess, onBack }: OtpVerificationFormProps) {
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30) // 30 seconds countdown

  useEffect(() => {
    // Start countdown timer
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
      // Verify the OTP (this will handle the 400 NUMBERVERIFY case)
      const response = await AuthService.verifyOtp(email, otp)
      if(response.status){
          // Then automatically log in the user
       const response =    await AuthService.login(email, password)
       debugger;
      }
      // Check if verification was successful (even with optional number verification)
      if (response.status && response.data) {
        // If number verification is optional and we get NUMBERVERIFY error, still proceed
        const isNumberVerifyOptional = response.error?.type === "NUMBERVERIFY"

        if (response.data.isVerifyEmail || isNumberVerifyOptional) {
          toast({
            title: "Success!",
            description: isNumberVerifyOptional
              ? "Email verified successfully. Phone verification is optional."
              : "You have been verified and logged in successfully",
          })

          onSuccess()
        } else {
          throw new Error("Email verification failed")
        }
      } else {
        throw new Error("Verification failed")
      }
    } catch (error: any) {
      // Check if it's the acceptable 400 NUMBERVERIFY error
      if (error.response?.status === 400 && error.response?.data?.error?.type === "NUMBERVERIFY") {
        const responseData = error.response.data

        if (responseData.status && responseData.data?.isVerifyEmail) {
          toast({
            title: "Success!",
            description: "Email verified successfully. Phone verification is optional.",
          })
          onSuccess()
          return
        }
      }

      toast({
        title: "Verification failed",
        description: error.message || "An error occurred during verification",
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
      setTimeLeft(30) // Reset countdown
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
