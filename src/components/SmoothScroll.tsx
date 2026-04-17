"use client"

import { useEffect, useCallback, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { ReactLenis, useLenis } from "lenis/react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

function GSAPBridge() {
  const onScroll = useCallback(() => ScrollTrigger.update(), [])
  const lenis = useLenis(onScroll)

  // Reset to top on every page navigation
  const pathname = usePathname()
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true })
  }, [pathname, lenis])

  useEffect(() => {
    if (!lenis) return
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => gsap.ticker.remove(raf)
  }, [lenis])

  return null
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        autoRaf: false,
      }}
    >
      <GSAPBridge />
      {children}
    </ReactLenis>
  )
}
