"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"

export default function CartIcon() {
  const { totalItems, toggleCart } = useCart()

  return (
    <Button variant="ghost" size="icon" className="relative" onClick={toggleCart} aria-label="Shopping cart">
      <ShoppingCart className="h-5 w-5 text-white" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#6bc83e] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Button>
  )
}
