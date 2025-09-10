
"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Rocket, 
  Lightbulb, 
  Heart, 
  Target, 
  DollarSign,
  Bike,
  Truck,
  Settings,
  Palette,
  TrendingUp,
  Clock,
  MapPin,
  Mail,
  Send,
  Star,
  Award,
  Globe,
  Briefcase
} from "lucide-react"

export default function CareersPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const benefits = [
    {
      icon: Rocket,
      title: "Growth Opportunities",
      description: "Be part of a fast-growing startup",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Lightbulb,
      title: "Learning & Innovation",
      description: "Work with cutting-edge delivery technology",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Heart,
      title: "Supportive Culture",
      description: "Respect, teamwork, and inclusivity",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Target,
      title: "Impact",
      description: "Contribute to transforming the delivery ecosystem of J&K",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: DollarSign,
      title: "Competitive Pay & Incentives",
      description: "Earn fairly with rewards for performance",
      color: "from-indigo-500 to-purple-500"
    }
  ]

  const jobOpenings = [
    {
      id: 1,
      title: "Riders",
      icon: Bike,
      department: "Operations",
      location: "Multiple Locations",
      type: "Full-time",
      description: "Join our fleet as a delivery rider and be the face of AR DELIVERO",
      requirements: ["Valid driving license", "Own vehicle preferred", "Good communication skills"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Delivery Partners",
      icon: Truck,
      department: "Operations",
      location: "Handwara, Kupwara",
      type: "Full-time",
      description: "Manage delivery operations in your area",
      requirements: ["Local area knowledge", "Customer service skills", "Reliability"],
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      title: "Fleet Supervisors",
      icon: Users,
      department: "Operations",
      location: "Handwara",
      type: "Full-time",
      description: "Supervise and coordinate delivery fleet operations",
      requirements: ["Management experience", "Leadership skills", "Problem-solving abilities"],
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      title: "Technology & Support",
      icon: Settings,
      department: "Technology",
      location: "Handwara",
      type: "Full-time",
      description: "IT Support, computer hardware maintenance",
      requirements: ["Technical knowledge", "Hardware troubleshooting", "Problem-solving"],
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      title: "Graphic Designers & Marketing Associates",
      icon: Palette,
      department: "Marketing",
      location: "Remote/Handwara",
      type: "Full-time",
      description: "Create visual content and marketing materials",
      requirements: ["Design software proficiency", "Creative thinking", "Marketing knowledge"],
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 6,
      title: "Digital Marketer",
      icon: TrendingUp,
      department: "Marketing",
      location: "Remote/Handwara",
      type: "Full-time",
      description: "Drive digital marketing campaigns and online presence",
      requirements: ["Digital marketing experience", "Social media expertise", "Analytics skills"],
      color: "from-cyan-500 to-blue-500"
    }
  ]

  const applicationSteps = [
    {
      step: "01",
      title: "Browse Positions",
      description: "Review our current job openings and find the role that matches your skills",
      icon: Globe
    },
    {
      step: "02",
      title: "Submit Application",
      description: "Send your resume + cover letter to admin@ardelivero.com",
      icon: Send
    },
    {
      step: "03",
      title: "Subject Line",
      description: "Mention the position title in the subject line of your email",
      icon: Mail
    },
    {
      step: "04",
      title: "HR Contact",
      description: "Shortlisted candidates will be contacted by our HR team",
      icon: Users
    }
  ]

  return (
    <div className={`flex flex-col min-h-screen transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#328bb8] via-[#4a9bc9] to-[#6bc83e] text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "30px 30px" }}
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                Join Our Team
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Careers at
                <span className="block text-[#6bc83e]">AR DELIVERO</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                We are delivery partners — we are a growing family of innovators, problem-solvers, and changemakers
              </p>
              <div className="flex items-center justify-center gap-2 text-white/80 mb-8">
                <MapPin className="w-5 h-5" />
                <span>Jammu & Kashmir, India</span>
              </div>
              <Button 
                className="bg-white text-[#328bb8] hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105"
                onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Briefcase className="w-5 h-5 mr-2" />
                View Open Positions
              </Button>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Our mission is to make life easier for people in Jammu & Kashmir by delivering essentials with speed, reliability, and trust. We are always looking for passionate, hardworking, and ambitious individuals to join us on this journey.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-[#328bb8] to-[#6bc83e] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Tech Enthusiasts</h4>
                  <p className="text-gray-600">Innovation-driven individuals</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-[#6bc83e] to-[#328bb8] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Customer Service Experts</h4>
                  <p className="text-gray-600">People-focused professionals</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-[#328bb8] to-[#6bc83e] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Bike className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Delivery Partners</h4>
                  <p className="text-gray-600">Skilled and reliable riders</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Work With Us?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover the benefits of joining the AR DELIVERO family
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8 text-center">
                    <div className={`bg-gradient-to-r ${benefit.color} p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h4>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Current Openings */}
        <section id="openings" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Current Openings</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Find your perfect role and start your journey with AR DELIVERO
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {jobOpenings.map((job) => (
                <Card key={job.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`bg-gradient-to-r ${job.color} p-3 rounded-full flex-shrink-0`}>
                        <job.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                          <Badge className="bg-green-100 text-green-800">{job.type}</Badge>
                        </div>
                        <p className="text-[#328bb8] font-medium mb-1">{job.department}</p>
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">{job.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="text-gray-600 text-sm flex items-center">
                            <Star className="w-3 h-3 text-[#6bc83e] mr-2 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      className={`w-full bg-gradient-to-r ${job.color} text-white hover:scale-105 transition-all duration-300`}
                      onClick={() => window.location.href = `mailto:admin@ardelivero.com?subject=Application for ${job.title}&body=Dear AR DELIVERO Team,%0A%0AI am writing to express my interest in the ${job.title} position.%0A%0APlease find my resume attached.%0A%0ABest regards`}
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How to Apply */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">How to Apply</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Simple steps to join our team
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {applicationSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gradient-to-r from-[#328bb8] to-[#6bc83e] p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="bg-gradient-to-r from-[#328bb8] to-[#6bc83e] text-white px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                      STEP {step.step}
                    </div>
                    <h4 className="font-bold text-gray-800 mb-3">{step.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Card className="border-0 shadow-lg max-w-2xl mx-auto">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-center mb-4">
                      <Mail className="w-8 h-8 text-[#328bb8] mr-3" />
                      <h3 className="text-2xl font-bold text-gray-800">Ready to Apply?</h3>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Send your application to our HR team
                    </p>
                    <Button 
                      className="bg-gradient-to-r from-[#328bb8] to-[#6bc83e] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105"
                      onClick={() => window.location.href = 'mailto:admin@ardelivero.com?subject=Job Application - [Position Title]&body=Dear AR DELIVERO Team,%0A%0AI am writing to express my interest in joining your team.%0A%0APlease find my resume and cover letter attached.%0A%0ABest regards'}
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Application
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Future with AR DELIVERO */}
        <section className="py-20 bg-gradient-to-r from-[#328bb8] to-[#6bc83e] text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                Future Opportunities
              </Badge>
              <h2 className="text-4xl font-bold mb-8">Future with AR DELIVERO</h2>
              <p className="text-xl leading-relaxed mb-8 text-white/90">
                As we expand into Petrol Delivery and Pharmacy Delivery, new opportunities will open across operations, logistics, technology, and management.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-8 text-center">
                    <div className="bg-white/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-white">Petrol Delivery</h4>
                    <p className="text-white/80">New roles in fuel logistics and delivery operations</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-8 text-center">
                    <div className="bg-white/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-white">Pharmacy Delivery</h4>
                    <p className="text-white/80">Healthcare delivery specialists and coordinators</p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Star className="w-12 h-12 text-[#6bc83e] mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-4">
                  Come grow with us and make an impact in the future of doorstep convenience in Jammu & Kashmir!
                </h3>
                <Button 
                  className="bg-white text-[#328bb8] hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 mt-6"
                  onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Award className="w-5 h-5 mr-2" />
                  Join Our Team Today
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
