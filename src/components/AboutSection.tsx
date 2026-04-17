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
      gsap.from(".about-el", {
        y: 40, opacity: 0, stagger: 0.15, duration: 0.9, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        } as ScrollTrigger.Vars,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-pink-50/40">
      <div className="max-w-2xl mx-auto text-center">
        <p className="about-el text-xs font-semibold tracking-widest text-[--color-accent] uppercase mb-4">
          Über uns
        </p>
        <h2
          className="about-el font-serif text-[--color-text] mb-5 leading-tight"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
        >
          Seit über 20 Jahren Friesenheims Eisdielen-Familie
        </h2>
        <p className="about-el text-[--color-text-muted] text-base md:text-lg leading-relaxed mb-8">
          Seit über 20 Jahren verwöhnen wir Friesenheim mit handgemachtem Eis aus regionalen Zutaten.
          Was als Familientraum begann, ist heute eine Tradition — täglich frisch zubereitet,
          mit Leidenschaft und ohne Kompromisse.
        </p>
        <Link
          href="/ueber-uns"
          className="about-el inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-[--color-accent] text-[--color-accent] font-semibold text-sm hover:bg-[--color-accent] hover:text-white"
          style={{ transition: "background-color 0.3s, color 0.3s" }}
        >
          Mehr über uns →
        </Link>
      </div>
    </section>
  )
}
