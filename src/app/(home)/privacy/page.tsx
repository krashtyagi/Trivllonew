"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Info,
  ClipboardList,
  Settings2,
  Share2,
  Cookie,
  Clock,
  Lock,
  Fingerprint,
  Baby,
  Link2,
  RefreshCcw,
  Mail,
  Search,
  Printer,
  ChevronRight,
  Shield,
} from "lucide-react";

const privacyData = [
  {
    id: "introduction",
    title: "Introduction",
    icon: Info,
    content: "At Trivllo, your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our platform.",
  },
  {
    id: "collection",
    title: "1. Information We Collect",
    icon: ClipboardList,
    subsections: [
      {
        title: "a. Information You Provide",
        points: [
          "Name, email address, phone number, and date of birth when you register or make a booking.",
          "Payment details (processed securely via third-party payment gateways).",
          "Travel preferences, special requests, and feedback you share with us.",
        ]
      },
      {
        title: "b. Information Collected Automatically",
        points: [
          "Device information (browser type, operating system, device ID).",
          "Usage data (pages visited, search queries, time spent on the platform).",
          "Location data (with your permission) to show relevant travel options near you.",
          "Cookies and similar tracking technologies.",
        ]
      },
      {
        title: "c. Information from Third Parties",
        points: [
          "If you sign in using Google, Facebook, or another third-party account, we may receive basic profile information from those platforms.",
        ]
      }
    ]
  },
  {
    id: "usage",
    title: "2. How We Use Your Information",
    icon: Settings2,
    points: [
      "To process bookings and send confirmation, itinerary, and support communications.",
      "To personalize your experience and recommend relevant hotels, tours, and activities.",
      "To send promotional offers, travel deals, and newsletters (you may opt out at any time).",
      "To improve our platform, detect fraud, and ensure security.",
      "To comply with legal and regulatory obligations.",
    ]
  },
  {
    id: "sharing",
    title: "3. Sharing Your Information",
    icon: Share2,
    content: "Trivllo does not sell your personal data. We may share your information with:",
    points: [
      "Service Providers: Hotels, tour operators, and activity vendors to fulfill your bookings.",
      "Payment Partners: Secure payment processors for transaction handling.",
      "Technology Partners: Analytics and cloud service providers who assist in platform operations (bound by confidentiality agreements).",
      "Legal Authorities: When required by law or to protect the rights and safety of our users.",
    ]
  },
  {
    id: "cookies",
    title: "4. Cookies",
    icon: Cookie,
    content: "We use cookies to improve your browsing experience, remember your preferences, and analyze platform traffic. You can manage your cookie preferences through your browser settings. Disabling cookies may affect some features of the platform.",
  },
  {
    id: "retention",
    title: "5. Data Retention",
    icon: Clock,
    content: "We retain your personal data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time by contacting us.",
  },
  {
    id: "security",
    title: "6. Data Security",
    icon: Lock,
    content: "We implement industry-standard security measures including SSL encryption, secure servers, and access controls to protect your personal information. However, no system is completely secure, and we encourage users to keep their account credentials confidential.",
  },
  {
    id: "rights",
    title: "7. Your Rights",
    icon: Fingerprint,
    content: "As a user, you have the right to:",
    points: [
      "Access the personal data we hold about you.",
      "Request correction of inaccurate information.",
      "Request deletion of your data (subject to legal obligations).",
      "Opt out of marketing communications at any time.",
      "Withdraw consent for data processing where applicable.",
    ],
    contactInfo: "To exercise any of these rights, contact us at privacy@trivllo.com."
  },
  {
    id: "children",
    title: "8. Children's Privacy",
    icon: Baby,
    content: "Trivllo does not knowingly collect personal information from individuals under the age of 18. If we become aware of such collection, the information will be promptly deleted.",
  },
  {
    id: "links",
    title: "9. Third-Party Links",
    icon: Link2,
    content: "Our platform may contain links to third-party websites. Trivllo is not responsible for the privacy practices of those sites and encourages users to review their policies independently.",
  },
  {
    id: "changes",
    title: "10. Changes to This Policy",
    icon: RefreshCcw,
    content: "We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a prominent notice on our platform.",
  },
  {
    id: "contact",
    title: "11. Contact Us",
    icon: Mail,
    content: "For privacy-related queries or concerns:",
    details: {
      email: "privacy@trivllo.com",
      address: "Trivllo Technologies Pvt. Ltd., India",
    }
  }
];

