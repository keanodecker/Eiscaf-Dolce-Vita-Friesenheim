"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export default function AnimationPin() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      // Pin the section — video plays while user scrolls through
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: isMobile ? "+=300" : "+=600",
        pin: true,
        pinSpacing: true,
      } as ScrollTrigger.StaticVars)

      // Fade in video + headline as section enters
      gsap.from(".anim-video", {
        scale: 0.85,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
      gsap.from(".anim-headline", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen bg-gradient-to-b from-pink-50 to-orange-50 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animation video — mix-blend-mode:multiply makes white bg transparent */}
      <video
        ref={videoRef}
        className="anim-video will-change-transform"
        style={{
          width: "clamp(260px, 55vw, 620px)",
          mixBlendMode: "multiply",
        }}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/eis-animation.mp4" type="video/mp4" />
      </video>

      <p
        className="anim-headline font-serif text-[--color-text] text-center px-6 -mt-4"
        style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}
      >
        Wähle deinen Lieblingsgeschmack
      </p>
    </div>
  )
}
