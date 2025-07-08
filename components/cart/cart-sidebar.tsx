"use client"

import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function CartSidebar() {
  const { items, isCartOpen, toggleCart, removeItem, updateQuantity, subtotal } = useCart()

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-[#328bb8]/5 to-[#6bc83e]/5">
          <h2 className="text-xl font-bold flex items-center text-gray-900">
            <div className="p-2 bg-gradient-to-r from-[#328bb8] to-[#6bc83e] rounded-xl mr-3">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            Your Cart
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleCart} 
            aria-label="Close cart"
            className="rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-110"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="p-6 bg-gradient-to-r from-[#328bb8]/10 to-[#6bc83e]/10 rounded-3xl mb-6">
                <ShoppingBag className="h-16 w-16 text-[#328bb8] mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Your cart is empty</h3>
              <p className="text-gray-600 mb-6 max-w-sm">Add delicious items to get started with your order</p>
              <Button 
                onClick={toggleCart}
                className="bg-gradient-to-r from-[#328bb8] to-[#2e64ab] hover:from-[#2e64ab] hover:to-[#1e4a7a] text-white rounded-xl px-8 py-3 transition-all duration-300 hover:scale-105"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 p-4">
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="h-20 w-20 relative flex-shrink-0 rounded-2xl overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg?height=80&width=80"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 truncate">{item.name}</h3>
                          {item.restaurant && (
                            <p className="text-sm text-[#328bb8] font-medium">{item.restaurant}</p>
                          )}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-500 transition-all duration-300" 
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {/* Price and Quantity */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0 hover:bg-gray-50 transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium text-gray-900">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0 hover:bg-gray-50 transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-bold text-lg text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-gradient-to-r from-gray-50 to-white">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-lg font-bold text-gray-900">Subtotal</span>
                <span className="text-2xl font-bold text-[#328bb8]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="text-sm text-gray-500 bg-white/80 rounded-xl p-3 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#6bc83e] rounded-full"></div>
                  <span>Delivery fee and taxes calculated at checkout</span>
                </div>
              </div>
              <Link href="/checkout" onClick={toggleCart} className="w-full block">
                <Button className="w-full bg-gradient-to-r from-[#328bb8] to-[#2e64ab] hover:from-[#2e64ab] hover:to-[#1e4a7a] text-white rounded-xl py-4 text-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
