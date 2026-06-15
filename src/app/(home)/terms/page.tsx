"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Info,
  UserCheck,
  CreditCard,
  RotateCcw,
  FileText,
  Award,
  AlertTriangle,
  Scale,
  CalendarDays,
  Mail,
  Search,
  Printer,
  ChevronRight,
  Shield,
  ArrowRight,
} from "lucide-react";

const termsData = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    icon: CheckCircle2,
    content: "By accessing or using Trivllo's website, mobile application, or any services offered through our platform, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.",
  },
  {
    id: "about",
    title: "2. About Trivllo",
    icon: Info,
    content: "Trivllo is an online travel platform that enables users to discover, compare, and book hotels, tours, activities, and travel packages. We act as an intermediary between travelers and service providers (hotels, tour operators, activity vendors).",
  },
  {
    id: "accounts",
    title: "3. User Accounts",
    icon: UserCheck,
    points: [
      "You must be at least 18 years of age to create an account and make bookings on Trivllo.",
      "You are responsible for maintaining the confidentiality of your account credentials.",
      "You agree to provide accurate, current, and complete information during registration.",
      "Trivllo reserves the right to suspend or terminate accounts found to be in violation of these terms.",
    ],
  },
  {
    id: "bookings",
    title: "4. Bookings and Payments",
    icon: CreditCard,
    points: [
      "All bookings made through Trivllo are subject to availability and confirmation by the respective service provider.",
      "Prices displayed on the platform are inclusive of applicable taxes unless stated otherwise.",
      "Payments must be made in full at the time of booking unless a partial payment option is explicitly offered.",
      "Trivllo uses secure, third-party payment gateways. We do not store your card details on our servers.",
    ],
  },
  {
    id: "cancellations",
    title: "5. Cancellations and Refunds",
    icon: RotateCcw,
    points: [
      "Cancellation policies vary by service provider and are clearly displayed on each listing before booking.",
      "Refunds, where applicable, will be processed within 7–14 business days to the original payment method.",
      "Trivllo's platform fee (if any) may be non-refundable depending on the circumstances of cancellation.",
      "In case of cancellations due to natural disasters, government restrictions, or force majeure events, Trivllo will work with service providers to offer maximum relief to affected travelers.",
    ],
  },
  {
    id: "responsibilities",
    title: "6. User Responsibilities",
    icon: FileText,
    points: [
      "Users must ensure that all travelers listed in a booking meet the eligibility criteria set by the service provider.",
      "Users are responsible for carrying valid ID, travel documents, and any other requirements specified at booking.",
      "Trivllo is not liable for losses arising from inaccurate information provided by the user.",
    ],
  },
  {
    id: "intellectual-property",
    title: "7. Intellectual Property",
    icon: Award,
    content: "All content on the Trivllo platform — including logos, text, images, and software — is the property of Trivllo or its licensors and is protected under applicable intellectual property laws. Unauthorized reproduction or distribution is strictly prohibited.",
  },
  {
    id: "limitation-liability",
    title: "8. Limitation of Liability",
    icon: AlertTriangle,
    content: "Trivllo acts as a facilitator and is not directly responsible for the quality, safety, or delivery of services provided by third-party vendors. Our liability is limited to the amount paid for the specific booking in question.",
  },
  {
    id: "governing-law",
    title: "9. Governing Law",
    icon: Scale,
    content: "These Terms and Conditions are governed by the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts located in India.",
  },
  {
    id: "changes",
    title: "10. Changes to Terms",
    icon: CalendarDays,
    content: "Trivllo reserves the right to modify these Terms at any time. Continued use of the platform after changes constitutes acceptance of the revised Terms.",
  },
  {
    id: "contact",
    title: "11. Contact Us",
    icon: Mail,
    content: "For questions regarding these Terms and Conditions, please reach out to us at:",
    details: {
      email: "legal@trivllo.com",
      address: "Trivllo Technologies Pvt. Ltd., India",
    },
  },
];

