"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthService } from "@/services/auth-service"
import { toast } from "@/hooks/use-toast"

interface GuestCheckoutFormProps {
  onSuccess: (email: string, password: string) => void
}

export default function GuestCheckoutForm({ onSuccess }: GuestCheckoutFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  })
  const [loading, setLoading] = useState(false)

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

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <Button type="submit" className="w-full bg-[#328bb8]" disabled={loading}>
        {loading ? "Creating Account..." : "Continue as Guest"}
      </Button>
    </form>
  )
}
