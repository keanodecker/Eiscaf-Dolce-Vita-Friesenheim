"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let scrollCtx: ReturnType<typeof gsap.context> | null = null

    // Intro text animations
    const introCtx = gsap.context(() => {
      if (reduced) return
      gsap.from(titleRef.current, { y: 60, opacity: 0, duration: 1.1, ease: "power4.out", delay: 0.3 })
      gsap.from(subtitleRef.current, { y: 40, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.6 })
      gsap.from(ctaRef.current, { y: 30, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.9 })
    }, section)

    // Scroll-driven video playback
    const setupScrollVideo = () => {
      const duration = video.duration || 3
      const scrollDist = Math.max(800, Math.ceil(duration * 220))
      video.currentTime = 0

      scrollCtx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${scrollDist}`,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            video.currentTime = self.progress * duration
          },
        } as ScrollTrigger.StaticVars)
      }, section)
    }

    if (video.readyState >= 1) {
      setupScrollVideo()
    } else {
      video.addEventListener("loadedmetadata", setupScrollVideo, { once: true })
    }

    return () => {
      introCtx.revert()
      scrollCtx?.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="hero relative w-full h-screen overflow-hidden flex flex-col"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=1920&q=80"
          alt="Handgemachtes Eis bei Eisdiele Milano"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Gradient: strong at top+bottom, open in center where video sits */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/70 pointer-events-none" />

      {/* Content column */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full pt-[72px] pb-14 px-6">

        {/* ── Video overlay ── */}
        <div className="flex-1 flex items-center justify-center w-full">
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            style={{
              width: "clamp(300px, 68vw, 800px)",
              // Radial mask: fades edges → no hard white border
              maskImage:
                "radial-gradient(ellipse 72% 72% at 50% 50%, black 42%, rgba(0,0,0,0.7) 62%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 72% 72% at 50% 50%, black 42%, rgba(0,0,0,0.7) 62%, transparent 80%)",
              // multiply: white parts of video become transparent
              mixBlendMode: "multiply",
              // Pop the colors
              filter: "brightness(1.45) saturate(1.25) contrast(1.05)",
            }}
          >
            <source src="/eis-animation.mp4" type="video/mp4" />
          </video>
        </div>

        {/* ── Text below video ── */}
        <div className="text-center w-full max-w-2xl">
          <h1
            ref={titleRef}
            className="font-serif text-white mb-3 leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Handgemachtes Eis seit 1987
          </h1>
          <p
            ref={subtitleRef}
            className="text-white/90 text-base md:text-lg mb-8 font-light"
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

      </div>
    </section>
  )
}
