"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import SpaghettiIce from "@/components/SpaghettiIce"

const stories = [
  {
    img: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=80",
    alt: "Natur und frische Zutaten",
    badge: "🥛 Zertifiziert",
    title: "100% Biomilch",
    text: "Wir verarbeiten ausschließlich zertifizierte Biomilch aus der Region — für Eis das man schmeckt und verantworten kann.",
    cta: { label: "Zur Speisekarte", href: "/speisekarte" },
    showSpaghetti: true,
  },
  {
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
    alt: "Nachhaltige Natur",
    badge: "🌿 Nachhaltig",
    title: "Nachhaltig & Regional",
    text: "Von der Verpackung bis zur Zutat — wir denken in Kreisläufen und arbeiten mit regionalen Partnern zusammen.",
    cta: null,
    showSpaghetti: false,
  },
  {
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    alt: "Saubere professionelle Küche",
    badge: "✅ Ausgezeichnet",
    title: "Ausgezeichnete Hygiene",
    text: "Regelmäßige unabhängige Prüfungen bestätigen unsere Spitzenposition in Sachen Sauberkeit und Qualität.",
    cta: null,
    showSpaghetti: false,
  },
]

export default function CertificateStories() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const isEven = i % 2 === 0
        const imgWrap = el.querySelector<HTMLElement>(".cert-img")
        const textWrap = el.querySelector<HTMLElement>(".cert-text")
        if (!imgWrap || !textWrap) return

        const imgX = reduced ? 0 : isEven ? -100 : 100
        const textX = reduced ? 0 : isEven ? 100 : -100

        const trigger: ScrollTrigger.Vars = {
          trigger: el,
          start: "top 75%",
          end: "top 25%",
          scrub: isMobile || reduced ? false : 1.5,
          once: isMobile || reduced,
        }

        gsap.fromTo(
          imgWrap,
          { x: imgX, opacity: 0 },
          { x: 0, opacity: 1, ease: "power2.out", duration: 1, scrollTrigger: trigger }
        )
        gsap.fromTo(
          textWrap,
          { x: textX, opacity: 0 },
          { x: 0, opacity: 1, ease: "power2.out", duration: 1, scrollTrigger: trigger }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[--color-bg]">
      {stories.map((story, i) => {
        const isEven = i % 2 === 0
        return (
          <div
            key={story.title}
            ref={(el) => { itemRefs.current[i] = el }}
            className={`flex flex-col md:flex-row items-stretch min-h-[80vh] ${
              isEven ? "" : "md:flex-row-reverse"
            }`}
          >
            {/* Image side */}
            <div className="cert-img relative w-full md:w-1/2 min-h-[50vh] md:min-h-full will-change-transform">
              <Image
                src={story.img}
                alt={story.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Text side */}
            <div className="cert-text w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-16 md:py-24 bg-[--color-bg] will-change-transform">
              <span className="text-xs font-semibold tracking-widest text-[--color-accent] uppercase mb-3">
                {story.badge}
              </span>

              {/* Heading row — with optional SpaghettiIce alongside */}
              <div className={`flex items-center gap-4 mb-5 ${story.showSpaghetti ? "justify-between" : ""}`}>
                <h2
                  className="font-serif text-[--color-text] leading-tight"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
                >
                  {story.title}
                </h2>
                {story.showSpaghetti && (
                  <div className="shrink-0 w-[140px] h-[180px]">
                    <SpaghettiIce />
                  </div>
                )}
              </div>

              <p className="text-[--color-text-muted] text-base md:text-lg leading-relaxed max-w-md">
                {story.text}
              </p>
              {story.cta && (
                <Link
                  href={story.cta.href}
                  className="mt-8 inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-[--color-accent] text-[--color-accent] font-semibold text-sm hover:bg-[--color-accent] hover:text-white w-fit"
                  style={{ transition: "background-color 0.3s, color 0.3s" }}
                >
                  {story.cta.label} →
                </Link>
              )}
            </div>
          </div>
        )
      })}
    </section>
  )
}
