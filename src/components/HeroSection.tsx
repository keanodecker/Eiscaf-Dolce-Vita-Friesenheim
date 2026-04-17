"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const ctx = gsap.context(() => {
      if (reduced) return

      // Load animations
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      })
      gsap.from(subtitleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      })
      gsap.from(ctaRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
      })

      // Parallax — bg is scaled up (scale-110) so there's room to shift
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        } as ScrollTrigger.Vars,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="hero relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center"
    >
      {/* Background — scaled up for parallax headroom */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-[1.3] will-change-transform"
      >
        <Image
          src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=1920&q=80"
          alt="Handgemachtes Eis bei Eisdiele Milano"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />

      <div className="relative z-10 text-center px-6 pt-[72px]">
        <h1
          ref={titleRef}
          className="hero-title font-serif text-white mb-6 leading-tight"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          Handgemachtes Eis
          <br />
          seit 1987
        </h1>
        <p
          ref={subtitleRef}
          className="hero-subtitle text-white/90 text-lg md:text-xl mb-10 max-w-xl mx-auto font-light"
        >
          Frische Zutaten. Klassische Rezepte. Jeden Tag neu.
        </p>
        <a
          ref={ctaRef}
          href="#speisekarte"
          className="inline-block px-8 py-4 rounded-full border-2 border-white text-white font-medium text-sm tracking-wide backdrop-blur-sm bg-white/10 hover:bg-[--color-accent] hover:border-[--color-accent]"
          style={{ transition: "background 0.3s, border-color 0.3s" }}
        >
          Speisekarte entdecken
        </a>
      </div>
    </section>
  )
}
