import { useState } from "react";
import { Facebook, Instagram, Youtube, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import trivlloData from "@/../trivllo.json";
import { WaveShader } from "@/components/ui/wave-shader";
import { FlowingRibbons } from "../ui/flowing-ribbons";

export function Footer() {
  const [supportOpen, setSupportOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  return (
    <footer className="relative bg-zinc-200 md:px-10 sm:px-5 overflow-hidden">
      {/* <FlowingRibbons ribbonCount={1} lineWidth={22} linesPerRibbon={30} /> */}
      {/* <WaveShader
        color="142, 72%, 55%"
        colorSecondary="158, 60%, 48%"
        angle={0}
        waveCount={6}
        amplitude={25}
        wavelength={1.5}
        speed={0.15}
        opacity={0.10}
        randomness={0.7}
        blur={30}
        flowFromBottom={true}
        position="bottom"
        height="60%"
      /> */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 ">
        <div className="grid grid-cols-1 gap-8 md:gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-500">{trivlloData.company_name}</h2>
            <p className="text-sm text-muted-foreground max-w-xs">
              Explore the world with {trivlloData.company_name}. Your trusted platform for hotels,
              tours, and experiences.
            </p>
            <div className="flex gap-3">
              <a
                href={`https://www.instagram.com/trivllo`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <SocialIcon icon={<Instagram />} />
              </a>
              <a
                href={`https://www.facebook.com/profile.php?id=61590569073379`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <SocialIcon icon={<Facebook />} />
              </a>
              <a
                href={`https://twitter.com/trivllo`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <SocialIcon icon={<Youtube />} />
              </a>
            </div>
          </div>

          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4 md:border-none md:pb-0">
            <button
              onClick={() => setSupportOpen(!supportOpen)}
              className="flex w-full items-center justify-between text-left md:pointer-events-none md:block"
            >
              <h3 className="text-sm font-semibold">Policies</h3>
              <span className="md:hidden text-muted-foreground">
                {supportOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </span>
            </button>
            <ul className={`mt-4 space-y-3 text-sm text-muted-foreground md:block ${supportOpen ? "block" : "hidden"}`}>
              <li>
                <Link href="/terms-of-services" className="hover:text-zinc-500 transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-zinc-500 transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4 md:border-none md:pb-0">
            <button
              onClick={() => setCompanyOpen(!companyOpen)}
              className="flex w-full items-center justify-between text-left md:pointer-events-none md:block"
            >
              <h3 className="text-sm font-semibold">Company</h3>
              <span className="md:hidden text-muted-foreground">
                {companyOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </span>
            </button>
            <ul className={`mt-4 space-y-3 text-sm text-muted-foreground md:block ${companyOpen ? "block" : "hidden"}`}>
              <li>
                <Link href="/about-us" className="hover:text-zinc-500 transition">
                  About Us
                </Link>
              </li>
              <li>
                <a href={process.env.NEXT_PUBLIC_PARTNER_URL || "https://partner.trivllo.com/login"} target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">
                  Partner With Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full border-t border-zinc-150 dark:border-zinc-800 mt-10" />

      <div className="relative z-10 w-full px-6 py-6">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <span>© 2026 {trivlloData.company_name}. All Rights Reserved</span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-end">
            <Link href="/terms-of-services" className="hover:text-zinc-500 transition">
              Terms & Conditions
            </Link>
            <Link href="/privacy-policy" className="hover:text-zinc-500 transition">
              Privacy Policy
            </Link>
            <Link href="/about-us" className="hover:text-zinc-500 transition">
              About Us
            </Link>
            <a href={process.env.NEXT_PUBLIC_PARTNER_URL || "https://partner.trivllo.com/login"} target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition">
              Partner With Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full border text-zinc-500 hover:bg-zinc-500 hover:text-white transition">
      {icon}
    </div>
  );
}
