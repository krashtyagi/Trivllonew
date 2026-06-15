// import { Facebook, Instagram, Twitter } from "lucide-react"

// export function Footer() {
//   return (
//     <footer className="bg-background">
//       <div className="mx-auto max-w-7xl px-6 py-14">
//         <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold text-red-500">Hilexa</h2>
//             <p className="text-sm text-muted-foreground max-w-xs">
//               Explore the world with Hilexa. Your spot destination for flight,
//               and unique styles.
//             </p>
//             <div className="flex gap-3">
//               <SocialIcon icon={<Instagram />} />
//               <SocialIcon icon={<Facebook />} />
//               <SocialIcon icon={<Twitter />} />
//             </div>
//           </div>

//           <div>
//             <h3 className="mb-4 text-sm font-semibold">Support</h3>
//             <ul className="space-y-3 text-sm text-muted-foreground">
//               <li>Help Center</li>
//               <li>Booking Policy</li>
//               <li>Refund & Cancellation</li>
//               <li>Contact Us</li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="mb-4 text-sm font-semibold">Company</h3>
//             <ul className="space-y-3 text-sm text-muted-foreground">
//               <li>About Us</li>
//               <li>Careers</li>
//               <li>Privacy Policy</li>
//               <li>Terms of Services</li>
//               <li>
//                 <a href={process.env.NEXT_PUBLIC_PARTNER_URL} target="_blank" rel="noopener noreferrer" className="cursor-pointer font-bold">Partner with us</a>

//               </li>
//             </ul>
//           </div>


//         </div>

//       </div>

//       <div className="w-full border-1 mt-10 " />

//       <div className="w-full px-6 py-6">
//         <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
//           <span>© 2021 All Rights Reserved</span>
//           <div className="flex flex-wrap gap-6">
//             <span>Privacy Policy</span>
//             <span>Terms of Use</span>
//             <span>Sales and Refunds</span>
//             <span>Legal</span>
//             <span>Site Map</span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

// function SocialIcon({ icon }: { icon: React.ReactNode }) {
//   return (
//     <div className="flex h-9 w-9 items-center justify-center rounded-full border text-red-500 hover:bg-red-500 hover:text-white transition">
//       {icon}
//     </div>
//   )
// }

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  ChevronDown,
} from "lucide-react";

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary-500">
              Trivllo
            </h2>

            <p className="max-w-xs text-sm text-muted-foreground">
              Explore the world with Trivllo. Your destination
              for unforgettable journeys and travel experiences.
            </p>

            <div className="flex gap-3">
              <SocialIcon icon={<Instagram size={18} />} href="https://www.instagram.com/trivllo" />
              <SocialIcon icon={<Facebook size={18} />} href="https://www.facebook.com/profile.php?id=61590569073379" />
              <SocialIcon icon={<Twitter size={18} />} href="https://twitter.com/trivllo" />
            </div>
          </div>

          {/* Desktop Sections */}
          <div className="hidden md:block">
            <h3 className="mb-4 text-sm font-semibold">
              Support
            </h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/contact" className="hover:text-foreground cursor-pointer transition">
                  Help Center
                </Link>
              </li>

              <li>
                <Link href="/terms#bookings" className="hover:text-foreground cursor-pointer transition">
                  Booking Policy
                </Link>
              </li>

              <li>
                <Link href="/terms#cancellations" className="hover:text-foreground cursor-pointer transition">
                  Refund & Cancellation
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-foreground cursor-pointer transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden md:block">
            <h3 className="mb-4 text-sm font-semibold">
              Company
            </h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground cursor-pointer transition">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/careers" className="hover:text-foreground cursor-pointer transition">
                  Careers
                </Link>
              </li>

              <li>
                <Link href="/privacy" className="hover:text-foreground cursor-pointer transition">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms" className="hover:text-foreground cursor-pointer transition">
                  Terms of Services
                </Link>
              </li>

              <li>
                <a
                  // href={process.env.NEXT_PUBLIC_PARTNER_URL}
                  href="https://partner.trivllo.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:text-foreground transition"
                >
                  Partner with us
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3 md:hidden">
            <MobileSection
              title="Support"
              isOpen={openSection === "support"}
              onClick={() => toggleSection("support")}
            >
              <li>
                <Link href="/contact">Help Center</Link>
              </li>
              <li>
                <Link href="/terms#bookings">Booking Policy</Link>
              </li>
              <li>
                <Link href="/terms#cancellations">Refund & Cancellation</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </MobileSection>

            <MobileSection
              title="Company"
              isOpen={openSection === "company"}
              onClick={() => toggleSection("company")}
            >
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Services</Link>
              </li>

              <li>
                <a
                  href={"https://partner.trivllo.com/login"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Partner with us
                </a>
              </li>
            </MobileSection>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-center text-sm text-muted-foreground md:flex-row md:text-left">
          <span>© 2026 Revellio. All Rights Reserved.</span>

          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
            <Link href="/privacy" className="cursor-pointer hover:text-foreground transition">
              Privacy Policy
            </Link>

            <Link href="/terms" className="cursor-pointer hover:text-foreground transition">
              Terms of Use
            </Link>

            <span className="cursor-pointer hover:text-foreground transition">
              Sales & Refunds
            </span>

            <span className="cursor-pointer hover:text-foreground transition">
              Legal
            </span>

            <span className="cursor-pointer hover:text-foreground transition">
              Site Map
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  icon,
  href,
}: {
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full border text-primary transition hover:bg-secondary hover:text-white"
    >
      {icon}
    </a>
  );
}

function MobileSection({
  title,
  children,
  isOpen,
  onClick,
}: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b pb-2">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold"
      >
        {title}

        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {isOpen && (
        <ul className="space-y-3 pb-3 text-sm text-muted-foreground">
          {children}
        </ul>
      )}
    </div>
  );
}

