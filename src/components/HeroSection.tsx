"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "@/lib/gsap"

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, { y: 60, opacity: 0, duration: 1.1, ease: "power4.out", delay: 0.3 })
      gsap.from(subtitleRef.current, { y: 40, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.7 })
      gsap.from(ctaRef.current, { y: 30, opacity: 0, duration: 0.7, ease: "power3.out", delay: 1.0 })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=1920&q=80"
          alt="Eiscafé Dolce Vita Friesenheim"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/65 pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1
          ref={titleRef}
          className="font-serif text-white mb-5 leading-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
        >
          Die Eisdielen-Familie aus Friesenheim seit über 20 Jahren
        </h1>
        <p
          ref={subtitleRef}
          className="text-white/90 text-lg md:text-xl mb-8 font-light tracking-widest uppercase"
        >
          Handgemacht. Frisch. Jeden Tag.
        </p>
        <a
          ref={ctaRef}
          href="/galerie"
          className="inline-block px-8 py-4 rounded-full border-2 border-white text-white font-medium text-sm tracking-wide backdrop-blur-sm bg-white/10 hover:bg-[--color-accent] hover:border-[--color-accent]"
          style={{ transition: "background 0.3s, border-color 0.3s" }}
        >
          Entdecken
        </a>
      </div>
    </section>
  )
}
