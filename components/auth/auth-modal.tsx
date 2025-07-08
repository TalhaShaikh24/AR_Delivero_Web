"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginForm from "@/components/auth/login-form"
import RegisterForm from "@/components/auth/register-form"
import OtpVerificationForm from "@/components/auth/otp-verification-form"
import GuestCheckoutForm from "@/components/auth/guest-checkout-form"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  mode?: "login" | "register" | "guest"
}

export default function AuthModal({ isOpen, onClose, onSuccess, mode = "login" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<string>(mode)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showOtpVerification, setShowOtpVerification] = useState(false)

  const handleRegisterSuccess = (userEmail: string) => {
    setEmail(userEmail)
    setPassword("123456") // Default password for registered users
    setShowOtpVerification(true)
  }

  const handleGuestSuccess = (userEmail: string, userPassword: string) => {
    setEmail(userEmail)
    setPassword(userPassword)
    setShowOtpVerification(true)
  }

  const handleVerificationSuccess = () => {
    onSuccess()
    onClose()
  }

  const handleBackToRegister = () => {
    setShowOtpVerification(false)
  }

  if (showOtpVerification) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verify your email</DialogTitle>
          </DialogHeader>
          <OtpVerificationForm
            email={email}
            password={password}
            onSuccess={handleVerificationSuccess}
            onBack={handleBackToRegister}
          />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Authentication</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="guest">Guest</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm onSuccess={onSuccess} />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm onSuccess={handleRegisterSuccess} />
          </TabsContent>
          <TabsContent value="guest">
            <GuestCheckoutForm onSuccess={handleGuestSuccess} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
