import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutTemplate,
  ShoppingBag,
  Database,
  TrendingUp,
  Lock,
  CreditCard,
  Sliders,
  Globe,
  MessageSquareCode,
  ArrowRight,
  Check,
  CheckCircle2,
  Users,
  Award,
  Star,
  User,
  ExternalLink
} from 'lucide-react'

// Package definitions
const PACKAGES = [
  {
    id: 'landing-page',
    title: 'Landing Page Package',
    price: '9,999',
    icon: LayoutTemplate,
    description: 'High-converting single-page website with fluid animations, mobile responsiveness, and custom typography to launch your business.',
    features: [
      'Custom React & Tailwind UI',
      'Mobile-First Layout',
      'Framer Motion Animations',
      'Basic SEO Optimization',
      'Social Media Integration',
      'Standard Lead Capture Form'
    ],
    badge: 'Popular for Startups'
  },
  {
    id: 'e-commerce',
    title: 'E-Commerce Package',
    price: '29,999',
    icon: ShoppingBag,
    description: 'Bespoke digital storefront designed to convert visits into sales. Includes products list, shopping cart, and payment integrations.',
    features: [
      'Everything in Landing Page',
      'Up to 50 Product Listings',
      'Interactive Shopping Cart & Checkout',
      'Payment Gateway (Razorpay/Stripe)',
      'Customer Email Notifications',
      'Simple Inventory Control Panel'
    ],
    badge: 'Growth Focused'
  },
  {
    id: 'full-stack',
    title: 'Full-Stack Web App',
    price: '59,999',
    icon: Database,
    description: 'Highly scalable custom SaaS platform or business dashboard. Built with database integrations, private portals, and advanced user roles.',
    features: [
      'Everything in E-Commerce',
      'User Registration & Profiles',
      'Custom Database Design (SQL/NoSQL)',
      'Advanced Admin Dashboard',
      'Secure User Roles & JWT Auth',
      'Real-Time Sync & Live APIs'
    ],
    badge: 'Enterprise Grade'
  }
]

// Add-ons list
const ADD_ONS = [
  {
    title: 'Advanced SEO & Speed',
    price: '3,499',
    icon: TrendingUp,
    description: 'Schema markup, asset minification, compression, XML sitemaps, and Google Analytics setup.'
  },
  {
    title: 'User Authentication',
    price: '5,999',
    icon: Lock,
    description: 'Secure passwords database, session tokens, and social auth (Google/GitHub/OTP).'
  },
  {
    title: 'Razorpay/Stripe Payment',
    price: '4,999',
    icon: CreditCard,
    description: 'Checkout screens, webhook hooks, receipt generation, and payment configuration.'
  },
  {
    title: 'Custom Admin Panel',
    price: '9,999',
    icon: Sliders,
    description: 'A dedicated dashboard backend to manage active users, logs, listings, and configurations.'
  },
  {
    title: 'Multi-language Setup',
    price: '3,999',
    icon: Globe,
    description: 'Routing translations, language selector UI, and localized database content mapping.'
  },
  {
    title: 'Live Chat Integration',
    price: '4,999',
    icon: MessageSquareCode,
    description: 'Real-time WebSockets widget or integration with Intercom, Tawk.to, or WhatsApp Chat.'
  }
]

// Trust factors
const TESTIMONIALS = [
  {
    quote: "AR TECH SOLUTIONS completely transformed our web presence. Our online lead generation rate jumped by 42% in the first month!",
    author: "Sarah Jenkins",
    role: "CEO, PeakFlow SaaS",
    rating: 5
  },
  {
    quote: "Highly recommended team. Their packages are transparent, prices are highly competitive, and the final deliverable was top-tier.",
    author: "David Chen",
    role: "Co-founder, AlphaVenture Group",
    rating: 5
  },
  {
    quote: "They built a custom admin dashboard that saves our logistics team 15 hours of manual work every single week. Excellent work!",
    author: "Elena Rostova",
    role: "VP of Operations, LogiShip",
    rating: 5
  }
]

const STATS = [
  { value: "100+", label: "Projects Delivered" },
  { value: "5.0/5", label: "Client Rating" },
  { value: "99.9%", label: "Uptime & Reliability" },
  { value: "12+", label: "Tech Stack Experts" }
]

