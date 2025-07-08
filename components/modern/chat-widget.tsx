"use client"

import { useState } from "react"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi! I'm here to help you with your orders. How can I assist you today?",
    isBot: true,
    timestamp: new Date(),
  },
]

const quickReplies = ["Track my order", "Menu recommendations", "Delivery time", "Payment help"]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(text),
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("track") || message.includes("order")) {
      return "I can help you track your order! Please provide your order number, and I'll get the latest status for you."
    } else if (message.includes("menu") || message.includes("recommend")) {
      return "I'd be happy to recommend some popular dishes! What type of cuisine are you in the mood for today?"
    } else if (message.includes("delivery") || message.includes("time")) {
      return "Our average delivery time is 25-35 minutes. The exact time depends on your location and restaurant preparation time."
    } else if (message.includes("payment") || message.includes("pay")) {
      return "We accept all major credit cards, PayPal, and digital wallets. Is there a specific payment issue you're experiencing?"
    } else {
      return "Thanks for your message! I'm here to help with orders, tracking, recommendations, and any other questions you might have."
    }
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#328bb8] to-[#6bc83e] hover:from-[#2e64ab] hover:to-[#5ab32e] shadow-2xl hover:shadow-[#328bb8]/25 transition-all duration-300 hover:scale-110 ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      {/* Chat Widget */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#328bb8] to-[#6bc83e] p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-white/20 text-white">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-white font-bold text-sm">AR Delivero Support</h3>
              <p className="text-white/80 text-xs">Usually replies instantly</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 h-64 overflow-y-auto space-y-3">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.isBot
                    ? "bg-gray-100 text-gray-800"
                    : "bg-gradient-to-r from-[#328bb8] to-[#6bc83e] text-white"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${message.isBot ? "text-gray-500" : "text-white/70"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Replies */}
        {messages.length === 1 && (
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage(inputValue)
            }}
            className="flex gap-2"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 text-sm"
            />
            <Button
              type="submit"
              size="icon"
              className="bg-gradient-to-r from-[#328bb8] to-[#6bc83e] hover:from-[#2e64ab] hover:to-[#5ab32e] h-10 w-10"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
