"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  MessageSquare,
  Building,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "general", message: "" });
    }, 1500);
  };

  const departments = [
    {
      title: "General Inquiries",
      description: "Ask questions, share suggestions, or just say hello.",
      email: "hello@trivllo.com",
      icon: MessageSquare,
    },
    {
      title: "Partnerships",
      description: "List your stays, tours, or experiences on Trivllo.",
      email: "partners@trivllo.com",
      icon: HelpCircle,
    },
    {
      title: "Legal & Privacy Desk",
      description: "Any legal inquiries or data protection questions.",
      email: "legal@trivllo.com",
      icon: Building,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950/40 text-foreground transition-colors duration-300 pb-20">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-950 dark:to-indigo-950 text-white py-20 px-6 sm:px-12 text-center">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-400/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider text-blue-200">
            <Mail className="w-3.5 h-3.5" />
            Get in Touch
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Contact Support
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Have questions about a booking, partnership, or legal terms? We are here to help you.
          </p>
        </div>
      </div>

      {/* Main Body Grid */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Contact Information & Cards */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Our Offices & Channels</h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Reach out to our specific teams directly for a faster response. We usually reply within 24 hours.
          </p>

          <div className="space-y-4 pt-4">
            {departments.map((dept, idx) => {
              const Icon = dept.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm space-y-2 hover:border-blue-400/50 dark:hover:border-blue-900/50 transition-colors"
                >
                  <div className="flex items-center gap-3 text-blue-600 dark:text-blue-450">
                    <Icon className="w-5 h-5 shrink-0" />
                    <h3 className="font-bold text-slate-800 dark:text-zinc-100">{dept.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{dept.description}</p>
                  <a
                    href={`mailto:${dept.email}`}
                    className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline block pt-1"
                  >
                    {dept.email}
                  </a>
                </div>
              );
            })}
          </div>

          {/* Registered Address */}
          <div className="bg-slate-100/60 dark:bg-zinc-900/40 border border-slate-200/40 dark:border-zinc-800/40 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-3 text-slate-700 dark:text-zinc-350">
              <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
              <span className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Registered Address</span>
            </div>
            <p className="text-sm text-slate-655 dark:text-zinc-300 leading-relaxed pl-8">
              Trivllo Technologies Pvt. Ltd., India
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Send us a Message</h2>
              <p className="text-muted-foreground text-sm">Please fill out the form below and our team will get back to you shortly.</p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-2xl p-6 text-center space-y-3"
              >
                <CheckCircle className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-300">Message Sent Successfully!</h3>
                <p className="text-sm text-emerald-700 dark:text-emerald-450 max-w-sm mx-auto">
                  Thank you for reaching out. We have received your message and will review it shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-750 text-white rounded-full text-xs font-semibold transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold uppercase text-muted-foreground">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950/50 border border-slate-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase text-muted-foreground">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950/50 border border-slate-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-bold uppercase text-muted-foreground">Inquiry Department</label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950/50 border border-slate-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                  >
                    <option value="general">General Support / Hello</option>
                    <option value="booking">Bookings & Cancellations</option>
                    <option value="partnership">Partnering / Listings</option>
                    <option value="legal">Privacy & Legal Concerns</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold uppercase text-muted-foreground">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Type your message details here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950/50 border border-slate-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg shadow-blue-500/20 transition-all text-sm disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
