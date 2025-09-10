"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AuthService } from "@/services/auth-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { User, Lock, Mail, Phone, Edit, Camera, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AddressAutocomplete } from "@/components/address-autocomplete";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

interface UserDetails {
  _id: string;
  username: string;
  email: string;
  userType: string;
  firstName?: string;
  lastName?: string;
  number?: string;
  image?: string;
  isVerifyEmail: boolean;
  isVerifyNumber: boolean;
  status: boolean;
  userStatus: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // For Number Verification
  const [showNumberVerification, setShowNumberVerification] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const [resendOtpLoading, setResendOtpLoading] = useState(false);

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    number: "",
    image: "", // Add image to form state
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Address form state
  const [addressForm, setAddressForm] = useState({
    doorNumber: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    latitude: 0,
    longitude: 0,
  });

  const [addresses, setAddresses] = useState<any[]>([]);
  const [addressLoading, setAddressLoading] = useState(false);

  useEffect(() => {
    if (!AuthService.isLoggedIn()) {
      router.push("/login");
      return;
    }

    const user = AuthService.getCurrentUser();
    setCurrentUser(user);

    if (user) {
      fetchUserDetails(user._id);
      fetchUserAddresses(user._id);
    }

    setIsLoading(false);
  }, [router]);

  const fetchUserDetails = async (userId: string) => {
    try {
      setDetailsLoading(true);
      const response = await AuthService.getUserById(userId);
      if (response.status && response.data) {
        setUserDetails(response.data);
        // Pre-fill the form with existing data
        setProfileForm({
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          number: response.data.number || "",
          image: response.data.image || "",
        });
        // Set image preview if user has an existing image
        if (response.data.image) {
          setImagePreview(response.data.image);
        }
      }
    } catch (error: any) {
      console.error("Failed to fetch user details:", error);
      toast({
        title: "Error",
        description: "Failed to load user details",
        variant: "destructive",
      });
    } finally {
      setDetailsLoading(false);
    }
  };

