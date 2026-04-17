"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

// 9 strand paths from press holes (y≈130) down to the bowl (y≈295)
// Each strand is a slightly different wavy cubic bezier
const STRANDS = [
  "M 93,130 C 90,158 96,182 92,208 C 88,230 93,258 91,280 C 90,288 91,294 92,296",
  "M 106,130 C 110,159 103,183 107,209 C 111,231 106,259 108,281 C 109,289 107,295 106,296",
  "M 119,130 C 116,160 122,184 118,210 C 114,232 119,260 116,282 C 115,290 117,295 119,296",
  "M 132,130 C 136,161 129,185 133,211 C 137,233 132,261 135,283 C 136,291 133,295 132,296",
  "M 145,130 C 142,162 148,186 144,212 C 140,234 145,262 142,284 C 141,292 143,295 145,296",
  "M 158,130 C 162,163 155,187 159,213 C 163,235 158,263 161,285 C 162,293 159,295 158,296",
  "M 171,130 C 168,164 174,188 170,214 C 166,236 171,264 168,286 C 167,294 169,295 171,296",
  "M 184,130 C 188,165 181,189 185,215 C 189,237 184,265 187,287 C 188,295 185,296 184,296",
  "M 197,130 C 194,166 200,190 196,216 C 192,238 197,266 194,288 C 193,296 195,296 197,296",
]