export default function PrivacyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("introduction");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      for (const section of privacyData) {
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

  const filteredPrivacy = privacyData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.points &&
        item.points.some((point) => point.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (item.subsections &&
        item.subsections.some(
          (sub) =>
            sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sub.points.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()))
        ))
  );

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950/40 text-foreground transition-colors duration-300 pb-20">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950 text-white py-20 px-6 sm:px-12 text-center">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Light Glow Effect */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-400/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider text-teal-200">
            <Shield className="w-3.5 h-3.5" />
            Privacy & Trust
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            At Trivllo, we value your trust. Learn how we collect, protect, and handle your personal data when using our platform.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-teal-200">
            <span>Last Updated: June 14, 2026</span>
            <span className="hidden sm:inline">•</span>
            <span>Trivllo Technologies Pvt. Ltd.</span>
          </div>

          {/* Search Controls */}
          <div className="max-w-md mx-auto relative mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
            <input
              type="text"
              placeholder="Search privacy details..."
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

              {privacyData.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-teal-50 text-teal-600 dark:bg-teal-950/30 dark:text-teal-400 border-l-4 border-teal-600 dark:border-teal-500 shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-slate-100/60 dark:hover:bg-zinc-800/60"
                    }`}
                  >
                    <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? "text-teal-600 dark:text-teal-400" : "text-muted-foreground"}`} />
                    <span className="truncate">
                      {section.title.includes(". ") ? section.title.split(". ")[1] : section.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Content */}
          <div className="col-span-1 lg:col-span-3 space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredPrivacy.length > 0 ? (
                filteredPrivacy.map((section, idx) => {
                  const Icon = section.icon;
                  return (
                    <motion.div
                      id={section.id}
                      key={section.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className={`group relative bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 hover:border-teal-300 dark:hover:border-teal-900/50 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 ${
                        activeSection === section.id
                          ? "ring-1 ring-teal-500/20 dark:ring-teal-400/10 shadow-teal-100/10 dark:shadow-none"
                          : ""
                      }`}
                    >
                      {/* Section Icon Anchor */}
                      <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 bg-gradient-to-br from-teal-500 to-cyan-600 dark:from-teal-600 dark:to-cyan-700 text-white p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
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

                        {/* Subsection details (For Information We Collect) */}
                        {section.subsections && (
                          <div className="space-y-6 mt-4">
                            {section.subsections.map((sub, sIdx) => (
                              <div key={sIdx} className="space-y-2">
                                <h3 className="text-base sm:text-lg font-bold text-slate-700 dark:text-zinc-200">
                                  {sub.title}
                                </h3>
                                <ul className="space-y-2">
                                  {sub.points.map((point, pIdx) => (
                                    <li
                                      key={pIdx}
                                      className="flex items-start gap-3 text-slate-600 dark:text-zinc-300 text-sm sm:text-base"
                                    >
                                      <ChevronRight className="w-4 h-4 text-teal-500 shrink-0 mt-1" />
                                      <span className="leading-relaxed">{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}

                        {section.points && (
                          <ul className="space-y-3 mt-4">
                            {section.points.map((point, pIdx) => (
                              <li
                                key={pIdx}
                                className="flex items-start gap-3 text-slate-600 dark:text-zinc-300 text-sm sm:text-base"
                              >
                                <ChevronRight className="w-4 h-4 text-teal-500 shrink-0 mt-1" />
                                <span className="leading-relaxed">{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {section.contactInfo && (
                          <p className="text-slate-600 dark:text-zinc-300 font-semibold text-sm sm:text-base mt-4">
                            {section.contactInfo}
                          </p>
                        )}

                        {section.details && (
                          <div className="mt-6 bg-slate-50 dark:bg-zinc-950/50 rounded-2xl p-4 sm:p-5 border border-slate-100 dark:border-zinc-800/40 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 bg-teal-100/60 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400 rounded-xl">
                                <Mail className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground font-medium">Email Privacy Desk</p>
                                <a
                                  href={`mailto:${section.details.email}`}
                                  className="text-sm font-semibold hover:underline text-slate-800 dark:text-zinc-200"
                                >
                                  {section.details.email}
                                </a>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 bg-teal-100/60 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400 rounded-xl">
                                <Shield className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground font-medium">Address</p>
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
                  <ClipboardList className="w-12 h-12 text-amber-500 mx-auto mb-4" />
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
                Print Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
