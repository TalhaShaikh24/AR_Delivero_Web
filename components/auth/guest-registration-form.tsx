
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthService } from "@/services/auth-service"
import { toast } from "@/hooks/use-toast"
import PhoneVerificationForm from "./phone-verification-form"

interface GuestRegistrationFormProps {
  onSuccess: (email: string, userId?: string) => void
}

export default function GuestRegistrationForm({ onSuccess }: GuestRegistrationFormProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  
  // Step 1 data
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("guest123") // Default password for guests
  
  // Step 2 data
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "") // Remove non-digits
    
    // Limit to 10 digits after +91
    if (value.length > 10) {
      value = value.slice(0, 10)
    }
    
    // Format with +91 prefix
    if (value.length > 0) {
      setPhoneNumber(`+91${value}`)
    } else {
      setPhoneNumber("")
    }
  }

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Generate username from email if not provided
      const finalUsername = username || email.split("@")[0] + "_guest"
      
      const response = await AuthService.register(email, finalUsername, password, "email")
      toast({
        title: "Guest account created",
        description: "Please verify your email with the OTP sent to your inbox",
      })
      
      setStep(2)
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

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Get current user to get userId
      const currentUser = AuthService.getCurrentUser()
      if (!currentUser) {
        throw new Error("User not found. Please start registration again.")
      }

      // Validate phone number if provided
      if (phoneNumber && (!phoneNumber.startsWith("+91") || phoneNumber.length !== 13)) {
        toast({
          title: "Invalid phone number",
          description: "Please enter a valid 10-digit Indian phone number",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      // Update additional details
      await AuthService.updateProfile(currentUser._id, firstName, lastName, phoneNumber)
      
      toast({
        title: "Profile updated",
        description: "Your additional details have been saved",
      })

      // If phone number provided, proceed to verification step
      if (phoneNumber) {
        setStep(3)
      } else {
        onSuccess(email, currentUser._id)
      }
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update additional details",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneVerificationSuccess = () => {
    const currentUser = AuthService.getCurrentUser()
    onSuccess(email, currentUser?._id)
  }

  const handleSkipPhone = () => {
    const currentUser = AuthService.getCurrentUser()
    onSuccess(email, currentUser?._id)
  }

  if (step === 1) {
    return (
      <form onSubmit={handleStep1Submit} className="space-y-4 py-4">
        <div className="text-center mb-4">
          <div className="flex justify-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-[#328bb8] text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
            <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm">2</div>
            <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm">3</div>
          </div>
          <p className="text-sm text-gray-600">Step 1: Guest Account</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">
            Username <span className="text-sm text-gray-500">(Optional)</span>
          </Label>
          <Input
            id="username"
            placeholder="Will be auto-generated if left empty"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full bg-[#328bb8]" disabled={loading}>
          {loading ? "Creating Guest Account..." : "Continue as Guest"}
        </Button>
      </form>
    )
  }

  if (step === 2) {
    return (
      <form onSubmit={handleStep2Submit} className="space-y-4 py-4">
        <div className="text-center mb-4">
          <div className="flex justify-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">✓</div>
            <div className="w-8 h-8 bg-[#328bb8] text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
            <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm">3</div>
          </div>
          <p className="text-sm text-gray-600">Step 2: Additional Details</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">
            Phone Number <span className="text-sm text-gray-500">(Optional)</span>
          </Label>
          <div className="relative">
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+91XXXXXXXXXX"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="pl-12"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              +91
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Enter your 10-digit Indian mobile number (you can skip this step)
          </p>
        </div>
        <Button type="submit" className="w-full bg-[#328bb8]" disabled={loading}>
          {loading ? "Saving Details..." : "Continue"}
        </Button>
      </form>
    )
  }

  if (step === 3) {
    return (
      <div className="space-y-4 py-4">
        <div className="text-center mb-4">
          <div className="flex justify-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">✓</div>
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">✓</div>
            <div className="w-8 h-8 bg-[#328bb8] text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
          </div>
          <p className="text-sm text-gray-600">Step 3: Phone Verification</p>
        </div>

        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold mb-2">Verify Phone Number</h3>
          <p className="text-sm text-gray-600">
            We'll send a verification code to <strong>{phoneNumber}</strong>
          </p>
        </div>

        <PhoneVerificationForm
          phoneNumber={phoneNumber}
          onSuccess={handlePhoneVerificationSuccess}
          onCancel={handleSkipPhone}
        />

        <Button 
          type="button" 
          variant="outline" 
          className="w-full" 
          onClick={handleSkipPhone}
        >
          Skip Phone Verification
        </Button>
      </div>
    )
  }

  return null
}
