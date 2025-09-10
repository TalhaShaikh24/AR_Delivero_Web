"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { AuthService } from "@/services/auth-service"
import NumberVerificationForm from "./number-verification-form"

interface GuestCheckoutFormProps {
  onSuccess: (email: string, password: string) => void
}

export default function GuestCheckoutForm({ onSuccess }: GuestCheckoutFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    number: "",
  })
  const [loading, setLoading] = useState(false)
  const [showNumberVerification, setShowNumberVerification] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Check if number is provided and not verified
    if (formData.number && !AuthService.isNumberVerified(formData.number)) {
      setShowNumberVerification(true)
      setLoading(false)
      return
    }

    try {
      const response = await AuthService.register(
        formData.email,
        formData.username,
        "123456", // Default password for guest users
        "email",
      )

      toast({
        title: "Registration successful",
        description: "Please check your email for the verification code",
      })

      // Pass both email and password to the parent component
      onSuccess(formData.email, "123456")
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleNumberVerificationSuccess = () => {
    AuthService.markNumberAsVerified(formData.number)
    setShowNumberVerification(false)
    // Optionally, you can auto-login or proceed with checkout here
    handleSubmit(new Event("submit") as React.FormEvent) // Re-submit to proceed with registration
  }

  const handleSkipNumberVerification = () => {
    setShowNumberVerification(false)
    // Allow proceeding without verification if the user chooses to skip
    // This might require a different flow or explicit user action
  }

  if (showNumberVerification) {
    return (
      <NumberVerificationForm
        number={formData.number}
        onSuccess={handleNumberVerificationSuccess}
        onSkip={handleSkipNumberVerification}
        showSkip={true}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="guest-username">Name</Label>
        <Input
          id="guest-username"
          name="username"
          placeholder="Enter your name"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="guest-email">Email</Label>
        <Input
          id="guest-email"
          name="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="guest-number">Phone Number (Optional)</Label>
        <Input
          id="guest-number"
          name="number"
          type="tel"
          placeholder="+1234567890"
          value={formData.number}
          onChange={handleInputChange}
        />
        <p className="text-sm text-gray-500">
          Include country code (e.g., +1 for US, +91 for India)
        </p>
      </div>
      <Button type="submit" className="w-full bg-[#328bb8]" disabled={loading}>
        {loading ? "Creating Account..." : "Continue as Guest"}
      </Button>
      <p className="text-xs text-gray-500 text-center">
        By continuing as guest, you agree to our terms and conditions
      </p>
    </form>
  )
}