"use client"

// Preise sind NUR in dieser Section sichtbar — nicht in Navigation, Hero, Galerie oder Footer.

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

interface FlavorItem {
  emoji: string
  name: string
  price: string
}

interface MenuCard {
  title: string
  subtitle: string
  flavors: FlavorItem[]
}

const menuCards: MenuCard[] = [
  {
    title: "Klassiker",
    subtitle: "Zeitlose Favoriten",
    flavors: [
      { emoji: "🤍", name: "Vanille", price: "€ 1,50" },
      { emoji: "🍫", name: "Schokolade", price: "€ 1,50" },
      { emoji: "🍓", name: "Erdbeere", price: "€ 1,50" },
      { emoji: "💚", name: "Pistazie", price: "€ 1,50" },
    ],
  },
  {
    title: "Saisonal",
    subtitle: "Frisch & Besonders",
    flavors: [
      { emoji: "🥭", name: "Mango", price: "€ 1,80" },
      { emoji: "🌿", name: "Rhabarber", price: "€ 1,80" },
      { emoji: "🌸", name: "Holunder", price: "€ 1,80" },
    ],
  },
  {
    title: "Sorbets",
    subtitle: "Fruchtig & Leicht",
    flavors: [
      { emoji: "🍋", name: "Zitrone", price: "€ 1,60" },
      { emoji: "🫐", name: "Himbeere", price: "€ 1,60" },
      { emoji: "🌺", name: "Passionsfrucht", price: "€ 1,60" },
    ],
  },
]

export default function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.from(".menu-card", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        } as ScrollTrigger.Vars,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="speisekarte"
      ref={sectionRef}
      className="menu-section py-[120px] px-6 bg-[--color-bg]"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-serif text-center mb-4 text-[--color-text]"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          Unsere Sorten
        </h2>
        <p className="text-center text-[--color-text-muted] mb-16 text-sm">
          Alles handgemacht · Täglich frisch
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {menuCards.map((card) => (
            <div key={card.title} className="menu-card glass-card p-8 will-change-transform">
              <h3 className="font-serif text-2xl text-[--color-text] mb-1">
                {card.title}
              </h3>
              <p className="text-sm text-[--color-text-muted] mb-6">{card.subtitle}</p>

              <ul className="space-y-4">
                {card.flavors.map((flavor) => (
                  <li
                    key={flavor.name}
                    className="flex items-center justify-between border-b border-black/5 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="flex items-center gap-3 text-[--color-text]">
                      <span className="text-xl">{flavor.emoji}</span>
                      <span className="text-sm font-medium">{flavor.name}</span>
                    </span>
                    <span className="text-sm font-semibold text-[--color-accent]">
                      {flavor.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
