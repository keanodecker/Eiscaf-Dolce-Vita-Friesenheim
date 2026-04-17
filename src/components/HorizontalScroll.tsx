"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap, ScrollTrigger } from "@/lib/gsap"

const slides = [
  {
    src: "https://images.unsplash.com/photo-1518349619113-03114f06ac3a?w=1400&q=85",
    alt: "Eisbecher Nahaufnahme",
    label: "Klassisch",
  },
  {
    src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1400&q=85",
    alt: "Bunte Eisstiele",
    label: "Saisonal",
  },
  {
    src: "https://images.unsplash.com/photo-1567206563114-c179706e76a3?w=1400&q=85",
    alt: "Eisbecher mit Toppings",
    label: "Creations",
  },
  {
    src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1400&q=85",
    alt: "Eisgenuss im Sommer",
    label: "Sorbets",
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
            {/* Label */}
            <div className="absolute bottom-10 left-10 z-10">
              <span className="font-serif text-white text-3xl md:text-5xl drop-shadow-lg">
                {slide.label}
              </span>
            </div>
            {/* Subtle gradient at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        ))}
      </div>
    </div>
  )
}
