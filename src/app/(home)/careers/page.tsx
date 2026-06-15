"use client";

import React from "react";
import { Briefcase, MapPin, Clock, Sparkles } from "lucide-react";

export default function CareersPage() {
  const jobs = [
    {
      title: "Senior Full Stack Engineer",
      department: "Engineering",
      location: "Remote (India)",
      type: "Full-time",
    },
    {
      title: "Product Designer (UI/UX)",
      department: "Design",
      location: "Hybrid (Delhi NCR)",
      type: "Full-time",
    },
    {
      title: "Growth Marketing Manager",
      department: "Marketing",
      location: "Remote (India)",
      type: "Full-time",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950/40 text-foreground transition-colors duration-300 pb-20">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-indigo-600 dark:from-teal-950 dark:to-indigo-950 text-white py-20 px-6 sm:px-12 text-center">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-400/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider text-teal-200">
            <Briefcase className="w-3.5 h-3.5" />
            Join Our Team
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Careers at Trivllo
          </h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            Build the future of travel with us. We are always looking for passionate people to join our mission.
          </p>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 mt-12 space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Open Positions
          </div>
          <h2 className="text-2xl font-bold">Explore Opportunities</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Work in a remote-first, high-growth environment dedicated to bringing the best travel booking experiences to India.
          </p>
        </div>

        <div className="space-y-4">
          {jobs.map((job, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-teal-500/50 dark:hover:border-teal-900/50 transition-colors"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/20 px-2.5 py-1 rounded-full border border-teal-100 dark:border-teal-900/30">
                  {job.department}
                </span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-150">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {job.type}
                  </span>
                </div>
              </div>
              <a
                href="mailto:careers@trivllo.com"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-slate-900 dark:bg-zinc-800 text-white dark:text-zinc-200 hover:bg-slate-800 dark:hover:bg-zinc-700 font-semibold rounded-xl text-xs transition-colors shrink-0"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>

        {/* Spontaneous Applications */}
        <div className="bg-slate-100/60 dark:bg-zinc-900/40 border border-slate-200/40 dark:border-zinc-800/40 rounded-3xl p-8 text-center space-y-3">
          <h3 className="text-xl font-bold">Don&apos;t see your role?</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            We are always interested in meeting talented engineers, designers, and marketers. Send us a spontaneous application!
          </p>
          <a
            href="mailto:careers@trivllo.com?subject=Spontaneous Application"
            className="inline-block mt-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full text-sm shadow-md transition-colors"
          >
            Send your Resume
          </a>
        </div>
      </div>
    </div>
  );
}
