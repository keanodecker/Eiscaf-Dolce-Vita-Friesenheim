"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.from(".footer-col", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        } as ScrollTrigger.Vars,
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer id="kontakt" ref={footerRef} className="bg-[#1a1a1a] text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo + About */}
          <div className="footer-col will-change-transform">
            <p className="font-serif text-2xl mb-4">🍦 Eisdiele Milano</p>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Handgemachtes Eis mit Leidenschaft seit 1987. Täglich frisch zubereitet
              mit den besten Zutaten aus der Region.
            </p>
          </div>

          {/* Contact */}
          <div className="footer-col will-change-transform">
            <h4 className="font-serif text-lg mb-4 text-white/90">Kontakt</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>
                  Hauptstraße 42
                  <br />
                  77948 Friesenheim
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a
                  href="tel:+4978218000"
                  className="hover:text-white"
                  style={{ transition: "color 0.3s" }}
                >
                  +49 7821 8000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a
                  href="mailto:info@eisdiele-milano.de"
                  className="hover:text-white"
                  style={{ transition: "color 0.3s" }}
                >
                  info@eisdiele-milano.de
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="footer-col will-change-transform">
            <h4 className="font-serif text-lg mb-4 text-white/90">Folge uns</h4>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white"
                style={{ transition: "color 0.3s, border-color 0.3s" }}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white"
                style={{ transition: "color 0.3s, border-color 0.3s" }}
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
            </div>
            <p className="text-xs text-white/40 mt-6">Impressum · Datenschutz</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-white/40">
            © 2025 Eisdiele Milano. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
}
