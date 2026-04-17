"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

interface HoursRow {
  days: string
  hours: string
}

const hours: HoursRow[] = [
  { days: "Montag – Freitag", hours: "11:00 – 20:00 Uhr" },
  { days: "Samstag – Sonntag", hours: "10:00 – 21:00 Uhr" },
  { days: "Feiertags", hours: "12:00 – 19:00 Uhr" },
]

// Google Maps embed for Eiscafé Dolce Vita, Friesenheim
const MAPS_EMBED =
  "https://maps.google.com/maps?q=48.3750143,7.8753382&z=16&output=embed"
const MAPS_LINK =
  "https://www.google.com/maps/place/Eiscaf%C3%A9+Dolce+Vita/@48.3750143,7.8753382"

export default function OpeningHours() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      const xOffset = isMobile ? 0 : 100
      const trigger: ScrollTrigger.Vars = {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 40%",
        scrub: isMobile || reduced ? false : 1,
        once: isMobile || reduced,
      }
      gsap.fromTo(leftRef.current, { x: reduced ? 0 : -xOffset, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", duration: 1, scrollTrigger: trigger })
      gsap.fromTo(rightRef.current, { x: reduced ? 0 : xOffset, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", duration: 1, scrollTrigger: trigger })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="oeffnungszeiten" ref={sectionRef} className="py-[120px] px-6 bg-pink-50/40">
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-serif text-center mb-16 text-[--color-text]"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          Öffnungszeiten
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hours Card */}
          <div ref={leftRef} className="glass-card p-10 will-change-transform">
            <h3 className="font-serif text-xl text-[--color-text] mb-8 flex items-center gap-3">
              <span>🕐</span> Wir sind für dich da
            </h3>
            <ul className="space-y-6">
              {hours.map(({ days, hours: time }) => (
                <li key={days} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-black/5 pb-5 last:border-0 last:pb-0">
                  <span className="text-sm text-[--color-text-muted] font-medium">{days}</span>
                  <span className="text-sm font-semibold text-[--color-text]">{time}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-black/5 flex flex-col gap-3">
              <a
                href="https://wa.me/4915202156548"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white w-fit"
                style={{ backgroundColor: "#25D366", transition: "opacity 0.3s" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp schreiben
              </a>
              <p className="text-xs text-[--color-text-muted]">
                * Saisonale Abweichungen möglich.
              </p>
            </div>
          </div>

          {/* Interactive Google Map */}
          <div ref={rightRef} className="rounded-2xl overflow-hidden will-change-transform" style={{ minHeight: "360px" }}>
            <iframe
              src={MAPS_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", minHeight: "360px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Eiscafé Dolce Vita auf Google Maps"
            />
            <div className="bg-white px-5 py-3 flex items-center justify-between">
              <p className="text-sm text-[--color-text-muted]">Hauptstraße 42 · 77948 Friesenheim</p>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[--color-accent] hover:underline"
              >
                Route →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
