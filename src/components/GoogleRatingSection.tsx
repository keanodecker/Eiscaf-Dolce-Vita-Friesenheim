"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import GoogleRating from "@/components/GoogleRating"

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
    <div ref={sectionRef} className="py-14 px-6 bg-[--color-bg]">
      <div className="max-w-xl mx-auto">
        <div className="rating-card glass-card p-8 text-center will-change-transform">
          <p className="text-xs font-semibold tracking-widest text-[--color-accent] uppercase mb-4">
            Was unsere Gäste sagen
          </p>
          <div className="flex justify-center mb-3">
            <GoogleRating theme="dark" />
          </div>
          <p className="text-sm text-[--color-text-muted] mt-4 leading-relaxed">
            Hunderte zufriedene Gäste bewerten uns regelmäßig auf Google —<br className="hidden sm:block" />
            vielen Dank für euer Vertrauen!
          </p>
        </div>
      </div>
    </div>
  )
}
