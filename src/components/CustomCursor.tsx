"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return

    const cursor = cursorRef.current
    if (!cursor) return

    // Use GSAP xPercent/yPercent for centering so x/y don't conflict
    gsap.set(cursor, { xPercent: -50, yPercent: -100, opacity: 1 })
    document.body.style.cursor = "none"

    const onMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.18,
        ease: "power2.out",
        overwrite: true,
      })
    }

    const onEnter = () => gsap.to(cursor, { scale: 1.4, duration: 0.2, ease: "back.out(2)" })
    const onLeave = () => gsap.to(cursor, { scale: 1, duration: 0.2, ease: "power2.out" })

    const onClick = (e: MouseEvent) => {
      const scoop = document.createElement("div")
      Object.assign(scoop.style, {
        position: "fixed",
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        width: "38px",
        height: "38px",
        borderRadius: "50%",
        background: "radial-gradient(circle at 38% 32%, #86efac, #16a34a 60%, #14532d)",
        boxShadow: "inset -4px -4px 8px rgba(0,0,0,0.25), inset 2px 2px 5px rgba(255,255,255,0.3), 0 6px 16px rgba(22,163,74,0.45)",
        pointerEvents: "none",
        zIndex: "99997",
        transform: "translate(-50%, -50%) scale(0)",
      })
      document.body.appendChild(scoop)

      gsap.timeline({ onComplete: () => scoop.remove() })
        .to(scoop, { scale: 1, duration: 0.22, ease: "back.out(3)" })
        .to(scoop, { y: -60, opacity: 0, scale: 0.7, duration: 0.55, ease: "power2.in" }, "+=0.1")
    }

    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) gsap.to(cursor, { opacity: 0, duration: 0.2 })
    }
    const onIn = () => gsap.to(cursor, { opacity: 1, duration: 0.2 })

    const attachHover = () => {
      document.querySelectorAll<HTMLElement>("a, button, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", onEnter)
        el.addEventListener("mouseleave", onLeave)
      })
    }
    attachHover()

    window.addEventListener("mousemove", onMove)
    window.addEventListener("click", onClick)
    document.documentElement.addEventListener("mouseleave", onOut)
    document.documentElement.addEventListener("mouseenter", onIn)

    return () => {
      document.body.style.cursor = ""
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("click", onClick)
      document.documentElement.removeEventListener("mouseleave", onOut)
      document.documentElement.removeEventListener("mouseenter", onIn)
      document.querySelectorAll<HTMLElement>("a, button, [role='button']").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter)
        el.removeEventListener("mouseleave", onLeave)
      })
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        opacity: 0,
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        fontSize: "30px",
        lineHeight: 1,
        userSelect: "none",
        willChange: "transform",
      }}
    >
      🍦
    </div>
  )
}
