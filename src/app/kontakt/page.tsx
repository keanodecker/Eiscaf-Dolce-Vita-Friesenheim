"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap, ScrollTrigger } from "@/lib/gsap"

const MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d7.8753382!3d48.3750143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47912de750b7ebe3%3A0xd0f3e78712f1fbef!2sEiscaf%C3%A9+Dolce+Vita!5e0!3m2!1sde!2sde"
const MAPS_LINK = "https://www.google.com/maps/place/Eiscaf%C3%A9+Dolce+Vita/@48.3750143,7.8753382"

const hours = [
  { days: "Montag",               time: "11:30 – 20:00 Uhr", closed: false },
  { days: "Dienstag",             time: "11:30 – 20:00 Uhr", closed: false },
  { days: "Mittwoch",             time: "Ruhetag",            closed: true  },
  { days: "Donnerstag",           time: "11:30 – 20:00 Uhr", closed: false },
  { days: "Freitag",              time: "11:30 – 20:00 Uhr", closed: false },
  { days: "Samstag",              time: "14:00 – 20:00 Uhr", closed: false },
  { days: "Sonntag & Feiertage",  time: "14:00 – 20:00 Uhr", closed: false },
]

export default function KontaktPage() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.from(".contact-card", {
        y: 50, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 85%" } as ScrollTrigger.Vars,
      })
    }, contentRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Back link */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[--color-text-muted] hover:text-[--color-accent] bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-black/5"
          style={{ transition: "color 0.3s" }}
        >
          ← Zurück
        </Link>
      </div>

      {/* Hero band */}
      <div
        className="pt-32 pb-16 px-6 text-center"
        style={{ background: "linear-gradient(160deg, #fff8f3 0%, #fff 100%)" }}
      >
        <p className="text-xs font-semibold tracking-widest text-[--color-accent] uppercase mb-3">
          Besuche uns
        </p>
        <h1
          className="font-serif text-[--color-text] mb-4 leading-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          Kontakt &amp; Anfahrt
        </h1>
        <p className="text-[--color-text-muted] text-lg max-w-xl mx-auto">
          Wir freuen uns auf deinen Besuch — komm einfach vorbei oder schreib uns.
        </p>
      </div>

      {/* Cards + map */}
      <div ref={contentRef} className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

          {/* Contact info card */}
          <div className="contact-card glass-card p-10 will-change-transform">
            <h2 className="font-serif text-2xl text-[--color-text] mb-8">Erreichbarkeit</h2>

            <ul className="space-y-6 text-[--color-text-muted] text-sm mb-8">
              <li className="flex items-start gap-3">
                <span className="text-lg mt-0.5">📍</span>
                <div>
                  <p className="font-semibold text-[--color-text] mb-0.5">Adresse</p>
                  <p>Hauptstraße 42<br />77948 Friesenheim</p>
                  <a
                    href={MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[--color-accent] text-xs font-semibold hover:underline mt-1 inline-block"
                  >
                    Route auf Google Maps →
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-lg mt-0.5">📞</span>
                <div>
                  <p className="font-semibold text-[--color-text] mb-0.5">Telefon</p>
                  <a
                    href="tel:015202156548"
                    className="hover:text-[--color-accent]"
                    style={{ transition: "color 0.3s" }}
                  >
                    015202156548
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-lg mt-0.5">💬</span>
                <div>
                  <p className="font-semibold text-[--color-text] mb-0.5">WhatsApp</p>
                  <a
                    href="https://wa.me/4915202156548"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[--color-accent]"
                    style={{ transition: "color 0.3s" }}
                  >
                    Nachricht schreiben
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-lg mt-0.5">✉️</span>
                <div>
                  <p className="font-semibold text-[--color-text] mb-0.5">E-Mail</p>
                  <a
                    href="mailto:eiscafe.dolcevita.salinco@gmail.com"
                    className="hover:text-[--color-accent] break-all"
                    style={{ transition: "color 0.3s" }}
                  >
                    eiscafe.dolcevita.salinco@gmail.com
                  </a>
                </div>
              </li>
            </ul>

            <a
              href="https://wa.me/4915202156548"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold"
              style={{ backgroundColor: "#25D366", transition: "opacity 0.3s" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp schreiben
            </a>
          </div>

          {/* Opening hours card */}
          <div className="contact-card glass-card p-10 will-change-transform">
            <h2 className="font-serif text-2xl text-[--color-text] mb-8">Öffnungszeiten</h2>
            <p className="text-xs text-[--color-text-muted] mb-5">Ab 30.03.2026</p>
            <ul className="space-y-3">
              {hours.map(({ days, time, closed }) => (
                <li
                  key={days}
                  className="flex items-center justify-between gap-2 border-b border-black/5 pb-3 last:border-0 last:pb-0"
                >
                  <span className={`text-sm font-medium ${closed ? "text-red-400 line-through" : "text-[--color-text-muted]"}`}>
                    {days}
                  </span>
                  <span className={`text-sm font-semibold ${closed ? "text-red-400" : "text-[--color-text]"}`}>
                    {time}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-[--color-text-muted] mt-6">
              * Saisonale Abweichungen möglich. Aktuelle Infos per WhatsApp.
            </p>
          </div>
        </div>

        {/* Google Maps */}
        <div className="contact-card rounded-2xl overflow-hidden will-change-transform" style={{ height: "420px" }}>
          <iframe
            src={MAPS_EMBED}
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Eiscafé Dolce Vita auf Google Maps"
          />
        </div>
        <div className="bg-white px-6 py-3 rounded-b-2xl flex items-center justify-between border border-t-0 border-black/5">
          <p className="text-sm text-[--color-text-muted]">Hauptstraße 42 · 77948 Friesenheim</p>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[--color-accent] hover:underline"
          >
            In Google Maps öffnen →
          </a>
        </div>
      </div>
    </>
  )
}
