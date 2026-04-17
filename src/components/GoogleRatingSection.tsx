"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

const MAPS_REVIEW_URL =
  "https://www.google.com/maps/place/Eiscaf%C3%A9+Dolce+Vita/@48.3750143,7.8753382"

export default function GoogleRatingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.from(".rating-card", {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        } as ScrollTrigger.Vars,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="py-12 px-6 bg-[--color-bg]">
      <div className="max-w-lg mx-auto">
        <a
          href={MAPS_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rating-card glass-card p-6 flex flex-col sm:flex-row items-center justify-center gap-4 will-change-transform hover:shadow-lg"
          style={{ transition: "box-shadow 0.3s", display: "flex", textDecoration: "none" }}
        >
          {/* Google G */}
          <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-0.5 mb-1">
              {[1,2,3,4,5].map(s => (
                <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <p className="text-sm font-semibold text-[--color-text]">Auf Google bewerten</p>
            <p className="text-xs text-[--color-text-muted] mt-0.5">Teile deine Erfahrung mit uns</p>
          </div>
        </a>
      </div>
    </div>
  )
}
