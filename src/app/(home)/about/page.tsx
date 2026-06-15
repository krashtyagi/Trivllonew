"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Compass,
  History,
  Target,
  Eye,
  CheckCircle2,
  Heart,
  Mail,
  Globe,
  Share2,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      title: "Trust",
      description: "We build honest, transparent relationships with both travelers and partners.",
      icon: CheckCircle2,
    },
    {
      title: "Simplicity",
      description: "We remove the complexity and friction from travel planning.",
      icon: Compass,
    },
    {
      title: "Discovery",
      description: "We help people find unique experiences they didn't know they were looking for.",
      icon: Sparkles,
    },
    {
      title: "Responsibility",
      description: "We are committed to promoting sustainable, respectful, and mindful travel.",
      icon: Heart,
    },
  ];

  const offers = [
    {
      title: "Hotels & Stays",
      description: "From budget-friendly guesthouses to premium resorts, find the right stay for every trip and every traveler.",
    },
    {
      title: "Tours & Activities",
      description: "Explore curated tours, guided experiences, and local activities handpicked to help you connect with each destination.",
    },
    {
      title: "Travel Packages",
      description: "All-in-one packages that combine stays and experiences, designed to take the planning off your plate.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950/40 text-foreground transition-colors duration-300 pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-950 dark:to-pink-950 text-white py-24 px-6 sm:px-12 text-center">
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-pink-400/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider text-pink-200">
            <Compass className="w-3.5 h-3.5" />
            Our Journey
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            About Trivllo
          </h1>
          <p className="text-lg sm:text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
            A modern travel platform built for the way people explore today — fast, flexible, and full of possibilities.
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mt-16 space-y-20">
        
        {/* Who We Are & Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Who We Are
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-zinc-100">
              Simplifying the way you discover and book travel.
            </h2>
            <p className="text-slate-655 dark:text-zinc-300 leading-relaxed">
              Trivllo brings together hotels, tours, and experiences into one seamless platform, making it easier for travelers to plan, book, and enjoy everything their destination has to offer — without jumping between apps or losing hours to research.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 rounded-3xl p-8 shadow-sm space-y-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full" />
            <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400">
              <History className="w-6 h-6" />
              <h3 className="text-xl font-bold">Our Story</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-350 leading-relaxed">
              Trivllo was born from a simple frustration: travel planning was too scattered, too complicated, and too time-consuming. We believed there was a better way. A single place where you could find a great hotel, book a guided tour, and discover local activities — all in one go, with the confidence that everything is verified and the process is smooth.
            </p>
            <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              Today, Trivllo serves travelers across India, helping them discover stays and experiences that match their style, budget, and curiosity.
            </p>
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:border-purple-300 dark:hover:border-purple-900/50 transition-colors">
            <div className="space-y-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-2xl w-fit">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">Our Mission</h3>
              <p className="text-slate-600 dark:text-zinc-300 leading-relaxed">
                To make travel accessible, enjoyable, and effortless for every kind of traveler — whether you&apos;re planning a weekend getaway, a family holiday, or a solo adventure.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:border-pink-300 dark:hover:border-pink-900/50 transition-colors">
            <div className="space-y-4">
              <div className="p-3 bg-pink-100 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 rounded-2xl w-fit">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">Our Vision</h3>
              <p className="text-slate-600 dark:text-zinc-300 leading-relaxed">
                A world where discovering and booking the perfect travel experience is as easy as a few taps — and where every trip becomes a story worth telling.
              </p>
            </div>
          </div>
        </div>

        {/* What We Offer */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">What We Offer</h2>
            <p className="text-muted-foreground">We provide a unified ecosystem for all travel needs across India.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="text-lg font-bold text-slate-800 dark:text-zinc-150 mb-2">{offer.title}</h4>
                <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">{offer.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Our Core Values</h2>
            <p className="text-muted-foreground">The beliefs and principles that guide everything we build at Trivllo.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm text-center space-y-3 hover:scale-[1.02] transition-transform"
                >
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 rounded-full w-fit mx-auto">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold">{val.title}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Info Footer */}
        <div className="bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-200/50 dark:border-violet-900/30 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold">Have questions or want to collaborate?</h3>
            <p className="text-muted-foreground max-w-md">We&apos;d love to hear from you — whether you&apos;re a traveler with questions or a business looking to partner.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <a
              href="mailto:hello@trivllo.com"
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-full shadow-lg shadow-violet-500/20 transition-all text-sm"
            >
              <Mail className="w-4 h-4" />
              Email Support
            </a>
            <a
              href="/contact"
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-850 hover:bg-slate-50 dark:hover:bg-zinc-800/60 font-semibold rounded-full transition-all text-sm"
            >
              Contact Page
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
