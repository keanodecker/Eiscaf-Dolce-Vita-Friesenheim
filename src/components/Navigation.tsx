"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "@/lib/gsap"

const navLinks = [
  { href: "#galerie", label: "Galerie" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "#oeffnungszeiten", label: "Öffnungszeiten" },
  { href: "#kontakt", label: "Kontakt" },
]

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, { y: -80, opacity: 0, duration: 1, ease: "power3.out" })
      gsap.from(".nav-link", {
        opacity: 0, y: -16, stagger: 0.1, duration: 0.6, delay: 0.5, ease: "power2.out",
      })
    }, navRef)
    return () => ctx.revert()
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/20 ${
        scrolled ? "bg-white/70 backdrop-blur-2xl shadow-sm" : "bg-white/60 backdrop-blur-xl"
      }`}
      style={{ transition: "background 0.3s, box-shadow 0.3s" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-[72px]">
        <Link
          href="/"
          className="font-serif text-xl font-bold text-[--color-text] hover:text-[--color-accent]"
          style={{ transition: "color 0.3s" }}
        >
          🍦 Eiscafé Dolce Vita
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="nav-link relative text-sm font-medium text-[--color-text-muted] hover:text-[--color-accent] group"
                style={{ transition: "color 0.3s" }}
              >
                {label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[--color-accent] group-hover:w-full"
                  style={{ transition: "width 0.3s" }}
                />
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 cursor-pointer"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menü öffnen"
        >
          <span className="block w-6 h-0.5 bg-[--color-text]" style={{ transition: "transform 0.3s", transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" }} />
          <span className="block w-6 h-0.5 bg-[--color-text]" style={{ transition: "opacity 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span className="block w-6 h-0.5 bg-[--color-text]" style={{ transition: "transform 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none" }} />
        </button>
      </div>

      <div
        className="md:hidden overflow-hidden"
        style={{ maxHeight: menuOpen ? "300px" : "0", opacity: menuOpen ? 1 : 0, transition: "max-height 0.3s, opacity 0.3s" }}
      >
        <div className="bg-white/80 backdrop-blur-xl border-t border-white/20 px-6 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block text-sm font-medium text-[--color-text-muted] hover:text-[--color-accent]"
                  style={{ transition: "color 0.3s" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
