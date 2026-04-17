"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
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

    // Load animations — fire immediately on page load
    const introCtx = gsap.context(() => {
      if (reduced) return
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        delay: 0.4,
      })
      gsap.from(subtitleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.7,
      })
      gsap.from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 1.0,
      })
    }, section)

    // Scroll-driven video: pin the hero and advance video.currentTime with scroll
    const setupScrollVideo = () => {
      const duration = video.duration || 3
      // 200 px scroll per second of video — adjust this number to taste
      const scrollDist = Math.max(800, Math.ceil(duration * 200))

      video.currentTime = 0

      scrollCtx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${scrollDist}`,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            // Scrub video frame to scroll progress
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
      <div
        ref={bgRef}
        className="absolute inset-0 scale-[1.05] will-change-transform"
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

      {/* Gradient: transparent in center (video area), dark at top (nav) + bottom (text) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/5 to-black/65 pointer-events-none" />

      {/* Content column */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full pt-[72px] pb-14 px-6">

        {/* ── Video — upper area, overlaid on hero image ── */}
        <div className="flex-1 flex items-center justify-center">
          {/* Light disc behind video so mix-blend-mode:multiply works on any bg */}
          <div
            className="absolute rounded-full bg-white/20 backdrop-blur-[1px]"
            style={{
              width: "clamp(260px, 48vw, 580px)",
              height: "clamp(260px, 48vw, 580px)",
            }}
          />
          <video
            ref={videoRef}
            className="relative z-10"
            style={{
              width: "clamp(240px, 46vw, 560px)",
              mixBlendMode: "multiply",
            }}
            muted
            playsInline
            preload="auto"
          >
            <source src="/eis-animation.mp4" type="video/mp4" />
          </video>
        </div>

        {/* ── Text info — below the video ── */}
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
