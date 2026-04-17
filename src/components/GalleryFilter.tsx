"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap, ScrollTrigger } from "@/lib/gsap"

type Category = "alle" | "eis" | "suesses" | "getraenke"

interface GalleryImage {
  src: string
  alt: string
  category: Category
  tall?: boolean
}

const allImages: GalleryImage[] = [
  // Eis
  { src: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=900&q=80", alt: "Buntes Eis in der Auslage", category: "eis", tall: true },
  { src: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=900&q=80", alt: "Eiskugeln auf der Waffel", category: "eis", tall: false },
  { src: "https://images.unsplash.com/photo-1543353071-873f17a7a088?w=900&q=80", alt: "Bunte Eissorten", category: "eis", tall: false },
  { src: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=900&q=80", alt: "Softeis mit Toppings", category: "eis", tall: true },
  { src: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=900&q=80", alt: "Eisdiele Atmosphäre", category: "eis", tall: false },
  { src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=900&q=80", alt: "Gelato Kugeln", category: "eis", tall: false },
  // Süßes
  { src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=900&q=80", alt: "Frische Waffeln", category: "suesses", tall: true },
  { src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&q=80", alt: "Schokoladentorte", category: "suesses", tall: false },
  { src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=900&q=80", alt: "Süße Desserts", category: "suesses", tall: false },
  { src: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=900&q=80", alt: "Eiswaffel mit Beeren", category: "suesses", tall: true },
  // Getränke
  { src: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&q=80", alt: "Erfrischende Getränke", category: "getraenke", tall: false },
  { src: "https://images.unsplash.com/photo-1518349619113-03114f06ac3a?w=900&q=80", alt: "Eiskaltes Getränk", category: "getraenke", tall: true },
  { src: "https://images.unsplash.com/photo-1560508200-57785e9f95bc?w=900&q=80", alt: "Frische Limonade", category: "getraenke", tall: false },
]

const FILTERS: { key: Category; label: string }[] = [
  { key: "alle", label: "Alle" },
  { key: "eis", label: "🍦 Eis" },
  { key: "suesses", label: "🍰 Süßes" },
  { key: "getraenke", label: "🥤 Getränke" },
]

interface GalleryFilterProps {
  preview?: boolean
}

export default function GalleryFilter({ preview = false }: GalleryFilterProps) {
  const [activeFilter, setActiveFilter] = useState<Category>("alle")
  const gridRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const displayImages = preview ? allImages.slice(0, 12) : allImages

  const handleFilter = useCallback((category: Category) => {
    if (!gridRef.current) return
    setActiveFilter(category)

    const items = [...gridRef.current.querySelectorAll<HTMLElement>(".gf-item")]
    if (!items.length) return

    gsap.killTweensOf(items)

    const toHide = items.filter(
      (el) => category !== "alle" && el.dataset.category !== category
    )
    const toShow = items.filter(
      (el) => category === "alle" || el.dataset.category === category
    )

    const tl = gsap.timeline()

    if (toHide.length > 0) {
      tl.to(toHide, { opacity: 0, scale: 0.88, duration: 0.22, ease: "power1.in" })
    }

    tl.call(() => {
      toHide.forEach((el) => (el.style.display = "none"))
      toShow.forEach((el) => {
        if (el.style.display === "none") {
          el.style.display = "block"
          gsap.set(el, { opacity: 0, scale: 0.92 })
        }
      })
    })

    tl.to(toShow, { opacity: 1, scale: 1, duration: 0.32, ease: "power2.out", stagger: 0.04 })
  }, [])

  // Initial scroll-reveal
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.from(".gf-item", {
        y: 60, opacity: 0, scale: 0.94,
        stagger: { amount: 0.7, from: "start" },
        duration: 0.8, ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          once: true,
        } as ScrollTrigger.Vars,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="galerie" className="py-[100px] px-6 bg-[--color-bg]">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest text-[--color-accent] uppercase mb-3">
            {preview ? "Galerie Vorschau" : "Unsere Galerie"}
          </p>
          <h2 className="font-serif text-[--color-text]" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            {preview ? "Einblicke" : "Alle Fotos"}
          </h2>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleFilter(key)}
              className={`px-5 py-2 rounded-full text-sm font-medium border cursor-pointer ${
                activeFilter === key
                  ? "bg-[--color-accent] text-white border-[--color-accent]"
                  : "bg-white text-[--color-text-muted] border-black/10 hover:border-[--color-accent] hover:text-[--color-accent]"
              }`}
              style={{ transition: "background-color 0.2s, color 0.2s, border-color 0.2s" }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div ref={gridRef} className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
          {displayImages.map((img) => (
            <div
              key={img.src}
              className={`gf-item relative overflow-hidden rounded-2xl break-inside-avoid will-change-transform ${
                img.tall ? "h-80" : "h-56"
              }`}
              data-category={img.category}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* View all link (preview only) */}
        {preview && (
          <div className="text-center mt-12">
            <Link
              href="/galerie"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-[--color-accent] text-[--color-accent] font-semibold text-sm hover:bg-[--color-accent] hover:text-white"
              style={{ transition: "background-color 0.3s, color 0.3s" }}
            >
              Alle Fotos ansehen →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
