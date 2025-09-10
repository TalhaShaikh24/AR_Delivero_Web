
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthService } from "@/services/auth-service";
import { toast } from "@/hooks/use-toast";

interface PhoneVerificationFormProps {
  phoneNumber: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PhoneVerificationForm({
  phoneNumber,
  onSuccess,
  onCancel,
}: PhoneVerificationFormProps) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendOtp = async () => {
    setSending(true);
    try {
      await AuthService.sendPhoneOtp(phoneNumber);
      toast({
        title: "OTP Sent",
        description: `Verification code sent to ${phoneNumber}`,
      });
      setTimeLeft(300); // Reset timer
      setCanResend(false);
    } catch (error: any) {
      toast({
        title: "Failed to send OTP",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) return;

    setLoading(true);
    try {
      await AuthService.verifyPhoneOtp(otp, phoneNumber);
      toast({
        title: "Phone Verified",
        description: "Your phone number has been successfully verified",
      });
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "Invalid OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Auto-send OTP when component mounts
  useEffect(() => {
    handleSendOtp();
  }, []);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Verify Phone Number</h3>
        <p className="text-sm text-gray-600">
          We've sent a verification code to <strong>{phoneNumber}</strong>
        </p>
      </div>

      <form onSubmit={handleVerifyOtp} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phoneOtp">Verification Code</Label>
          <Input
            id="phoneOtp"
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            maxLength={6}
            required
          />
        </div>

        <div className="text-sm text-gray-500 text-center">
          {!canResend ? (
            <p>OTP expires in: <span className="font-medium">{formatTime(timeLeft)}</span></p>
          ) : (
            <p>OTP has expired. Please request a new one.</p>
          )}
        </div>

        <div className="flex justify-between gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={handleSendOtp}
            disabled={sending || !canResend}
          >
            {sending ? "Sending..." : "Resend OTP"}
          </Button>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#328bb8] hover:bg-[#2a7ba0]"
          disabled={loading || otp.length !== 6}
        >
          {loading ? "Verifying..." : "Verify Phone Number"}
        </Button>
      </form>
    </div>
  );
}
