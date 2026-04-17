"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap, ScrollTrigger } from "@/lib/gsap"

const slides = [
  {
    src: "https://images.unsplash.com/photo-1543353071-873f17a7a088?w=1400&q=85",
    alt: "Bunte Eiskugeln und Eissorten",
    label: "Eissorten",
    sub: "Über 30 handgemachte Sorten",
  },
  {
    src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1400&q=85",
    alt: "Waffeln und Kuchen",
    label: "Waffeln & Kuchen",
    sub: "Frisch gebacken — täglich",
  },
  {
    src: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=1400&q=85",
    alt: "Erfrischende Getränke",
    label: "Erfrischungen",
    sub: "Eiskalte Getränke für heiße Tage",
  },
]

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.innerWidth < 768
    if (reduced || isMobile) return

    const ctx = gsap.context(() => {
      const totalScroll = () => track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: () => -totalScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        } as ScrollTrigger.Vars,
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{ width: `${slides.length * 85}vw` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.src}
            className="relative flex-shrink-0"
            style={{ width: "85vw", height: "100vh" }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes="85vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-12 left-12 z-10">
              <p className="text-white/70 text-sm font-medium tracking-widest uppercase mb-2">
                {slide.sub}
              </p>
              <span className="font-serif text-white drop-shadow-lg" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
                {slide.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
