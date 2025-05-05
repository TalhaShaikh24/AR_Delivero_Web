"use client"

import { useState } from "react"
import Header from "@/components/header"
import SearchBar from "@/components/search-bar"
import Footer from "@/components/footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingBag } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"

// Mock data - would normally come from an API
const menuItems = {
  item1: {
    id: "item1",
    name: "Delicious Burger",
    description:
      "A juicy beef patty topped with cheese, lettuce, tomato, and our special sauce, served on a toasted brioche bun.",
    price: 12.99,
    image: "/placeholder.svg?height=400&width=600",
    restaurant: "Burger Haven",
    options: [
      {
        name: "Size",
        required: true,
        choices: [
          { id: "regular", name: "Regular", price: 0 },
          { id: "large", name: "Large", price: 2.5 },
        ],
      },
      {
        name: "Add-ons",
        required: false,
        choices: [
          { id: "extra-cheese", name: "Extra Cheese", price: 1.5 },
          { id: "bacon", name: "Bacon", price: 2 },
          { id: "avocado", name: "Avocado", price: 1.5 },
        ],
      },
    ],
    relatedItems: ["item2", "item3", "item4"],
  },
  item2: {
    id: "item2",
    name: "Veggie Pizza",
    description:
      "Fresh vegetables including bell peppers, onions, mushrooms, and olives on our signature tomato sauce and mozzarella cheese.",
    price: 14.99,
    image: "/placeholder.svg?height=400&width=600",
    restaurant: "Pizza Palace",
    options: [
      {
        name: "Size",
        required: true,
        choices: [
          { id: "medium", name: "Medium", price: 0 },
          { id: "large", name: "Large", price: 3 },
        ],
      },
      {
        name: "Crust",
        required: true,
        choices: [
          { id: "thin", name: "Thin Crust", price: 0 },
          { id: "thick", name: "Thick Crust", price: 1 },
          { id: "stuffed", name: "Stuffed Crust", price: 2.5 },
        ],
      },
    ],
    relatedItems: ["item1", "item3", "item5"],
  },
  item3: {
    id: "item3",
    name: "Chicken Biryani",
    description:
      "Fragrant basmati rice cooked with tender chicken pieces, aromatic spices, and herbs. Served with raita.",
    price: 16.99,
    image: "/placeholder.svg?height=400&width=600",
    restaurant: "Spice Garden",
    options: [
      {
        name: "Spice Level",
        required: true,
        choices: [
          { id: "mild", name: "Mild", price: 0 },
          { id: "medium", name: "Medium", price: 0 },
          { id: "hot", name: "Hot", price: 0 },
        ],
      },
      {
        name: "Add-ons",
        required: false,
        choices: [
          { id: "extra-raita", name: "Extra Raita", price: 1 },
          { id: "naan", name: "Naan Bread", price: 2.5 },
        ],
      },
    ],
    relatedItems: ["item1", "item2", "item6"],
  },
  item4: {
    id: "item4",
    name: "Pasta Carbonara",
    description: "Classic Italian pasta with creamy sauce, pancetta, eggs, and parmesan cheese.",
    price: 13.99,
    image: "/placeholder.svg?height=400&width=600",
    restaurant: "Italian Delight",
    options: [
      {
        name: "Pasta Type",
        required: true,
        choices: [
          { id: "spaghetti", name: "Spaghetti", price: 0 },
          { id: "fettuccine", name: "Fettuccine", price: 0 },
          { id: "penne", name: "Penne", price: 0 },
        ],
      },
    ],
    relatedItems: ["item1", "item5", "item6"],
  },
  item5: {
    id: "item5",
    name: "Sushi Platter",
    description:
      "Assortment of fresh sushi including nigiri, maki, and sashimi. Served with wasabi, ginger, and soy sauce.",
    price: 22.99,
    image: "/placeholder.svg?height=400&width=600",
    restaurant: "Asian Fusion",
    options: [
      {
        name: "Size",
        required: true,
        choices: [
          { id: "small", name: "Small (12 pcs)", price: 0 },
          { id: "medium", name: "Medium (18 pcs)", price: 8 },
          { id: "large", name: "Large (24 pcs)", price: 15 },
        ],
      },
    ],
    relatedItems: ["item2", "item3", "item6"],
  },
  item6: {
    id: "item6",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with Caesar dressing, croutons, and shaved parmesan cheese.",
    price: 9.99,
    image: "/placeholder.svg?height=400&width=600",
    restaurant: "Green Eats",
    options: [
      {
        name: "Protein",
        required: false,
        choices: [
          { id: "chicken", name: "Add Grilled Chicken", price: 3 },
          { id: "shrimp", name: "Add Grilled Shrimp", price: 4 },
          { id: "salmon", name: "Add Grilled Salmon", price: 5 },
        ],
      },
      {
        name: "Dressing",
        required: true,
        choices: [
          { id: "regular", name: "Regular", price: 0 },
          { id: "light", name: "Light", price: 0 },
          { id: "side", name: "On the Side", price: 0 },
        ],
      },
    ],
    relatedItems: ["item1", "item2", "item4"],
  },
}