  const fetchUserAddresses = async (userId: string) => {
    try {
      setAddressLoading(true);
      const response = await AuthService.getUserAddresses(userId);
      if (response.data) {
        setAddresses(response.data);
      }
    } catch (error: any) {
      console.error("Failed to fetch addresses:", error);
      toast({
        title: "Error",
        description: "Failed to load addresses",
        variant: "destructive",
      });
    } finally {
      setAddressLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Convert file to base64 for preview and form state
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      setImagePreview(base64String);
      setProfileForm((prev) => ({
        ...prev,
        image: base64String,
      }));
    };

    reader.onerror = () => {
      toast({
        title: "Upload failed",
        description: "Failed to read the selected file",
        variant: "destructive",
      });
    };

    reader.readAsDataURL(file);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (!profileForm.firstName.trim() || !profileForm.lastName.trim()) {
      toast({
        title: "Validation Error",
        description: "First name and last name are required",
        variant: "destructive",
      });
      return;
    }

    setProfileLoading(true);

    try {
      // First call the Additional Details API
      await AuthService.updateAdditionalDetails(
        currentUser._id,
        profileForm.firstName,
        profileForm.lastName,
        profileForm.number,
      );

      // If we have an image to update, call the profile image update API
      if (profileForm.image && profileForm.image !== userDetails?.image) {
        await AuthService.updateProfileImage(currentUser._id, profileForm.image);
      }

      toast({
        title: "Success",
        description: "Your profile has been successfully updated",
        variant: "success",
      });

      // Refresh user details to get the updated information
      await fetchUserDetails(currentUser._id);
    } catch (error: any) {
      // Check if this is a number verification required error (400 with NUMBERVERIFY)
      if (
        error.message === "Details updated, number verification required" ||
        (profileForm.number && !userDetails?.isVerifyNumber)
      ) {
        // Show number verification popup
        setPhoneNumber(profileForm.number);
        setShowNumberVerification(true);
        toast({
          title: "Profile Updated",
          description: "Please verify your phone number to complete the process",
        });
        return;
      }

      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (!passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "All password fields are required",
        variant: "destructive",
      });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "New password and confirm password do not match",
        variant: "destructive",
      });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setPasswordLoading(true);

    try {
      await AuthService.changePassword(
        currentUser.email,
        passwordForm.newPassword,
        passwordForm.confirmPassword,
      );

      toast({
        title: "Success",
        description: "Your password has been successfully changed",
        variant: "success",
      });

      // Clear form
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      toast({
        title: "Password change failed",
        description: error.message || "Failed to change password",
        variant: "destructive",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressAutocompleteChange = (addressData: any) => {
    setAddressForm((prev) => ({
      ...prev,
      doorNumber: addressData.doorNumber || prev.doorNumber,
      street: addressData.street || prev.street,
      city: addressData.city || prev.city,
      state: addressData.state || prev.state,
      country: addressData.country || prev.country,
      postalCode: addressData.postalCode || prev.postalCode,
      latitude: addressData.latitude || 0,
      longitude: addressData.longitude || 0,
    }));
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (!addressForm.city.trim()) {
      toast({
        title: "Validation Error",
        description: "City is required",
        variant: "destructive",
      });
      return;
    }

    // Check if phone number is provided and not verified, if so, prompt for verification
    if (
      profileForm.number &&
      !userDetails?.isVerifyNumber &&
      !showNumberVerification
    ) {
      setPhoneNumber(profileForm.number);
      setShowNumberVerification(true);
      return; // Prevent address update until number is verified
    }

    setAddressLoading(true);

    try {
      // Prepare API request body in the specified format
      const requestBody = {
        doorNumber: addressForm.doorNumber,
        street: addressForm.street,
        city: addressForm.city,
        state: addressForm.state,
        country: addressForm.country,
        postalCode: addressForm.postalCode,
        location: [addressForm.longitude, addressForm.latitude],
      };

      await AuthService.updateAddress(currentUser._id, requestBody);

      // Update location in header (live update)
      if (addressForm.city && addressForm.state) {
        const newLocationData = {
          latitude: addressForm.latitude,
          longitude: addressForm.longitude,
          formattedAddress: `${addressForm.doorNumber} ${addressForm.street}, ${addressForm.city}, ${addressForm.state}`.trim(),
          city: addressForm.city,
          state: addressForm.state,
          country: addressForm.country,
        };

        // Update location in localStorage and trigger header update
        localStorage.setItem("userLocation", JSON.stringify(newLocationData));
        window.dispatchEvent(
          new CustomEvent("locationChanged", { detail: newLocationData }),
        );
      }

      toast({
        title: "Success",
        description: "Your address has been successfully updated",
        variant: "success",
      });

      // Refresh addresses
      await fetchUserAddresses(currentUser._id);

      // Clear form
      setAddressForm({
        doorNumber: "",
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        latitude: 0,
        longitude: 0,
      });
    } catch (error: any) {
      toast({
        title: "Address update failed",
        description: error.message || "Failed to update address",
        variant: "destructive",
      });
    } finally {
      setAddressLoading(false);
    }
  };

  // Function to send OTP
  const sendOtpToNumber = async () => {
    if (!phoneNumber) {
      toast({
        title: "Error",
        description: "Please enter a phone number",
        variant: "destructive",
      });
      return;
    }
    setOtpLoading(true);
    try {
      await AuthService.sendOtpToNumber(phoneNumber);
      toast({
        title: "Success",
        description: "OTP sent successfully. Please check your phone.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP",
        variant: "destructive",
      });
    } finally {
      setOtpLoading(false);
    }
  };

  // Function to verify OTP
  const verifyOtpCode = async () => {
    if (!otp || !phoneNumber) {
      toast({
        title: "Error",
        description: "Please enter OTP and ensure phone number is set",
        variant: "destructive",
      });
      return;
    }
    setVerifyOtpLoading(true);
    try {
      await AuthService.verifyOtpCode(otp, phoneNumber);
      handleNumberVerificationSuccess(); // Call success handler
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to verify OTP",
        variant: "destructive",
      });
    } finally {
      setVerifyOtpLoading(false);
    }
  };

  // Function to resend OTP
  const resendOtp = async () => {
    setResendOtpLoading(true);
    try {
      await AuthService.sendOtpToNumber(phoneNumber);
      toast({
        title: "Success",
        description: "OTP resent successfully. Please check your phone.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to resend OTP",
        variant: "destructive",
      });
    } finally {
      setResendOtpLoading(false);
    }
  };

  const handleNumberVerificationSuccess = () => {
    setShowNumberVerification(false);
    toast({
      title: "Success",
      description: "Your phone number has been verified successfully",
    });
    // Refresh user details to update verification status
    if (currentUser) {
      fetchUserDetails(currentUser._id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <p className="text-gray-600">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Profile Image Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Profile Picture
              </CardTitle>
              <CardDescription>
                Upload your profile picture (Max size: 5MB)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={
                        imagePreview ||
                        userDetails?.image ||
                        "/placeholder-user.jpg"
                      }
                      alt={
                        userDetails?.firstName || currentUser.username || "User"
                      }
                    />
                    <AvatarFallback className="text-2xl">
                      {userDetails?.firstName?.charAt(0).toUpperCase() ||
                        currentUser.username?.charAt(0).toUpperCase() ||
                        "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div>
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="mb-2"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Photo
                  </Button>
                  <p className="text-sm text-gray-500">
                    JPG, PNG or GIF (Max size: 5MB)
                  </p>
                  {imagePreview && (
                    <p className="text-sm text-green-600 mt-1">
                      Photo selected. Click "Update Profile" to save.
                    </p>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>

          {/* Current User Info Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Current Account Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {detailsLoading ? (
                <div className="text-center py-4">Loading user details...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Username</p>
                      <p className="font-medium">
                        {userDetails?.username ||
                          currentUser.username ||
                          "Not set"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">
                        {userDetails?.email || currentUser.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="font-medium capitalize">
                        {userDetails?.userType?.toLowerCase() ||
                          currentUser.role}
                      </p>
                    </div>
                  </div>

                  {userDetails?.firstName && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <User className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">First Name</p>
                        <p className="font-medium">{userDetails.firstName}</p>
                      </div>
                    </div>
                  )}

                  {userDetails?.lastName && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <User className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Last Name</p>
                        <p className="font-medium">{userDetails.lastName}</p>
                      </div>
                    </div>
                  )}

                  {userDetails?.number && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-medium">{userDetails.number}</p>
                      </div>
                      {!userDetails.isVerifyNumber && (
                        <Dialog
                          open={showNumberVerification}
                          onOpenChange={setShowNumberVerification}
                        >
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setPhoneNumber(userDetails.number!)}
                            >
                              Verify
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Verify Phone Number</DialogTitle>
                              <DialogDescription>
                                Enter the OTP sent to {userDetails.number}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="otp">OTP</Label>
                                <Input
                                  id="otp"
                                  name="otp"
                                  value={otp}
                                  onChange={(e) => setOtp(e.target.value)}
                                  placeholder="Enter OTP"
                                />
                                <Button
                                  variant="link"
                                  onClick={resendOtp}
                                  disabled={resendOtpLoading}
                                  className="p-0 h-auto"
                                >
                                  Resend OTP
                                </Button>
                              </div>
                            </div>
                            <Button
                              onClick={verifyOtpCode}
                              disabled={verifyOtpLoading}
                              className="w-full"
                            >
                              {verifyOtpLoading ? "Verifying..." : "Verify"}
                            </Button>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email Verified</p>
                      <p
                        className={`font-medium ${
                          userDetails?.isVerifyEmail
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {userDetails?.isVerifyEmail ? "Verified" : "Not Verified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone Verified</p>
                      <p
                        className={`font-medium ${
                          userDetails?.isVerifyNumber
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {userDetails?.isVerifyNumber ? "Verified" : "Not Verified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Account Status</p>
                      <p
                        className={`font-medium ${
                          userDetails?.userStatus === "APPROVED"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {userDetails?.userStatus || "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Profile Management Tabs */}
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="profile"
                    className="flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Update Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="address"
                    className="flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Address
                  </TabsTrigger>
                  <TabsTrigger
                    value="password"
                    className="flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    Change Password
                  </TabsTrigger>
                </TabsList>

                {/* Update Profile Tab */}
                <TabsContent value="profile" className="mt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Update Profile Information
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Add or update your personal information
                      </p>
                    </div>

                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            placeholder="Enter your first name"
                            value={profileForm.firstName}
                            onChange={handleProfileChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Enter your last name"
                            value={profileForm.lastName}
                            onChange={handleProfileChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="number">Phone Number</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="number"
                            name="number"
                            type="tel"
                            placeholder="+1234567890"
                            value={profileForm.number}
                            onChange={handleProfileChange}
                            className={
                              userDetails?.isVerifyNumber
                                ? ""
                                : "border-red-500"
                            }
                          />
                          {!userDetails?.isVerifyNumber && (
                            <Dialog
                              open={showNumberVerification}
                              onOpenChange={setShowNumberVerification}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    setPhoneNumber(profileForm.number)
                                  }
                                >
                                  Verify
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Verify Phone Number</DialogTitle>
                                  <DialogDescription>
                                    Enter the OTP sent to {profileForm.number}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="otp">OTP</Label>
                                    <Input
                                      id="otp"
                                      name="otp"
                                      value={otp}
                                      onChange={(e) => setOtp(e.target.value)}
                                      placeholder="Enter OTP"
                                    />
                                    <Button
                                      variant="link"
                                      onClick={resendOtp}
                                      disabled={resendOtpLoading}
                                      className="p-0 h-auto"
                                    >
                                      Resend OTP
                                    </Button>
                                  </div>
                                </div>
                                <Button
                                  onClick={verifyOtpCode}
                                  disabled={verifyOtpLoading}
                                  className="w-full"
                                >
                                  {verifyOtpLoading ? "Verifying..." : "Verify"}
                                </Button>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          Include country code (e.g., +1 for US, +91 for India)
                        </p>
                      </div>

                      <Separator />

                      <Button
                        type="submit"
                        className="w-full bg-[#328bb8] hover:bg-[#2a7ba0]"
                        disabled={profileLoading}
                      >
                        {profileLoading
                          ? "Updating Profile..."
                          : "Update Profile"}
                      </Button>
                    </form>
                  </div>
                </TabsContent>

                {/* Address Management Tab */}
                <TabsContent value="address" className="mt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Manage Addresses
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Add or update your delivery addresses
                      </p>
                    </div>

                    {/* Existing Addresses */}
                    {addresses.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Saved Addresses</h4>
                        <div className="space-y-2">
                          {addresses.map((address, index) => (
                            <div
                              key={index}
                              className="p-3 border rounded-lg bg-gray-50"
                            >
                              <p className="font-medium">
                                {address.doorNumber} {address.street}
                              </p>
                              <p className="text-sm text-gray-600">
                                {address.city}, {address.state} {address.postalCode}
                              </p>
                              <p className="text-sm text-gray-600">
                                {address.country}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleAddressSubmit} className="space-y-4">
                      {/* Address Autocomplete */}
                      <AddressAutocomplete
                        label="Search Address"
                        value={addressForm}
                        onChange={handleAddressAutocompleteChange}
                        placeholder="Search for your address..."
                      />

                      {/* Manual Address Fields */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="doorNumber">Door Number</Label>
                            <Input
                              id="doorNumber"
                              name="doorNumber"
                              placeholder="Enter door number"
                              value={addressForm.doorNumber}
                              onChange={handleAddressChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="street">Street</Label>
                            <Input
                              id="street"
                              name="street"
                              placeholder="Enter street name"
                              value={addressForm.street}
                              onChange={handleAddressChange}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City *</Label>
                            <Input
                              id="city"
                              name="city"
                              placeholder="Enter city"
                              value={addressForm.city}
                              onChange={handleAddressChange}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              name="state"
                              placeholder="Enter state"
                              value={addressForm.state}
                              onChange={handleAddressChange}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              name="country"
                              placeholder="Enter country"
                              value={addressForm.country}
                              onChange={handleAddressChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="postalCode">Postal Code</Label>
                            <Input
                              id="postalCode"
                              name="postalCode"
                              placeholder="Enter postal code"
                              value={addressForm.postalCode}
                              onChange={handleAddressChange}
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <Button
                        type="submit"
                        className="w-full bg-[#328bb8] hover:bg-[#2a7ba0]"
                        disabled={addressLoading}
                      >
                        {addressLoading ? "Updating Address..." : "Add Address"}
                      </Button>
                    </form>
                  </div>
                </TabsContent>

                {/* Change Password Tab */}
                <TabsContent value="password" className="mt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Change Password
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Update your account password for better security
                      </p>
                    </div>

                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password *</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          placeholder="Enter new password"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                        <p className="text-sm text-gray-500">
                          Password must be at least 6 characters long
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm New Password *
                        </Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm new password"
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>

                      <Separator />

                      <Button
                        type="submit"
                        className="w-full bg-[#328bb8] hover:bg-[#2a7ba0]"
                        disabled={passwordLoading}
                      >
                        {passwordLoading ? "Changing Password..." : "Change Password"}
                      </Button>
                    </form>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}