function App() {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    packageId: '',
    timeline: 'Standard (1 Month)',
    description: ''
  })
  
  const [formErrors, setFormErrors] = useState({ name: false })
  const [touched, setTouched] = useState({ name: false })

  const packagesRef = useRef(null)
  const addOnsRef = useRef(null)
  const leadFormRef = useRef(null)

  // Smooth scroll helper
  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Pre-fill package selector and scroll
  const handleSelectPackage = (packageId) => {
    setFormData(prev => ({ ...prev, packageId }))
    scrollTo(leadFormRef)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (name === 'name') {
      setFormErrors(prev => ({ ...prev, name: value.trim() === '' }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    if (name === 'name') {
      setFormErrors(prev => ({ ...prev, name: formData.name.trim() === '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.packageId) {
      setFormErrors({ name: formData.name.trim() === '' })
      setTouched({ name: true })
      return
    }

    const selectedPkg = PACKAGES.find(p => p.id === formData.packageId)
    const packageTitle = selectedPkg ? selectedPkg.title : 'Custom Scope'
    const packagePrice = selectedPkg ? `₹${selectedPkg.price}` : 'TBD'

    // Formatted WhatsApp message in Indian Rupees
    const message = `👋 Hi AR TECH SOLUTIONS!

I would like to request a quote for my web project using your agency landing page.

👤 *Client Profile:*
• *Name:* ${formData.name.trim()}
• *Business:* ${formData.businessName.trim() || 'Not Specified'}
• *Timeline:* ${formData.timeline}

📂 *Package Selection:*
• *Chosen Package:* ${packageTitle} (${packagePrice})

📝 *Project Overview & Description:*
"${formData.description.trim() || 'No additional details provided.'}"

Let's coordinate a meeting to discuss the layout and start development!`

    const encodedString = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/919361034037?text=${encodedString}`
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  const isFormValid = formData.name.trim() !== '' && formData.packageId !== ''

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative overflow-x-hidden">
      
      {/* Decorative gradient glowing backdrops */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[50%] rounded-full bg-brand-blue/15 blur-[130px]" />
        <div className="absolute top-[30%] right-[-10%] w-[50%] h-[60%] rounded-full bg-brand-purple/10 blur-[130px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-indigo/10 blur-[130px]" />
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-indigo via-brand-purple to-brand-blue flex items-center justify-center text-white font-bold text-lg shadow-md shadow-brand-indigo/20">
              AR
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-blue bg-clip-text text-transparent">
                AR TECH SOLUTIONS
              </span>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase -mt-1">Web Development Agency</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-semibold text-slate-600">
            <a href="#packages" className="hover:text-brand-indigo transition-colors" onClick={(e) => { e.preventDefault(); scrollTo(packagesRef) }}>Packages</a>
            <a href="#addons" className="hover:text-brand-indigo transition-colors" onClick={(e) => { e.preventDefault(); scrollTo(addOnsRef) }}>Add-ons</a>
            <a href="#trust" className="hover:text-brand-indigo transition-colors" onClick={(e) => { e.preventDefault(); scrollTo({ current: document.getElementById('trust') }) }}>Why Choose Us</a>
            <a href="#contact" className="hover:text-brand-indigo transition-colors" onClick={(e) => { e.preventDefault(); scrollTo(leadFormRef) }}>Get a Quote</a>
          </nav>
          <div>
            <button
              onClick={() => scrollTo(packagesRef)}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-xl text-white bg-brand-indigo hover:bg-brand-indigo/90 shadow-sm shadow-brand-indigo/20 transition-all active:scale-95 cursor-pointer"
            >
              View Pricing
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-indigo/10 border border-brand-indigo/20 text-brand-indigo text-xs font-bold uppercase tracking-wider mb-6">
            <span className="flex h-2 w-2 rounded-full bg-brand-indigo animate-pulse"></span>
            Scale Your Brand Online
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight mb-8">
            Grow Your Business in the <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-blue bg-clip-text text-transparent">
              Digital World
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed font-light">
            Empower your brand with clean, high-performance web development. Explore our tailored agency packages starting at just ₹9,999 and scale your digital presence with zero hidden fees.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo(packagesRef)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-white bg-gradient-to-r from-brand-indigo to-brand-purple hover:shadow-lg hover:shadow-brand-indigo/30 transition-all duration-300 font-semibold cursor-pointer group active:scale-95"
            >
              Explore Packages
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo(leadFormRef)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all font-semibold cursor-pointer active:scale-95"
            >
              Request Custom Quote
            </button>
          </div>
        </motion.div>

        {/* Floating statistics panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 sm:mt-24 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/60 shadow-sm shadow-slate-100 glow-primary"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-brand-indigo to-brand-blue bg-clip-text text-transparent">{stat.value}</p>
              <p className="text-xs sm:text-sm text-slate-400 font-semibold uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Pricing Packages Section (Replaces the Interactive Calculator) */}
      <section ref={packagesRef} id="packages" className="py-20 bg-white border-y border-slate-200/60 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl text-slate-900 mb-4 font-extrabold">
              Our Web Development Packages
            </h2>
            <p className="text-slate-500 font-light">
              Select the foundation that matches your goals. Lowered competitive rates with clear scope inclusions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PACKAGES.map((pkg) => {
              const Icon = pkg.icon
              return (
                <motion.div
                  key={pkg.id}
                  whileHover={{ y: -6 }}
                  className="bg-slate-50/50 border border-slate-200 rounded-3xl p-8 flex flex-col justify-between relative shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
                >
                  <div>
                    {/* Header card area */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3.5 rounded-2xl bg-brand-indigo/10 text-brand-indigo shadow-xs">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-brand-indigo">
                        {pkg.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{pkg.title}</h3>
                    <p className="text-sm text-slate-500 mb-6 font-light leading-relaxed">{pkg.description}</p>
                    
                    {/* Price in Rupees */}
                    <div className="mb-6 flex items-baseline gap-1.5">
                      <span className="text-4xl font-black text-slate-950">₹{pkg.price}</span>
                      <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Fixed Price</span>
                    </div>

                    {/* Features checklist */}
                    <div className="space-y-3 pt-6 border-t border-slate-200/60">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">What's Included:</p>
                      {pkg.features.map((feat, index) => (
                        <div key={index} className="flex items-start gap-2.5 text-slate-600 text-sm">
                          <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span className="font-light">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-6">
                    <button
                      onClick={() => handleSelectPackage(pkg.id)}
                      className="w-full inline-flex items-center justify-center px-4 py-3.5 rounded-xl text-white bg-brand-indigo hover:bg-brand-indigo/90 shadow-sm shadow-brand-indigo/15 font-semibold text-sm transition-all active:scale-[0.98] cursor-pointer"
                    >
                      Choose {pkg.title.split(' ')[0]}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>
      </section>

      {/* Add-on Services Grid Section */}
      <section ref={addOnsRef} id="addons" className="py-20 bg-slate-50/40 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl text-slate-900 mb-4 font-extrabold">
              Optional Add-on Features
            </h2>
            <p className="text-slate-500 font-light">
              Add premium logic blocks to your core package. Highly customized features to supercharge your web platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADD_ONS.map((addon, i) => {
              const Icon = addon.icon
              return (
                <div
                  key={i}
                  className="bg-white border border-slate-200/80 rounded-2xl p-6 flex gap-4 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all duration-300"
                >
                  <div className="shrink-0 mt-0.5">
                    <div className="p-3 rounded-xl bg-brand-indigo/10 text-brand-indigo">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline gap-2">
                      <h4 className="font-bold text-sm text-slate-900">{addon.title}</h4>
                      <span className="font-extrabold text-sm text-brand-indigo shrink-0">₹{addon.price}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">{addon.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* Trust Section */}
      <section id="trust" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-indigo uppercase tracking-wider px-3 py-1.5 rounded-full bg-brand-indigo/10 border border-brand-indigo/20">
            Proven Results
          </span>
          <h2 className="text-3xl sm:text-4xl text-slate-900 mt-6 mb-4 font-extrabold">
            Trusted by Innovators Worldwide
          </h2>
          <p className="text-slate-500 font-light">
            We deliver highly polished code, responsive layouts, and lightning-fast loading speeds. Check out what clients say about us.
          </p>
        </div>

        {/* Client Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl bg-white border border-slate-200/60 shadow-xs flex flex-col justify-between shadow-slate-100 relative"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-6">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="h-5 w-5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm italic leading-relaxed font-light mb-6">
                  "{t.quote}"
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm text-slate-800">{t.author}</p>
                  <p className="text-xs text-slate-400 font-medium">{t.role}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <User className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlight components */}
        <div className="mt-16 pt-12 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center p-4">
            <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-800">SEO Infrastructure</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xs font-light">Every project starts with search engine accessibility baked in from Day 1.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="h-12 w-12 rounded-full bg-brand-indigo/10 text-brand-indigo flex items-center justify-center mb-4">
              <Award className="h-6 w-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-800">Premium React Craftsmanship</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xs font-light">Clean code components, fully documented modules, and responsive layouts.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="h-12 w-12 rounded-full bg-indigo-50 text-brand-purple flex items-center justify-center mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-800">Support Hand-off Included</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xs font-light">30 days of complimentary post-launch hosting support and analytics training.</p>
          </div>
        </div>
      </section>

      {/* Lead Generation Form (Get a Quote) */}
      <section ref={leadFormRef} id="contact" className="py-20 bg-slate-900 text-white relative overflow-hidden scroll-mt-20">
        
        {/* Ambient glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-purple/20 rounded-full blur-[100px] pointer-events-none -z-0" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-indigo/20 rounded-full blur-[100px] pointer-events-none -z-0" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl text-white font-extrabold mb-4 font-display">
              Ready to Launch Your Project?
            </h2>
            <p className="text-slate-400 font-light">
              Send us your package configurations. We will package your choices and open a WhatsApp chat directly with our team.
            </p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/60 p-8 sm:p-10 shadow-xl">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Form Input fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="e.g. John Doe"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-transparent transition-all ${
                      touched.name && formErrors.name ? 'border-red-400' : 'border-slate-700 hover:border-slate-600'
                    }`}
                  />
                  {touched.name && formErrors.name && (
                    <p className="text-xs text-red-400 mt-1">Please enter your name.</p>
                  )}
                </div>

                {/* Business Name field */}
                <div className="space-y-2">
                  <label htmlFor="businessName" className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="e.g. Acme Corp"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-transparent transition-all"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Package Dropdown selection */}
                <div className="space-y-2">
                  <label htmlFor="packageId" className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Selected Web Package <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="packageId"
                    name="packageId"
                    value={formData.packageId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="">-- Choose a package --</option>
                    {PACKAGES.map(p => (
                      <option key={p.id} value={p.id}>{p.title} (₹{p.price})</option>
                    ))}
                    <option value="custom">Custom Scope Consultation</option>
                  </select>
                </div>

                {/* Timeline Dropdown field */}
                <div className="space-y-2">
                  <label htmlFor="timeline" className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Desired Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="Urgent (< 2 weeks)">Urgent (Less than 2 weeks)</option>
                    <option value="Standard (1 Month)">Standard (1 Month)</option>
                    <option value="Flexible (2+ Months)">Flexible (2+ Months)</option>
                  </select>
                </div>

              </div>

              {/* Description field */}
              <div className="space-y-2">
                <label htmlFor="description" className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Tell Us About Your Project & Custom Needs
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your design layout, desired add-ons, or custom features you want to integrate..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Submit panel */}
              <div className="pt-4 border-t border-slate-700/60 space-y-4">
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left text-xs">
                    {!formData.packageId && (
                      <p className="text-amber-300">⚠️ Please pick a Web Package or Custom Scope to continue.</p>
                    )}
                    {formData.packageId && !formData.name.trim() && (
                      <p className="text-slate-400">📝 Enter your name to enable the WhatsApp action.</p>
                    )}
                    {formData.packageId && formData.name.trim() && (
                      <p className="text-emerald-400">✓ Ready to send details via WhatsApp!</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-sm shadow-md transition-all active:scale-[0.97] cursor-pointer ${
                      isFormValid
                        ? 'bg-brand-indigo text-white hover:bg-brand-indigo/90 shadow-brand-indigo/25'
                        : 'bg-slate-700 text-slate-400 border border-slate-600 cursor-not-allowed'
                    }`}
                  >
                    Send Project Details
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </button>
                </div>

              </div>

            </form>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-12 border-t border-slate-800/40 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-brand-indigo flex items-center justify-center text-white font-bold text-sm">
              AR
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white">
              AR TECH SOLUTIONS
            </span>
          </div>
          <p className="text-xs max-w-md mx-auto leading-relaxed">
            High-converting web design, custom API integrations, and robust full-stack engineering. Start your project today.
          </p>
          <div className="pt-6 border-t border-slate-800/40 text-xs">
            &copy; {new Date().getFullYear()} AR TECH SOLUTIONS. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App
