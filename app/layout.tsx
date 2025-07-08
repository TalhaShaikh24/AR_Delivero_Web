import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/context/cart-context"
import CartSidebar from "@/components/cart/cart-sidebar"
import type { ReactNode } from "react"

interface RootLayoutProps {
  children: ReactNode
}

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AR Delivero - Food Delivery Service",
  description: "Your one-stop solution for food, groceries, petrol, and pharmacy needs.",
  generator: "v0.dev",
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <CartProvider>
            {children}
            <CartSidebar />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
