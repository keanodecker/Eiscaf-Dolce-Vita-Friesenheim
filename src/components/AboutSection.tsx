"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.from(".about-title", {
        y: 50, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } as ScrollTrigger.Vars,
      })
      gsap.from(".about-text", {
        y: 40, opacity: 0, duration: 0.9, delay: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } as ScrollTrigger.Vars,
      })
      gsap.from(".about-cta", {
        y: 30, opacity: 0, duration: 0.7, delay: 0.3, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } as ScrollTrigger.Vars,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="ueber-uns"
      ref={sectionRef}
      className="py-[120px] px-6 bg-[--color-bg]"
    >
      <div className="max-w-3xl mx-auto text-center">
        <p className="about-title text-xs font-semibold tracking-widest text-[--color-accent] uppercase mb-4">
          Über uns
        </p>
        <h2
          className="about-title font-serif text-[--color-text] mb-6 leading-tight"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          Seit 1987 ein Stück
          <br />
          Friesenheim
        </h2>
        <p className="about-text text-[--color-text-muted] text-base md:text-lg leading-relaxed mb-4">
          Was als kleiner Familienbetrieb begann, ist heute ein fester Teil
          unserer Gemeinde. Jeden Tag bereiten wir unser Eis frisch zu —
          mit Zutaten aus der Region, überlieferten Rezepten und echter
          Handarbeit.
        </p>
        <p className="about-text text-[--color-text-muted] text-base md:text-lg leading-relaxed mb-10">
          Kein Industrieeis. Keine Kompromisse. Nur das Beste für unsere Gäste.
        </p>
        <Link
          href="/ueber-uns"
          className="about-cta inline-flex items-center gap-2 text-sm font-semibold text-[--color-accent] hover:gap-4 group"
          style={{ transition: "gap 0.3s" }}
        >
          Unsere Geschichte entdecken
          <span className="group-hover:translate-x-1" style={{ transition: "transform 0.3s" }}>→</span>
        </Link>
      </div>
    </section>
  )
}