export default function MenuItemPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { addItem, toggleCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, any>>({})

  // Get the menu item based on the ID from the URL
  const item = menuItems[params.id]

  if (!item) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <SearchBar />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Item not found</h1>
            <Button onClick={() => router.push("/")}>Back to Home</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Calculate additional price from selected options
  const calculateAdditionalPrice = () => {
    let additionalPrice = 0
    Object.keys(selectedOptions).forEach((optionGroup) => {
      const selectedChoice = selectedOptions[optionGroup]
      if (selectedChoice) {
        const option = item.options.find((opt) => opt.name === optionGroup)
        if (option) {
          const choice = option.choices.find((c) => c.id === selectedChoice)
          if (choice) {
            additionalPrice += choice.price
          }
        }
      }
    })
    return additionalPrice
  }

  // Calculate total price
  const totalPrice = (item.price + calculateAdditionalPrice()) * quantity

  // Handle option selection
  const handleOptionChange = (optionGroup: string, choiceId: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [optionGroup]: choiceId,
    })
  }

  // Handle add to cart
  const handleAddToCart = () => {
    // Check if all required options are selected
    const allRequiredSelected = item.options
      .filter((option) => option.required)
      .every((option) => selectedOptions[option.name])

    if (!allRequiredSelected) {
      alert("Please select all required options")
      return
    }

    // Create selected options text for cart display
    const optionsText = Object.keys(selectedOptions)
      .map((optionGroup) => {
        const option = item.options.find((opt) => opt.name === optionGroup)
        if (option) {
          const choice = option.choices.find((c) => c.id === selectedOptions[optionGroup])
          if (choice) {
            return `${optionGroup}: ${choice.name}`
          }
        }
        return null
      })
      .filter(Boolean)
      .join(", ")

    // Add item to cart
    addItem({
      id: `${item.id}-${Object.values(selectedOptions).join("-")}`,
      name: `${item.name}${optionsText ? ` (${optionsText})` : ""}`,
      price: item.price + calculateAdditionalPrice(),
      quantity,
      image: item.image,
      restaurant: item.restaurant,
    })

    // Open cart
    toggleCart()
  }

  // Get related items
  const relatedItems = item.relatedItems.map((id) => menuItems[id]).filter(Boolean)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SearchBar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden h-[300px] md:h-[400px] relative">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <h1 className="text-2xl font-bold">{item.name}</h1>
              <p className="text-gray-500 mt-1">{item.restaurant}</p>
              <p className="mt-4">{item.description}</p>
              <p className="text-xl font-bold mt-4">${item.price.toFixed(2)}</p>

              {/* Options */}
              <div className="mt-6 space-y-6">
                {item.options.map((option) => (
                  <div key={option.name}>
                    <h3 className="font-medium mb-2">
                      {option.name} {option.required && <span className="text-red-500">*</span>}
                    </h3>
                    <div className="space-y-2">
                      {option.choices.map((choice) => (
                        <label key={choice.id} className="flex items-center">
                          <input
                            type="radio"
                            name={option.name}
                            value={choice.id}
                            checked={selectedOptions[option.name] === choice.id}
                            onChange={() => handleOptionChange(option.name, choice.id)}
                            className="mr-2"
                            required={option.required}
                          />
                          <span>
                            {choice.name}
                            {choice.price > 0 && ` (+$${choice.price.toFixed(2)})`}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quantity */}
              <div className="mt-6">
                <h3 className="font-medium mb-2">Quantity</h3>
                <div className="flex items-center border rounded-md w-fit">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center">{quantity}</span>
                  <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total and Add to Cart */}
              <div className="mt-6">
                <p className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</p>
                <Button className="mt-4 w-full bg-[#328bb8]" onClick={handleAddToCart}>
                  <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Related Items */}
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedItems.map((relatedItem) => (
                <div
                  key={relatedItem.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm border cursor-pointer"
                  onClick={() => router.push(`/menu/${relatedItem.id}`)}
                >
                  <div className="h-[160px] relative">
                    <Image
                      src={relatedItem.image || "/placeholder.svg"}
                      alt={relatedItem.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold">{relatedItem.name}</h3>
                    <p className="text-sm text-gray-500">{relatedItem.restaurant}</p>
                    <p className="font-medium mt-2">${relatedItem.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
