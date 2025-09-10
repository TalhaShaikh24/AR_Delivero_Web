"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { CreditCard, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/context/cart-context";
import { AuthService } from "@/services/auth-service";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AuthModal from "@/components/auth/auth-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Address {
  doorNumber: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

interface UserDetails {
  _id: string;
  firstName?: string;
  email?: string;
  number?: string;
  isVerifyNumber?: boolean;
}

const DELIVERY_FEE = 2.99;
const TAX_RATE = 0.08;
const API_URLS = {
  MPAY_QR: "https://api.ardelivero.com/api/v1/create-mpay-qr",
  ORDER_CREATE: "https://api.ardelivero.com/api/v1/order/create",
};
const HEADERS = {
  "Content-Type": "application/json",
  Authorization: "demoServerKey",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [paymentType, setPaymentType] = useState<"Cash" | "Mpay">("Cash");
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const [txnId, setTxnId] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const total = subtotal + DELIVERY_FEE + subtotal * TAX_RATE;

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    getValues,
  } = useForm<CheckoutForm>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = AuthService.isLoggedIn();
      setIsAuthenticated(isLoggedIn);
      if (!isLoggedIn && items.length > 0) {
        setIsAuthModalOpen(true);
      }
    };

    checkAuth();
  }, [items.length]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = AuthService.getCurrentUser();
        if (user?._id) {
          const res = await AuthService.getUserById(user._id);
          setUserDetails(res?.data || null);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        toast({
          title: "Error",
          description: "Failed to fetch user details",
          variant: "destructive",
        });
      }
    };

    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const user = AuthService.getCurrentUser();
        if (user?._id) {
          const { data } = await AuthService.getUserAddresses(user._id);
          console.log("Fetched addresses:", data);
          setSavedAddresses(data);
          if (data.length === 0) {
            setUseNewAddress(true);
          }
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
        toast({
          title: "Error",
          description: "Failed to fetch saved addresses",
          variant: "destructive",
        });
      }
    };

    if (isAuthenticated) {
      fetchAddresses();
    }
  }, [isAuthenticated]);

  const handleAddressSelection = useCallback(
    (index: number) => {
      const address = savedAddresses[index];
      if (!address) {
        console.log("No address found at index:", index);
        return;
      }

      console.log("Selecting address:", address);
      const addressString = `${address.doorNumber} ${address.street}, ${address.city}, ${address.state} ${address.postalCode}`;
      setSelectedAddressId(address.postalCode);
      setUseNewAddress(false);
      setValue("address", addressString);
      setValue("city", address.city);
      setValue("postalCode", address.postalCode);
      console.log("Selected address ID:", address.postalCode);
    },
    [savedAddresses, setValue]
  );

  useEffect(() => {
    if (savedAddresses.length > 0 && !useNewAddress && !selectedAddressId) {
      console.log("Auto-selecting first address");
      handleAddressSelection(0);
    }
  }, [savedAddresses, useNewAddress, selectedAddressId, handleAddressSelection]);

  useEffect(() => {
    if (!txnId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/check-txn/${txnId}`);
        const data = await res.json();
        if (data?.txn_status === "success") {
          clearInterval(interval);
          toast({
            title: "Payment Successful",
            description: "Your payment was received.",
          });
          await placeOrder();
          setShowQrModal(false);
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [txnId]);

  const validateUserDetails = useCallback(() => {
    if (!userDetails?.number || !userDetails.isVerifyNumber) {
      toast({
        title: "Incomplete Profile",
        description: "Please verify your phone number in your profile.",
        variant: "destructive",
        action: (
          <Button
            onClick={() => router.push("/profile")}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-100"
          >
            Go to Profile
          </Button>
        ),
      });
      return false;
    }
    return true;
  }, [userDetails, router]);

  const handleMpayPayment = useCallback(async () => {
    if (!validateUserDetails()) return;

    setIsPlacingOrder(true);
    try {
      const response = await fetch(API_URLS.MPAY_QR, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({
          amount: total.toFixed(2),
          product_name: "AR Delivero Order",
          customer_name: userDetails?.firstName || getValues("name"),
          customer_number: (userDetails?.number || getValues("phone") || "").replace(/^\+91/, ""),
          customer_email: userDetails?.email || getValues("email"),
        }),
      });

      const data = await response.json();
      if (response.ok && data.status) {
        const paymentUrl = data.data.payment_url;
        setQrUrl(paymentUrl);
        setTxnId(paymentUrl.split("/").pop() || "");
        setShowQrModal(true);
      } else {
        throw new Error(data.message || "Failed to create Mpay QR");
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsPlacingOrder(false);
    }
  }, [userDetails, getValues, validateUserDetails]);

  const placeOrder = useCallback(async () => {
    if (!validateUserDetails()) return;

    setIsPlacingOrder(true);
    try {
      const user = AuthService.getCurrentUser();
      const payload = {
        restaurantId: items[0]?.restaurantId || "",
        userId: user?._id || "",
        paymentType,
        subtotal: subtotal.toString(),
        totalAmount: (subtotal + 10 + 20 + 8).toString(),
        deliveryAddress: getValues("address") || "test address",
        deliveryCharge: "10",
        platformFee: "20",
        gst: "8",
        orderDate: new Date().toISOString(),
        items: JSON.stringify(items.map((i) => ({ menuId: i.id, quantity: i.quantity }))),
        riderTip: "0",
        deliveryInstruction: "this is",
        deliveryTimes: JSON.stringify({ min: "0", max: "10" }),
      };

      const response = await fetch(API_URLS.ORDER_CREATE, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok && data.status) {
        clearCart();
        toast({
          title: "Order Placed",
          description: "Your order has been placed successfully.",
        });
        router.push(
          `/checkout/confirmation?address=${encodeURIComponent(getValues("address"))}&paymentType=${encodeURIComponent(paymentType)}`
        );
      } else {
        throw new Error(data.message || "Failed to place order");
      }
    } catch (error) {
      toast({
        title: "Order Failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsPlacingOrder(false);
    }
  }, [items, paymentType, subtotal, clearCart, router, getValues, validateUserDetails]);



  const handleAddNewAddress = useCallback(() => {
    setUseNewAddress(true);
    setSelectedAddressId("");
    ["name", "email", "phone", "address", "city", "postalCode"].forEach((field) =>
      setValue(field as keyof CheckoutForm, "")
    );
  }, [setValue]);

  const onSubmit: SubmitHandler<CheckoutForm> = async (data) => {
    if (step === 2) {
      if (useNewAddress) {
        const valid = await trigger();
        if (!valid) return;
      } else if (savedAddresses.length === 0) {
        toast({
          title: "No Saved Addresses",
          description: "Please add a new address to continue.",
          variant: "destructive",
        });
        setUseNewAddress(true);
        return;
      } else if (!selectedAddressId || !savedAddresses.some(addr => addr.postalCode === selectedAddressId)) {
        toast({
          title: "Address Required",
          description: "Please select a saved address.",
          variant: "destructive",
        });
        return;
      } else {
        const selectedAddress = savedAddresses.find((addr) => addr.postalCode === selectedAddressId);
        if (selectedAddress) {
          const addressString = `${selectedAddress.doorNumber} ${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.postalCode}`;
          setValue("address", addressString);
          setValue("city", selectedAddress.city);
          setValue("postalCode", selectedAddress.postalCode);
        }
      }
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      paymentType === "Cash" ? await placeOrder() : await handleMpayPayment();
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="mb-6">Add items to your cart before checking out.</p>
            <Button onClick={() => router.push("/")}>Continue Shopping</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAuthenticated(true);
          setIsAuthModalOpen(false);
          router.replace("/checkout");
        }}
        mode="login"
      />
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((n) => (
                <React.Fragment key={n}>
                  <div
                    className={`rounded-full h-10 w-10 flex items-center justify-center ${step >= n ? "bg-[#328bb8] text-white" : "bg-gray-200"
                      }`}
                  >
                    {n}
                  </div>
                  {n < 3 && (
                    <div
                      className={`h-1 w-16 ${step >= n + 1 ? "bg-[#328bb8]" : "bg-gray-200"}`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                {step === 1 && (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" /> Payment Method
                    </h2>
                    <div className="space-y-2">
                      {[
                        { value: "Cash", label: "Cash on Delivery", desc: "Pay with cash when your order arrives" },
                        { value: "Mpay", label: "Mpay UPI QR", desc: "Pay instantly using UPI QR" },
                      ].map(({ value, label, desc }) => (
                        <label key={value} className="flex items-center p-4 border rounded-lg">
                          <input
                            type="radio"
                            name="paymentType"
                            value={value}
                            checked={paymentType === value}
                            onChange={(e) => setPaymentType(e.target.value as "Cash" | "Mpay")}
                            className="mr-3"
                          />
                          <div>
                            <p className="font-medium">{label}</p>
                            <p className="text-sm text-gray-500">{desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                    <Button type="submit" className="w-full bg-[#328bb8]">
                      Continue
                    </Button>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <MapPin className="mr-2 h-5 w-5" /> Delivery Address
                    </h2>
                    <div className="flex items-center mb-4 gap-4">
                      {savedAddresses.length > 0 && (
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="addressSelection"
                            checked={!useNewAddress}
                            onChange={() => handleAddressSelection(0)}
                            className="mr-2"
                            disabled={savedAddresses.length === 0}
                          />
                          Use Saved Address {savedAddresses.length === 0 && <span className="text-gray-500 text-sm">(No saved addresses)</span>}
                        </label>
                      )}
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="addressSelection"
                          checked={useNewAddress}
                          onChange={handleAddNewAddress}
                          className="mr-2"
                        />
                        New Address
                      </label>
                    </div>

                    {!useNewAddress ? (
                      savedAddresses.length > 0 ? (
                        <div className="space-y-4">
                          <label className="block text-sm font-medium">Select Address</label>
                          <div className="grid gap-4">
                            {savedAddresses.map((address, index) => (
                              <label
                                key={address.postalCode}
                                className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${selectedAddressId === address.postalCode
                                    ? "border-[#328bb8] bg-[#328bb8]/10"
                                    : "border-gray-200"
                                  }`}
                              >
                                <input
                                  type="radio"
                                  name="savedAddress"
                                  checked={selectedAddressId === address.postalCode}
                                  onChange={() => handleAddressSelection(index)}
                                  className="mr-3 mt-1"
                                />
                                <div>
                                  <p className="font-medium">{address.doorNumber} {address.street}</p>
                                  <p className="text-sm text-gray-600">
                                    {address.city}, {address.state}, {address.country} {address.postalCode}
                                  </p>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-600">No saved addresses. Please add a new one.</p>
                      )
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Full Name</label>
                            <Input
                              {...register("name", { required: "Full name is required" })}
                              className={errors.name ? "border-red-500" : ""}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <Input
                              type="email"
                              {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+$/, message: "Invalid email" },
                              })}
                              className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Phone Number</label>
                          <Input
                            type="tel"
                            {...register("phone", {
                              required: "Phone number is required",
                              pattern: { value: /^[0-9]{10}$/, message: "Must be exactly 10 digits" },
                            })}
                            className={errors.phone ? "border-red-500" : ""}
                            placeholder="Enter 10 digit phone number"
                          />
                          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Address</label>
                          <Input
                            {...register("address", { required: "Address is required" })}
                            className={errors.address ? "border-red-500" : ""}
                          />
                          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">City</label>
                            <Input
                              {...register("city", { required: "City is required" })}
                              className={errors.city ? "border-red-500" : ""}
                            />
                            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">ZIP</label>
                            <Input
                              {...register("postalCode", { required: "ZIP is required" })}
                              className={errors.postalCode ? "border-red-500" : ""}
                            />
                            {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode.message}</p>}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="pt-4 flex gap-4">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-1/2">
                        Back
                      </Button>
                      <Button type="submit" className="w-1/2 bg-[#328bb8]">
                        Continue
                      </Button>
                    </div>
                  </form>
                )}

                {step === 3 && (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" /> Payment
                    </h2>
                    <div className="pt-4 flex gap-4">
                      <Button type="button" variant="outline" onClick={() => setStep(2)} className="w-1/2">
                        Back
                      </Button>
                      <Button type="submit" className="w-1/2 bg-[#328bb8]" disabled={isPlacingOrder}>
                        {paymentType === "Cash"
                          ? isPlacingOrder
                            ? "Placing Order..."
                            : "Place Order"
                          : isPlacingOrder
                            ? "Processing..."
                            : "Get QR & Pay"}
                      </Button>
                    </div>
                  </form>
                )}

                <Dialog open={showQrModal && paymentType === "Mpay"} onOpenChange={setShowQrModal}>
                  <DialogContent className="max-w-md">
                    <h3 className="text-lg font-bold mb-4">Scan to Pay with UPI</h3>
                    {qrUrl ? (
                      <iframe src={qrUrl} className="w-full h-96 border rounded" />
                    ) : (
                      <p>Loading QR...</p>
                    )}
                    <div className="mt-4 flex flex-col gap-2">
                      <Button
                        onClick={async () => {
                          setShowQrModal(false);
                          await placeOrder();
                        }}
                        className="bg-[#328bb8] w-full"
                        disabled={isPlacingOrder}
                      >
                        {isPlacingOrder ? "Processing..." : "I have paid, Place Order"}
                      </Button>
                      <Button variant="outline" onClick={() => setShowQrModal(false)} className="w-full">
                        Cancel
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex">
                      <div className="h-16 w-16 relative flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="font-medium">{item.name}</p>
                        <div className="flex justify-between text-sm">
                          <span>
                            {item.quantity} x ₹{item.price.toFixed(2)}
                          </span>
                          <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₹{DELIVERY_FEE.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{(subtotal * TAX_RATE).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}