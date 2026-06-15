"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Sliders,
  CreditCard,
  LifeBuoy,
  BarChart3,
  Percent,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

export default function PartnerPage() {
  const benefits = [
    {
      title: "Reach More Travelers",
      description: "Get your property or service in front of a growing community of travelers actively searching for stays, tours, and experiences on Trivllo.",
      icon: TrendingUp,
    },
    {
      title: "Simple Listing Management",
      description: "Our easy-to-use partner dashboard lets you manage availability, pricing, photos, and bookings — all in one place.",
      icon: Sliders,
    },
    {
      title: "Instant Booking & Payments",
      description: "Receive confirmed bookings in real time with fast, reliable payouts directly to your bank account.",
      icon: CreditCard,
    },
    {
      title: "Dedicated Partner Support",
      description: "Our partner success team is available to help you set up your listing, resolve issues, and maximize your visibility on the platform.",
      icon: LifeBuoy,
    },
    {
      title: "Data-Driven Insights",
      description: "Access detailed performance reports to understand your audience, track bookings, and make smarter business decisions.",
      icon: BarChart3,
    },
    {
      title: "Zero Setup Fee",
      description: "Getting started on Trivllo is completely free. We only earn when you earn — through a small commission per confirmed booking.",
      icon: Percent,
    },
  ];

  const categories = [
    "Hotels, Resorts & Boutique Stays",
    "Hostels & Guesthouses",
    "Homestays & Villas",
    "Tour Operators & Travel Agencies",
    "Activity & Experience Providers",
    "Transportation & Transfer Services",
    "Local Guides & Cultural Experiences",
  ];

  const steps = [
    {
      step: "Step 1",
      title: "Register",
      description: "Fill out our partner registration form with your business details. It takes less than 10 minutes.",
    },
    {
      step: "Step 2",
      title: "Set Up Your Listing",
      description: "Add your property or service details, photos, pricing, and availability. Our team will review and approve within 48 hours.",
    },
    {
      step: "Step 3",
      title: "Start Receiving Bookings",
      description: "Once live, travelers can discover and book you directly through Trivllo. You manage everything from your partner dashboard.",
    },
    {
      step: "Step 4",
      title: "Get Paid",
      description: "Payouts are processed automatically after each confirmed stay or activity, directly into your registered bank account.",
    },
  ];

  const testimonials = [
    {
      quote: "Since listing on Trivllo, our occupancy rate has increased significantly. The dashboard is simple and the support team is always responsive.",
      author: "Hotel Partner, Manali",
    },
    {
      quote: "Trivllo brought us guests we would never have reached through our own website. The onboarding was smooth and the team was helpful throughout.",
      author: "Tour Operator, Rajasthan",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950/40 text-foreground transition-colors duration-300 pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-950 dark:to-teal-950 text-white py-24 px-6 sm:px-12 text-center">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-400/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider text-emerald-200">
            <TrendingUp className="w-3.5 h-3.5" />
            Grow With Us
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Grow Your Business with Trivllo&apos;s Traveler Network
          </h1>
          <p className="text-lg sm:text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            Join thousands of hotels, tour operators, and experience providers who trust Trivllo to connect them with travelers across India and beyond.
          </p>
          <div className="pt-4">
            <a
              href="https://partner.trivllo.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-emerald-700 font-bold rounded-full shadow-xl transition-all hover:scale-[1.03]"
            >
              Register Now
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mt-16 space-y-20">
        
        {/* Why Partner Grid */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Why Partner with Trivllo?</h2>
            <p className="text-muted-foreground">Maximize your booking potential with our advanced technology and distribution reach.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4"
                >
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-xl w-fit">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-150">{benefit.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Who Can Partner & How It Works */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Who Can Partner */}
          <div className="space-y-6 bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 rounded-3xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold">Who Can Partner with Us?</h3>
            <p className="text-muted-foreground text-sm">We welcome a wide range of tourism and hospitality services:</p>
            <ul className="space-y-3">
              {categories.map((cat, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm sm:text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-450 shrink-0" />
                  <span className="text-slate-700 dark:text-zinc-300">{cat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How It Works */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">How It Works</h3>
            <div className="space-y-6">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="w-[2px] bg-slate-200 dark:bg-zinc-800 flex-1 my-1" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 dark:text-zinc-100">
                      {step.step} — {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight">What Our Partners Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm space-y-4 relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 text-slate-200 dark:text-zinc-800 text-6xl font-serif pointer-events-none select-none">
                  &ldquo;
                </div>
                <p className="text-sm sm:text-base italic text-slate-655 dark:text-zinc-300 relative z-10 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-450">
                  {t.author}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Support Footer */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-200/50 dark:border-emerald-900/30 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold">Ready to Get Started?</h3>
            <p className="text-muted-foreground max-w-md">Register as a Trivllo partner today and start reaching travelers who are ready to book.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto text-center">
            <div className="text-left space-y-1">
              <div className="text-xs font-bold uppercase text-muted-foreground">Partnerships Team</div>
              <div className="text-sm font-bold">Email: <a href="mailto:partners@trivllo.com" className="text-emerald-600 hover:underline">partners@trivllo.com</a></div>
            </div>
            <a
              href="https://partner.trivllo.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-750 text-white font-semibold rounded-full shadow-lg transition-all text-sm shrink-0"
            >
              Register Now
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
