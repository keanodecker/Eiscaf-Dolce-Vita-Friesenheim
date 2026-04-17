"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap, ScrollTrigger } from "@/lib/gsap"

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=900&q=80",
    alt: "Bunte Eiskugeln in der Auslage",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=900&q=80",
    alt: "Eiskugeln auf einer Waffel",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=900&q=80",
    alt: "Eisdiele Atmosphäre",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=900&q=80",
    alt: "Softeis mit Toppings",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1518349619113-03114f06ac3a?w=900&q=80",
    alt: "Eisbecher Nahaufnahme",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=900&q=80",
    alt: "Bunte Eisstiele",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=900&q=80",
    alt: "Gelato-Theke",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1567206563114-c179706e76a3?w=900&q=80",
    alt: "Eisbecher mit Sahne",
    tall: false,
  },
]

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const ctx = gsap.context(() => {
      if (!reduced) {
        // Character stagger for title
        gsap.from(".gallery-char", {
          opacity: 0,
          y: 50,
          stagger: 0.05,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          } as ScrollTrigger.Vars,
        })

        // Grid items stagger
        gsap.from(".gallery-item", {
          y: 80,
          opacity: 0,
          scale: 0.95,
          stagger: 0.08,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          } as ScrollTrigger.Vars,
        })
      }
    }, sectionRef)

    // GSAP hover — event listeners need manual cleanup
    const items = [...(gridRef.current?.querySelectorAll<HTMLElement>(".gallery-item") ?? [])]
    type Handler = { item: HTMLElement; enter: () => void; leave: () => void }
    const handlers: Handler[] = items.map((item) => {
      const enter = () => gsap.to(item, { scale: 1.04, duration: 0.3, ease: "power2.out" })
      const leave = () => gsap.to(item, { scale: 1, duration: 0.3, ease: "power2.out" })
      item.addEventListener("mouseenter", enter)
      item.addEventListener("mouseleave", leave)
      return { item, enter, leave }
    })

    return () => {
      ctx.revert()
      handlers.forEach(({ item, enter, leave }) => {
        item.removeEventListener("mouseenter", enter)
        item.removeEventListener("mouseleave", leave)
      })
    }
  }, [])

  return (
    <section id="galerie" ref={sectionRef} className="py-[120px] px-6 bg-[--color-bg]">
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="font-serif text-center mb-16 text-[--color-text]"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          aria-label="Einblicke"
        >
          {"Einblicke".split("").map((char, i) => (
            <span key={i} className="gallery-char inline-block">
              {char}
            </span>
          ))}
        </h2>

        <div
          ref={gridRef}
          className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3"
        >
          {galleryImages.map((img) => (
            <div
              key={img.src}
              className={`gallery-item relative overflow-hidden rounded-2xl break-inside-avoid will-change-transform ${
                img.tall ? "h-80" : "h-56"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
