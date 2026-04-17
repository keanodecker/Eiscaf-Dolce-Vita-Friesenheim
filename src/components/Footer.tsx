"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import GoogleRating from "@/components/GoogleRating"

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
        y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 85%" } as ScrollTrigger.Vars,
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer id="kontakt" ref={footerRef} className="bg-[#1a1a1a] text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo + About + Rating */}
          <div className="footer-col will-change-transform">
            <p className="font-serif text-2xl mb-3">🍦 Eiscafé Dolce Vita</p>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs mb-5">
              Handgemachtes Eis mit Leidenschaft seit 1987. Täglich frisch zubereitet
              mit den besten Zutaten aus der Region.
            </p>
            <GoogleRating theme="light" />
          </div>

          {/* Contact */}
          <div className="footer-col will-change-transform">
            <h4 className="font-serif text-lg mb-4 text-white/90">Kontakt</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>Hauptstraße 42<br />77948 Friesenheim</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+4915202156548" className="hover:text-white" style={{ transition: "color 0.3s" }}>
                  +49 152 02156548
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <a href="https://wa.me/4915202156548" target="_blank" rel="noopener noreferrer" className="hover:text-white" style={{ transition: "color 0.3s" }}>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="footer-col will-change-transform">
            <h4 className="font-serif text-lg mb-4 text-white/90">Folge uns</h4>
            <div className="flex items-center gap-4 mb-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white" style={{ transition: "color 0.3s, border-color 0.3s" }} aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white" style={{ transition: "color 0.3s, border-color 0.3s" }} aria-label="Facebook">
                <FacebookIcon />
              </a>
            </div>
            <p className="text-xs text-white/40">Impressum · Datenschutz</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-white/40">
            © 2025 Eiscafé Dolce Vita · Friesenheim. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
}
