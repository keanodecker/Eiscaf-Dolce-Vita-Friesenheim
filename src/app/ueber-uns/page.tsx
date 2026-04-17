"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap, ScrollTrigger } from "@/lib/gsap"

const timeline = [
  {
    year: "1987",
    title: "Die Gründung",
    text: "Giuseppe Ferraro eröffnet das Eiscafé Dolce Vita in der Hauptstraße 42. Mit einem Holzofen, fünf Sorten Eis und einem Traum vom besten Gelato in der Region.",
  },
  {
    year: "1994",
    title: "Familie wächst",
    text: "Die nächste Generation tritt ein. Maria und Antonio erweitern das Sortiment um regionale Früchte und bringen neue Ideen aus Italien mit.",
  },
  {
    year: "2003",
    title: "Umbau & Neustart",
    text: "Das Café wird liebevoll renoviert. Die offene Theke entsteht — damit unsere Gäste zusehen können, wie ihr Eis entsteht.",
  },
  {
    year: "2015",
    title: "Auszeichnung",
    text: "Eiscafé Dolce Vita wird als eines der besten Eiscafés in Baden-Württemberg ausgezeichnet. Eine Bestätigung für 28 Jahre Leidenschaft.",
  },
  {
    year: "Heute",
    title: "Drei Generationen",
    text: "Heute führen wir das Café in dritter Generation weiter. Die Rezepte sind dieselben. Die Leidenschaft auch.",
  },
]

const values = [
  {
    icon: "🌿",
    title: "Regionale Zutaten",
    text: "Wir arbeiten mit lokalen Bauern und Produzenten zusammen. Was in der Region wächst, landet in unserem Eis.",
  },
  {
    icon: "👐",
    title: "Echte Handarbeit",
    text: "Kein Fertigmix. Kein Industrieeis. Jede Sorte wird täglich von Hand zubereitet — nach überlieferten Familienrezepten.",
  },
  {
    icon: "💛",
    title: "Mit Herz dabei",
    text: "Wir kennen unsere Stammgäste beim Namen. Das Eiscafé ist kein Betrieb für uns — es ist unser Zuhause.",
  },
]

export default function UeberUnsPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.from(".hero-headline", {
        y: 60, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: heroRef.current, start: "top 80%" } as ScrollTrigger.Vars,
      })
      gsap.from(".hero-sub", {
        y: 40, opacity: 0, duration: 0.9, delay: 0.2, ease: "power2.out",
        scrollTrigger: { trigger: heroRef.current, start: "top 80%" } as ScrollTrigger.Vars,
      })
      gsap.from(".timeline-item", {
        x: -50, opacity: 0, stagger: 0.15, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: timelineRef.current, start: "top 80%" } as ScrollTrigger.Vars,
      })
      gsap.from(".value-card", {
        y: 50, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: valuesRef.current, start: "top 80%" } as ScrollTrigger.Vars,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Back link */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full"
          style={{ transition: "color 0.3s, background-color 0.3s" }}
        >
          ← Zurück
        </Link>
      </div>

      {/* Hero */}
      <div
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d1a0e 50%, #1a1a1a 100%)" }}
      >
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=1600&q=80"
            alt="Eiscafé Dolce Vita"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 text-center px-6 py-24">
          <p className="hero-headline text-xs font-semibold tracking-widest text-amber-400 uppercase mb-4">
            Seit 1987
          </p>
          <h1
            className="hero-headline font-serif text-white mb-6 leading-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Unsere Geschichte
          </h1>
          <p className="hero-sub text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
            Ein Familienbetrieb. Drei Generationen. Eine Leidenschaft für handgemachtes Eis.
          </p>
        </div>
      </div>

      {/* Intro */}
      <section className="py-20 px-6 bg-[--color-bg]">
        <div className="max-w-3xl mx-auto">
          <p className="text-[--color-text-muted] text-lg leading-relaxed mb-6">
            Was 1987 als kleiner Traum begann, ist heute ein fester Teil von Friesenheim. Das Eiscafé Dolce Vita steht
            für mehr als nur Eis — es steht für Gemeinschaft, Tradition und die Freude am einfachen Genuss.
          </p>
          <p className="text-[--color-text-muted] text-lg leading-relaxed">
            Täglich frisch zubereitet, mit Zutaten aus der Region, nach Rezepten, die von Generation zu Generation
            weitergegeben wurden. Kein Industrieeis. Keine Kompromisse. Nur das Beste für unsere Gäste.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-pink-50/40">
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-serif text-[--color-text] mb-16 text-center"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Unsere Geschichte
          </h2>
          <div ref={timelineRef} className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[--color-accent]/20" />
            <div className="space-y-12">
              {timeline.map(({ year, title, text }) => (
                <div key={year} className="timeline-item relative pl-20 will-change-transform">
                  <div className="absolute left-5 top-1 w-6 h-6 rounded-full bg-[--color-accent] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <p className="text-xs font-bold tracking-widest text-[--color-accent] uppercase mb-1">{year}</p>
                  <h3 className="font-serif text-xl text-[--color-text] mb-2">{title}</h3>
                  <p className="text-[--color-text-muted] leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-[--color-bg]">
        <div className="max-w-5xl mx-auto">
          <h2
            className="font-serif text-[--color-text] mb-16 text-center"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Wofür wir stehen
          </h2>
          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ icon, title, text }) => (
              <div key={title} className="value-card glass-card p-8 text-center will-change-transform">
                <span className="text-4xl block mb-4">{icon}</span>
                <h3 className="font-serif text-xl text-[--color-text] mb-3">{title}</h3>
                <p className="text-[--color-text-muted] text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team image */}
      <section className="py-20 px-6 bg-pink-50/40">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden" style={{ height: "clamp(280px, 40vw, 520px)" }}>
            <div className="relative w-full h-full">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=85"
                alt="Das Team des Eiscafé Dolce Vita"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <p className="text-white font-serif text-2xl">Die Familie Ferraro</p>
                <p className="text-white/70 text-sm mt-1">Drei Generationen. Eine Leidenschaft.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[--color-bg] text-center">
        <h2 className="font-serif text-[--color-text] mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}>
          Besuche uns
        </h2>
        <p className="text-[--color-text-muted] mb-8 text-lg">
          Hauptstraße 42 · 77948 Friesenheim<br />
          Di–Fr 11–20 Uhr · Sa–So 10–21 Uhr
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/4915202156548"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold"
            style={{ backgroundColor: "#25D366", transition: "opacity 0.3s" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp schreiben
          </a>
          <Link
            href="/#oeffnungszeiten"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-[--color-accent] text-[--color-accent] hover:bg-[--color-accent] hover:text-white"
            style={{ transition: "background-color 0.3s, color 0.3s" }}
          >
            Öffnungszeiten ansehen →
          </Link>
        </div>
      </section>
    </>
  )
}