export default function SpaghettiIce() {
  const svgRef = useRef<SVGSVGElement>(null)
  const pressRef = useRef<SVGGElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    const press = pressRef.current
    if (!svg || !press) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const strands = Array.from(svg.querySelectorAll<SVGPathElement>(".sp-strand"))

    // Set up dash-offset for each strand
    strands.forEach((s) => {
      const len = s.getTotalLength()
      gsap.set(s, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 })
    })

    // Press bob up-down
    gsap.to(press, {
      y: 28,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    })

    // Each strand draws itself down, pauses, then resets — looping
    const cycleDuration = 2.2
    const resetDelay = 0.6

    strands.forEach((s, i) => {
      const len = s.getTotalLength()
      const delay = i * 0.11

      const tl = gsap.timeline({ repeat: -1, delay })
      // Draw strand down (offset: len → 0)
      tl.to(s, { strokeDashoffset: 0, duration: cycleDuration, ease: "power1.inOut" })
        // Hold briefly
        .to(s, { opacity: 0.3, duration: 0.4, ease: "power2.in" })
        // Reset for next cycle
        .set(s, { strokeDashoffset: len, opacity: 1 })
        .to(s, {}, `+=${resetDelay}`) // pause before repeating
    })

    // Gentle whole-section float
    gsap.to(svgRef.current, {
      y: -10,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    return () => {
      gsap.killTweensOf([press, svgRef.current, ...strands])
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #fff8f3 0%, #fef3ff 100%)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* Text side */}
        <div className="md:w-1/2 text-center md:text-left">
          <p className="text-xs font-semibold tracking-widest text-[--color-accent] uppercase mb-4">
            Das Original
          </p>
          <h2
            className="font-serif text-[--color-text] mb-5 leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
          >
            Spaghettieis — <br className="hidden md:block" />
            Seit 1969 ein Klassiker
          </h2>
          <p className="text-[--color-text-muted] text-base md:text-lg leading-relaxed mb-6">
            Erfunden in Mannheim, geliebt in ganz Deutschland. Vanilleeis wird durch eine
            Spätzle-Presse gedrückt, sieht aus wie Spaghetti — und schmeckt wie Kindheit.
          </p>
          <p className="text-[--color-text-muted] text-base md:text-lg leading-relaxed">
            Bei uns gibt es Spaghettieis natürlich nach dem Originalrezept: mit frischer
            Erdbeersauce und echter Sahne.
          </p>
        </div>

        {/* Animation side */}
        <div className="md:w-1/2 flex justify-center">
          <svg
            ref={svgRef}
            viewBox="0 0 290 370"
            width="290"
            height="370"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Spaghettieis Animation"
            style={{ willChange: "transform", overflow: "visible" }}
          >
            {/* ── Bowl ── */}
            {/* Bowl body */}
            <path
              d="M 40,295 Q 40,345 145,345 Q 250,345 250,295 L 250,295"
              fill="#FBE8C8"
              stroke="#E8C98A"
              strokeWidth="2"
            />
            {/* Bowl rim ellipse */}
            <ellipse cx="145" cy="295" rx="105" ry="18" fill="#FBE8C8" stroke="#E8C98A" strokeWidth="1.5" />

            {/* ── Ice cream pile (vanilla base) ── */}
            <ellipse cx="145" cy="287" rx="90" ry="14" fill="#FFF5DC" />
            <ellipse cx="145" cy="280" rx="80" ry="10" fill="#FFF8EE" />

            {/* ── Strawberry sauce drips ── */}
            <path
              d="M 80,280 Q 88,290 80,295 Q 76,302 80,308"
              fill="none" stroke="#E84A7A" strokeWidth="3" strokeLinecap="round" opacity="0.9"
            />
            <path
              d="M 100,278 Q 108,286 104,293 Q 101,300 105,306"
              fill="none" stroke="#E84A7A" strokeWidth="2.5" strokeLinecap="round" opacity="0.8"
            />
            <path
              d="M 175,279 Q 183,287 179,294 Q 176,301 180,307"
              fill="none" stroke="#E84A7A" strokeWidth="2.5" strokeLinecap="round" opacity="0.8"
            />
            <path
              d="M 200,281 Q 208,289 204,297"
              fill="none" stroke="#E84A7A" strokeWidth="3" strokeLinecap="round" opacity="0.85"
            />
            {/* Sauce pool on top of pile */}
            <path
              d="M 72,280 Q 100,270 145,272 Q 190,270 218,280"
              fill="none" stroke="#E84A7A" strokeWidth="3.5" strokeLinecap="round" opacity="0.7"
            />

            {/* ── Whipped cream blobs ── */}
            <ellipse cx="110" cy="276" rx="14" ry="9" fill="white" opacity="0.9" />
            <ellipse cx="145" cy="271" rx="16" ry="10" fill="white" opacity="0.95" />
            <ellipse cx="180" cy="276" rx="14" ry="9" fill="white" opacity="0.9" />

            {/* ── Spaghetti strands ── */}
            {STRANDS.map((d, i) => (
              <path
                key={i}
                className="sp-strand"
                d={d}
                fill="none"
                stroke={i % 3 === 0 ? "#FEF3C7" : i % 3 === 1 ? "#FDE68A" : "#FEF9EE"}
                strokeWidth={2.8}
                strokeLinecap="round"
              />
            ))}

            {/* ── Press machine ── */}
            <g ref={pressRef}>
              {/* Cylinder/handle */}
              <rect x="118" y="28" width="54" height="70" rx="5" fill="#CDCDCD" stroke="#AAAAAA" strokeWidth="1.5" />
              {/* Highlight on handle */}
              <rect x="122" y="31" width="18" height="64" rx="3" fill="#E2E2E2" opacity="0.6" />
              {/* Handle grip rings */}
              {[46, 58, 70].map((y) => (
                <rect key={y} x="118" y={y} width="54" height="6" rx="1" fill="#BBBBBB" stroke="#AAAAAA" strokeWidth="0.8" />
              ))}

              {/* Press head — wider plate */}
              <rect x="68" y="98" width="154" height="26" rx="6" fill="#C8C8C8" stroke="#AAAAAA" strokeWidth="1.5" />
              {/* Top sheen */}
              <rect x="71" y="101" width="148" height="10" rx="4" fill="#DCDCDC" />
              {/* Bottom edge shadow */}
              <rect x="68" y="116" width="154" height="8" rx="0" fill="#B0B0B0" opacity="0.5" />

              {/* Holes in press plate — match strand x positions */}
              {[93, 106, 119, 132, 145, 158, 171, 184, 197].map((x) => (
                <circle key={x} cx={x} cy={111} r="3" fill="#888" />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}
