"use client"
import React from "react";
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Clock, 
  HelpCircle,
  Send,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function HelpCenter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 2000);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#328bb8] to-[#6bc83e] rounded-full mb-6">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're here to help! Get support, ask questions, or reach out to our team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-[#328bb8] to-[#6bc83e] rounded-lg">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    Get In Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-100">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <MapPin className="h-5 w-5 text-[#328bb8]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Our Office</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Rehmani Tech building,<br />
                        Bye pass road Handwara,<br />
                        Kashmir.<br />
                        Near North Kashmir nursing home.
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Phone className="h-5 w-5 text-[#6bc83e]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                      <div className="space-y-1">
                        <p className="text-gray-600">+91 1955295310</p>
                        <p className="text-gray-600">+91 9682329952</p>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Mail className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                      <p className="text-gray-600">support@ardelivero.com</p>
                    </div>
                  </div>

                  {/* Operating Hours */}
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Clock className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Support Hours</h3>
                      <div className="space-y-1 text-gray-600">
                        <p>Monday - Saturday: 9:00 AM - 10:00 PM</p>
                        <p>Sunday: 10:00 AM - 8:00 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Preview */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">Quick Help</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-1">Order Issues</h4>
                    <p className="text-sm text-gray-600">Track your order or report problems</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-1">Payment Help</h4>
                    <p className="text-sm text-gray-600">Payment methods and refunds</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-1">Account Support</h4>
                    <p className="text-sm text-gray-600">Login and profile assistance</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-[#328bb8] to-[#6bc83e] rounded-lg">
                      <Send className="h-5 w-5 text-white" />
                    </div>
                    Send Us An Inquiry
                  </CardTitle>
                  <p className="text-gray-600">
                    Have a question or need assistance? Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h3>
                      <p className="text-gray-600 mb-6">
                        Thank you for reaching out. We've received your inquiry and will respond within 24 hours.
                      </p>
                      <Button 
                        onClick={() => setIsSubmitted(false)}
                        className="bg-gradient-to-r from-[#328bb8] to-[#6bc83e] hover:from-[#2e64ab] hover:to-[#5ba838] text-white"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                            Full Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className="border-gray-200 focus:border-[#328bb8] focus:ring-[#328bb8]/20"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                            className="border-gray-200 focus:border-[#328bb8] focus:ring-[#328bb8]/20"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          className="border-gray-200 focus:border-[#328bb8] focus:ring-[#328bb8]/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700">
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="What is this regarding?"
                          className="border-gray-200 focus:border-[#328bb8] focus:ring-[#328bb8]/20"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Please describe your inquiry in detail..."
                          rows={6}
                          className="border-gray-200 focus:border-[#328bb8] focus:ring-[#328bb8]/20 resize-none"
                          required
                        />
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          <p className="font-medium mb-1">Response Time</p>
                          <p>We typically respond to inquiries within 24 hours during business days. For urgent matters, please call us directly.</p>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-[#328bb8] to-[#6bc83e] hover:from-[#2e64ab] hover:to-[#5ba838] text-white py-3 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Sending Message...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Send className="h-5 w-5" />
                            Send Inquiry
                          </div>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Help Section */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-[#328bb8]/10 to-[#6bc83e]/10 rounded-2xl p-8 border border-blue-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Immediate Assistance?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                For urgent matters or if you need immediate help, don't hesitate to call us directly. Our support team is ready to assist you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  className="border-[#328bb8] text-[#328bb8] hover:bg-[#328bb8] hover:text-white"
                  onClick={() => window.location.href = 'tel:+911955295310'}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now: +91 1955295310
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#6bc83e] text-[#6bc83e] hover:bg-[#6bc83e] hover:text-white"
                  onClick={() => window.location.href = 'mailto:support@ardelivero.com'}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email: support@ardelivero.com
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
