"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap, ScrollTrigger } from "@/lib/gsap"

interface StoryItem {
  img: string
  alt: string
  title: string
  text: string
}

const stories: StoryItem[] = [
  {
    img: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=1200&q=80",
    alt: "Frische Eiszutaten",
    title: "Frische Zutaten jeden Morgen",
    text: "Wir beziehen unsere Zutaten täglich von lokalen Produzenten und saisonalen Märkten. Nur was wirklich frisch ist, kommt in unsere Eismaschinen — kein Kompromiss.",
  },
  {
    img: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=1200&q=80",
    alt: "Vielfältige Eissorten",
    title: "Über 30 Sorten im Sommer",
    text: "Von klassischer Vanille bis zur exotischen Passionsfrucht — unsere Kreationen wechseln mit den Jahreszeiten. Entdecke immer wieder neue Lieblingsgeschmäcker.",
  },
  {
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1200&q=80",
    alt: "Familientradition seit 1987",
    title: "Seit 1987 in der Familie",
    text: "Giovanni Ferretti brachte die Kunst des Gelatos 1987 aus Neapel nach Friesenheim. Heute führt seine Tochter die Tradition fort — mit denselben Originalrezepten.",
  },
  {
    img: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=1200&q=80",
    alt: "Handgemachte Eisherstellung",
    title: "Handgemacht mit Liebe",
    text: "Jede Kugel wird von Hand geformt. Jede Mischung per Hand gerührt. Keine Maschine der Welt ersetzt das Gespür für den richtigen Moment — das wissen wir seit Generationen.",
  },
]

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const isEven = i % 2 === 0
        const imgWrap = el.querySelector<HTMLElement>(".story-img")
        const textWrap = el.querySelector<HTMLElement>(".story-text")
        if (!imgWrap || !textWrap) return

        const xOffset = isMobile ? 0 : 80

        const trigger: ScrollTrigger.Vars = {
          trigger: el,
          start: "top 80%",
          end: "bottom 20%",
          scrub: isMobile || reduced ? false : 2,
          once: isMobile || reduced,
        }

        gsap.fromTo(
          imgWrap,
          { x: reduced ? 0 : isEven ? -xOffset : xOffset, opacity: 0 },
          { x: 0, opacity: 1, ease: "power2.out", duration: 1, scrollTrigger: trigger }
        )

        gsap.fromTo(
          textWrap,
          { x: reduced ? 0 : isEven ? xOffset : -xOffset, opacity: 0 },
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
            className={`flex flex-col md:flex-row items-stretch min-h-[100vh] ${
              isEven ? "" : "md:flex-row-reverse"
            }`}
          >
            {/* Image */}
            <div className="story-img relative w-full md:w-1/2 min-h-[50vh] md:min-h-full will-change-transform">
              <Image
                src={story.img}
                alt={story.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Text */}
            <div className="story-text w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-16 md:py-24 bg-[--color-bg] will-change-transform">
              <h2
                className="font-serif text-[--color-text] mb-6 leading-tight"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                {story.title}
              </h2>
              <p className="text-[--color-text-muted] text-base md:text-lg leading-relaxed max-w-md">
                {story.text}
              </p>
            </div>
          </div>
        )
      })}
    </section>
  )
}
