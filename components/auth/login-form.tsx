"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { AuthService } from "@/services/auth-service";
import NumberVerificationForm from "./number-verification-form";

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNumberVerification, setShowNumberVerification] = useState(false);
  const [userNumber, setUserNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await AuthService.login(email, password);
      
      // Check if user needs number verification
      if (
        response.data?.data?.isVerifyNumber === false &&
        response.data?.data?.number
      ) {
        setUserNumber(response.data.data.number);
        setShowNumberVerification(true);
        toast({
          title: "Login successful",
          description: "Please verify your phone number",
        });
        return;
      }

      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      onSuccess();
    } catch (error: any) {
      // Handle NUMBERVERIFY error for optional phone verification
      if (
        error.response?.status === 400 &&
        error.response?.data?.error?.type === "NUMBERVERIFY"
      ) {
        const responseData = error.response.data;
        if (responseData.status && responseData.data?.isVerifyEmail) {
          // Check if number verification is needed
          if (
            responseData.data?.isVerifyNumber === false &&
            responseData.data?.number
          ) {
            setUserNumber(responseData.data.number);
            setShowNumberVerification(true);
            toast({
              title: "Login successful",
              description: "Please verify your phone number",
            });
            return;
          }

          toast({
            title: "Login successful",
            description: "Email verified. Phone verification is optional.",
          });
          onSuccess();
          return;
        }
      }

      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNumberVerificationSuccess = () => {
    setShowNumberVerification(false);
    toast({
      title: "Phone verified",
      description: "Your phone number has been verified successfully",
    });
    onSuccess();
  };

  const handleSkipNumberVerification = () => {
    setShowNumberVerification(false);
    onSuccess();
  };

  if (showNumberVerification) {
    return (
      <NumberVerificationForm
        number={userNumber}
        onSuccess={handleNumberVerificationSuccess}
        onSkip={handleSkipNumberVerification}
        showSkip={true}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
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
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full bg-[#328bb8]" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
