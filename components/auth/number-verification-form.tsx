
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthService } from "@/services/auth-service"
import { toast } from "@/hooks/use-toast"

interface NumberVerificationFormProps {
  number: string
  onSuccess: () => void
  onSkip?: () => void
  onBack?: () => void
  showSkip?: boolean
}

export default function NumberVerificationForm({ 
  number, 
  onSuccess, 
  onSkip, 
  onBack, 
  showSkip = false 
}: NumberVerificationFormProps) {
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes
  const [otpSent, setOtpSent] = useState(false)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  useEffect(() => {
    // Send OTP when component mounts
    if (number && !otpSent) {
      sendOtp()
    }
  }, [number, otpSent])

  const sendOtp = async () => {
    try {
      setResending(true)
      await AuthService.sendNumberOtp(number)
      setOtpSent(true)
      setTimeLeft(120)
      toast({
        title: "OTP sent",
        description: "A verification code has been sent to your phone number",
      })
    } catch (error: any) {
      toast({
        title: "Failed to send OTP",
        description: error.message || "An error occurred while sending OTP",
        variant: "destructive",
      })
    } finally {
      setResending(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await AuthService.verifyNumberOtp(otp, number)
      
      toast({
        title: "Success!",
        description: "Phone number verified successfully",
      })
      onSuccess()
    } catch (error: any) {
      toast({
        title: "Verification failed",
        description: error?.data?.message || "An error occurred during verification",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    await sendOtp()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <p className="text-sm text-gray-500">
        We've sent a verification code to <strong>{number}</strong>. Please enter it below.
      </p>
      <div className="space-y-2">
        <Label htmlFor="otp">Verification Code</Label>
        <Input 
          id="otp" 
          placeholder="Enter OTP" 
          value={otp} 
          onChange={(e) => setOtp(e.target.value)} 
          required 
        />
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
        {onBack && (
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
        )}
        <Button 
          type="button" 
          variant="ghost" 
          onClick={handleResendOtp} 
          disabled={resending || timeLeft > 0}
        >
          {resending ? "Resending..." : "Resend Code"}
        </Button>
      </div>
      <Button type="submit" className="w-full bg-[#328bb8]" disabled={loading}>
        {loading ? "Verifying..." : "Verify"}
      </Button>
      {showSkip && onSkip && (
        <Button type="button" variant="outline" className="w-full" onClick={onSkip}>
          Skip for now
        </Button>
      )}
    </form>
  )
}