export default function TermsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("acceptance");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      for (const section of termsData) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 120,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredTerms = termsData.filter(
    (term) =>
      term.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (term.content && term.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (term.points &&
        term.points.some((point) => point.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950/40 text-foreground transition-colors duration-300 pb-20">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-950 dark:via-purple-950 dark:to-indigo-950 text-white py-20 px-6 sm:px-12 text-center">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Light Glow Effect */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-400/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider text-purple-200">
            <Shield className="w-3.5 h-3.5" />
            Legal Agreement
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Terms and Conditions
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto">
            Please read these terms carefully before using Trivllo. By accessing our platform, you agree to these conditions.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-purple-200">
            <span>Last Updated: June 14, 2026</span>
            <span className="hidden sm:inline">•</span>
            <span>Trivllo Technologies Pvt. Ltd.</span>
          </div>

          {/* Search Controls */}
          <div className="max-w-md mx-auto relative mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
            <input
              type="text"
              placeholder="Search legal terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 focus:border-white/40 rounded-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/20 backdrop-blur-md transition-all shadow-lg text-sm sm:text-base"
            />
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Navigation (Desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-4 shadow-sm space-y-2 max-h-[calc(100vh-160px)] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Table of Contents
                </span>
                <button
                  onClick={handlePrint}
                  title="Print Document"
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-850 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>

              {termsData.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-400 border-l-4 border-violet-600 dark:border-violet-500 shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-slate-100/60 dark:hover:bg-zinc-800/60"
                    }`}
                  >
                    <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? "text-violet-600 dark:text-violet-400" : "text-muted-foreground"}`} />
                    <span className="truncate">{section.title.split(". ")[1]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Content */}
          <div className="col-span-1 lg:col-span-3 space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredTerms.length > 0 ? (
                filteredTerms.map((section, idx) => {
                  const Icon = section.icon;
                  return (
                    <motion.div
                      id={section.id}
                      key={section.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className={`group relative bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 hover:border-violet-300 dark:hover:border-violet-900/50 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 ${
                        activeSection === section.id
                          ? "ring-1 ring-violet-500/20 dark:ring-violet-400/10 shadow-violet-100/10 dark:shadow-none"
                          : ""
                      }`}
                    >
                      {/* Section Icon Anchor */}
                      <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 bg-gradient-to-br from-violet-500 to-indigo-600 dark:from-violet-600 dark:to-indigo-700 text-white p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>

                      <div className="pl-2 sm:pl-4 space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-zinc-100 mt-2 sm:mt-0">
                          {section.title}
                        </h2>

                        {section.content && (
                          <p className="text-slate-600 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
                            {section.content}
                          </p>
                        )}

                        {section.points && (
                          <ul className="space-y-3 mt-4">
                            {section.points.map((point, pIdx) => (
                              <li
                                key={pIdx}
                                className="flex items-start gap-3 text-slate-600 dark:text-zinc-300 text-sm sm:text-base"
                              >
                                <ChevronRight className="w-4 h-4 text-violet-500 shrink-0 mt-1" />
                                <span className="leading-relaxed">{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {section.details && (
                          <div className="mt-6 bg-slate-50 dark:bg-zinc-950/50 rounded-2xl p-4 sm:p-5 border border-slate-100 dark:border-zinc-800/40 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 bg-violet-100/60 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400 rounded-xl">
                                <Mail className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground font-medium">Email Support</p>
                                <a
                                  href={`mailto:${section.details.email}`}
                                  className="text-sm font-semibold hover:underline text-slate-800 dark:text-zinc-200"
                                >
                                  {section.details.email}
                                </a>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 bg-violet-100/60 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400 rounded-xl">
                                <Shield className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground font-medium">Registered Address</p>
                                <p className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                                  {section.details.address}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 rounded-3xl p-12 text-center"
                >
                  <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-200">No matches found</h3>
                  <p className="text-muted-foreground mt-2 max-w-sm mx-auto text-sm">
                    We couldn&apos;t find any sections matching &quot;{searchQuery}&quot;. Try adjusting your search query.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Print Help Option on Mobile */}
            <div className="flex sm:hidden justify-center pt-4">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 hover:bg-slate-50 rounded-full text-sm font-semibold text-slate-700 dark:text-zinc-350 shadow-sm transition-all"
              >
                <Printer className="w-4 h-4" />
                Print Terms and Conditions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
