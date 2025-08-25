"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { CreditCard, MapPin } from "lucide-react";
import { AuthService } from "@/services/auth-service";
import AuthModal from "@/components/auth/auth-modal";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";

type Address = {
  doorNumber: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCashe: string;
};

type CheckoutForm = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCashe: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CheckoutForm>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCashe: "",
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [paymentType, setPaymentType] = useState("Cash");
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [txnId, setTxnId] = useState("");
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  const deliveryFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    setValue,
  } = useForm<CheckoutForm>({
    defaultValues: formData,
  });

  useEffect(() => {
    const isLoggedIn = AuthService.isLoggedIn();
    setIsAuthenticated(isLoggedIn);
    if (!isLoggedIn && items.length > 0) {
      setIsAuthModalOpen(true);
    }
  }, [items.length]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserAddresses();
    }
  }, [isAuthenticated]);

  const fetchUserAddresses = async () => {
    try {
      const user = AuthService.getCurrentUser();
      if (user && user._id) {
        const addresses = await AuthService.getUserAddresses(user._id);
        setSavedAddresses(addresses.data);
      }
    } catch (error) {
      console.error("Failed to fetch user addresses:", error);
    }
  };
  useEffect(() => {
    if (
      savedAddresses.length > 0 &&
      !useNewAddress &&
      selectedAddressId === ""
    ) {
      handleAddressSelection(0); // Select the first address by default
    }
  }, [savedAddresses, useNewAddress, selectedAddressId]);
  
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
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [txnId]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="mb-6">
              Add some items to your cart before checking out.
            </p>
            <Button onClick={() => router.push("/")}>Continue Shopping</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePaymentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentType(e.target.value);
  };

  async function handleMpayPayment() {
    setIsPlacingOrder(true);
    const url = "https://api.ardelivero.com/api/v1/create-mpay-qr";
    const headers = {
      "Content-Type": "application/json",
      Authorization: "demoServerKey",
    };
    const body = {
      amount: total.toFixed(2),
      product_name: "AR Delivero Order",
      customer_name: formData.name,
      customer_number: formData.phone,
      customer_email: formData.email,
    };
    try {
      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.status === 200 && data.status) {
        const paymentUrl = data.data.payment_url;
        const txnIdFromUrl = paymentUrl.split("/").pop();
        setQrUrl(paymentUrl);
        setRedirectUrl("/checkout/confirmation");
        setTxnId(txnIdFromUrl);
        setShowQrModal(true);
      } else {
        toast({
          title: "Payment Failed",
          description: data.message || "Failed to create Mpay QR",
        });
      }
    } catch (e) {
      toast({
        title: "Payment Failed",
        description: "An error occurred while generating the QR",
      });
    } finally {
      setIsPlacingOrder(false);
    }
  }

  async function placeOrder() {
    setIsPlacingOrder(true);
    try {
      const user = AuthService.getCurrentUser();
      const userId = user?._id || "";
      const restaurantId = items.length > 0 ? items[0].restaurantId || "" : "";

      const cartItems = items.map((i) => ({
        menuId: i.id,
        quantity: i.quantity,
      }));

      const platformFee = 20;
      const deliveryCharge = 10;
      const gst = 8;
      const riderTip = 0;
      const deliveryInstruction = "this is";
      const deliveryTimes = { min: "0", max: "10" };
      const orderDate = new Date().toISOString();
      const totalAmount = (
        subtotal +
        deliveryCharge +
        platformFee +
        gst
      ).toString();

      const payload = {
        restaurantId,
        userId,
        paymentType,
        subtotal: subtotal.toString(),
        totalAmount,
        deliveryAddress: formData.address || "test address",
        deliveryCharge: deliveryCharge.toString(),
        platformFee: platformFee.toString(),
        gst: gst.toString(),
        orderDate,
        items: JSON.stringify(cartItems),
        riderTip: riderTip.toString(),
        deliveryInstruction,
        deliveryTimes: JSON.stringify(deliveryTimes),
      };

      const res = await fetch(
        "https://api.ardelivero.com/api/v1/order/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "demoServerKey",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();
      if (res.ok && data.status) {
        clearCart();
        toast({
          title: "Order placed!",
          description: "Your order has been placed successfully.",
        });
        if (paymentType === "Mpay" && redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          router.push("/checkout/confirmation");
        }
      } else {
        toast({
          title: "Order failed",
          description: data.message || "Failed to place order.",
        });
      }
    } catch (e) {
      toast({
        title: "Order failed",
        description: "An error occurred while placing your order.",
      });
    } finally {
      setIsPlacingOrder(false);
    }
  }

  const onSubmit = async (data: CheckoutForm) => {
    // Handle address selection
    if (step === 2) {
      if (!useNewAddress && selectedAddressId !== "") {
        const selectedAddress = savedAddresses.find(addr => addr.postalCashe === selectedAddressId);
        if (selectedAddress) {
          const addressString = `${selectedAddress.doorNumber} ${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.postalCashe}`;
          setFormData(prev => ({
            ...prev,
            address: addressString,
            city: selectedAddress.city,
            postalCashe: selectedAddress.postalCashe,
          }));
          setValue("address", addressString);
          setValue("city", selectedAddress.city);
          setValue("postalCashe", selectedAddress.postalCashe);
        }
      } else if (useNewAddress) {
        const valid = await trigger();
        if (!valid) return;
        setFormData(data);
        setValue("address", data.address);
        setValue("city", data.city);
        setValue("postalCashe", data.postalCashe);
      } else {
        toast({
          title: "Address Required",
          description: "Please select a saved address or fill in a new address",
          variant: "destructive",
        });
        return;
      }
    } else {
      setFormData(data);
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      if (paymentType === "Cash") {
        await placeOrder();
      } else if (paymentType === "Mpay") {
        await handleMpayPayment();
      }
    }
  };


  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    router.replace("/checkout");
  };

  const handleAddressSelection = (addressIndex: number) => {
    setSelectedAddressId(savedAddresses[addressIndex].postalCashe);
    setUseNewAddress(false);
    const selectedAddress = savedAddresses[addressIndex];
    const addressString = `${selectedAddress.doorNumber} ${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.postalCashe}`;
    setFormData(prev => ({
      ...prev,
      address: addressString,
      city: selectedAddress.city,
      postalCashe: selectedAddress.postalCashe,
    }));
    setValue("address", addressString);
    setValue("city", selectedAddress.city);
    setValue("postalCashe", selectedAddress.postalCashe);
  };

  const handleAddNewAddress = () => {
    setUseNewAddress(true);
    setSelectedAddressId("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCashe: "",
    });
    setValue("name", "");
    setValue("email", "");
    setValue("phone", "");
    setValue("address", "");
    setValue("city", "");
    setValue("postalCashe", "");
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        mode="login"
      />

      {isAuthenticated ? (
        <main className="flex-1 py-8 bg-[#F9FAFB]">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            <div className="flex justify-center mb-8">
              <div className="flex items-center">
                {[1, 2, 3].map((n) => (
                  <React.Fragment key={n}>
                    <div
                      className={`rounded-full h-10 w-10 flex items-center justify-center ${
                        step >= n ? "bg-[#328bb8] text-white" : "bg-gray-200"
                      }`}
                    >
                      {n}
                    </div>
                    {n < 3 && (
                      <div
                        className={`h-1 w-16 ${step >= n + 1 ? "bg-[#328bb8]" : "bg-gray-200"}`}
                      ></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  {step === 1 && (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <h2 className="text-xl font-bold mb-4 flex items-center">
                        <CreditCard className="mr-2 h-5 w-5" /> Choose Payment
                        Method
                      </h2>
                      <div className="space-y-2">
                        <label className="flex items-center p-4 border rounded-lg">
                          <input
                            type="radio"
                            name="paymentType"
                            value="Cash"
                            checked={paymentType === "Cash"}
                            onChange={handlePaymentTypeChange}
                            className="mr-3"
                          />
                          <div>
                            <p className="font-medium">Cash on Delivery</p>
                            <p className="text-sm text-gray-500">
                              Pay with cash when your order arrives
                            </p>
                          </div>
                        </label>
                        <label className="flex items-center p-4 border rounded-lg">
                          <input
                            type="radio"
                            name="paymentType"
                            value="Mpay"
                            checked={paymentType === "Mpay"}
                            onChange={handlePaymentTypeChange}
                            className="mr-3"
                          />
                          <div>
                            <p className="font-medium">Mpay UPI QR</p>
                            <p className="text-sm text-gray-500">
                              Pay instantly using UPI QR
                            </p>
                          </div>
                        </label>
                      </div>
                      <Button type="submit" className="w-full bg-[#328bb8]">
                        Continue
                      </Button>
                    </form>
                  )}

                  {step === 2 && (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <h2 className="text-xl font-bold mb-4 flex items-center">
                        <MapPin className="mr-2 h-5 w-5" /> Delivery Address
                      </h2>

                      <div className="flex items-center mb-4">
                        <label className="flex items-center mr-4">
                          <input
                            type="radio"
                            name="addressSelection"
                            checked={!useNewAddress}
                            onChange={() => {
                              setUseNewAddress(false);
                              if (savedAddresses.length > 0) {
                                handleAddressSelection(0);
                              }
                            }}
                            className="mr-2"
                          />
                          Use Saved Address
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="addressSelection"
                            checked={useNewAddress}
                            onChange={handleAddNewAddress}
                            className="mr-2"
                          />
                          Deliver to different address
                        </label>
                      </div>

                      {!useNewAddress ? (
                        savedAddresses.length > 0 ? (
                          <div className="space-y-4">
                            <label className="block text-sm font-medium mb-1">
                              Select Address
                            </label>
                            <select
                              className="p-2 border rounded-lg w-full"
                              value={selectedAddressId}
                              onChange={(e) => handleAddressSelection(parseInt(e.target.value))}
                            >
                              {savedAddresses.map((address, index) => (
                                <option key={address.postalCashe} value={index}>
                                  {address.doorNumber} {address.street}, {address.city}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <p>You don't have any saved addresses. Please add a new one.</p>
                        )
                      ) : (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Full Name
                              </label>
                              <Input
                                {...register("name", {
                                  required: "Full name is required",
                                })}
                                defaultValue={formData.name}
                              />
                              {errors.name && (
                                <p className="text-red-500 text-sm">
                                  {errors.name.message}
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Email
                              </label>
                              <Input
                                type="email"
                                {...register("email", {
                                  required: "Email is required",
                                  pattern: {
                                    value: /^\S+@\S+$/,
                                    message: "Invalid email",
                                  },
                                })}
                                defaultValue={formData.email}
                              />
                              {errors.email && (
                                <p className="text-red-500 text-sm">
                                  {errors.email.message}
                                </p>
                              )}
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Phone Number
                            </label>
                            <Input
                              type="tel"
                              placeholder="Enter 10 digit phone number"
                              {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                  value: /^[0-9]{10}$/,
                                  message: "Must be exactly 10 digits",
                                },
                              })}
                              defaultValue={formData.phone}
                              className={
                                errors.phone
                                  ? "border-red-500 focus:border-red-500"
                                  : ""
                              }
                            />
                            {errors.phone && (
                              <p className="text-red-500 text-sm">
                                {errors.phone.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Address
                            </label>
                            <Input
                              {...register("address", {
                                required: "Address is required",
                              })}
                              defaultValue={formData.address}
                            />
                            {errors.address && (
                              <p className="text-red-500 text-sm">
                                {errors.address.message}
                              </p>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                City
                              </label>
                              <Input
                                {...register("city", {
                                  required: "City is required",
                                })}
                                defaultValue={formData.city}
                              />
                              {errors.city && (
                                <p className="text-red-500 text-sm">
                                  {errors.city.message}
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                ZIP
                              </label>
                              <Input
                                {...register("postalCashe", {
                                  required: "ZIP is required",
                                })}
                                defaultValue={formData.postalCashe}
                              />
                              {errors.postalCashe && (
                                <p className="text-red-500 text-sm">
                                  {errors.postalCashe.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                      <div className="pt-4 flex gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep(1)}
                          className="w-1/2"
                        >
                          Back
                        </Button>
                        <Button type="submit" className="w-1/2 bg-[#328bb8]">
                          Continue
                        </Button>
                      </div>
                    </form>
                  )}

                  {step === 3 && (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <h2 className="text-xl font-bold mb-4 flex items-center">
                        <CreditCard className="mr-2 h-5 w-5" /> Payment
                      </h2>
                      <div className="pt-4 flex gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep(2)}
                          className="w-1/2"
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          className="w-1/2 bg-[#328bb8]"
                          disabled={isPlacingOrder}
                        >
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

                  {paymentType === "Mpay" && showQrModal && (
                    <Dialog open={showQrModal} onOpenChange={setShowQrModal}>
                      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
                          <h3 className="text-lg font-bold mb-4">
                            Scan to Pay with UPI
                          </h3>
                          {qrUrl ? (
                            <iframe
                              src={qrUrl}
                              className="w-full h-96 border rounded"
                            />
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
                              {isPlacingOrder
                                ? "Processing..."
                                : "I have paid, Place Order"}
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setShowQrModal(false)}
                              className="w-full"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Dialog>
                  )}
                </div>
              </div>

              {/* Order Summary */}
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
                            <span>
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </span>
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
                      <span>₹{deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>₹{tax.toFixed(2)}</span>
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
      ) : (
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
            <p className="mb-6">
              Please log in or continue as guest to proceed with checkout.
            </p>
            <Button onClick={() => setIsAuthModalOpen(true)}>
              Authenticate to Continue
            </Button>
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
}