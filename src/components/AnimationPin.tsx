"use client"

// TODO: Video-Overlay hier einbauen
// Pinned section — stays fixed while scrolling past, then releases.
// Replace placeholder content with a fullscreen video or GSAP scene.

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export default function AnimationPin() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: isMobile ? "+=200" : "+=500",
        pin: true,
        pinSpacing: true,
      } as ScrollTrigger.StaticVars)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen bg-gradient-to-b from-pink-50 to-orange-50 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Waffel centered */}
      <div className="relative mb-10" style={{ width: "clamp(140px, 30vw, 220px)" }}>
        <Image
          src="/eis/waffel.png"
          alt="Eiswaffel"
          width={220}
          height={260}
          className="w-full h-auto drop-shadow-xl"
          priority
        />
      </div>

      {/* Placeholder frame */}
      <div className="border-2 border-dashed border-pink-300 rounded-2xl px-12 py-8 max-w-md w-full mx-6 text-center">
        <p className="text-[--color-text-muted] text-base font-medium">
          [ Eis-Animation wird hier eingefügt ]
        </p>
      </div>

      <p
        className="mt-8 font-serif text-[--color-text] text-center px-6"
        style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
      >
        Täglich frisch aus unserer Küche
      </p>
    </div>
  )
}
