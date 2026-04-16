"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  useScroll,
  useTransform,
  useSpring,
  motion,
  useMotionValue,
  animate,
} from "framer-motion";
import { useEffect } from "react";

// ─── Tuning reference ────────────────────────────────────────────────────────
// Scroll ranges: [inputMin, inputMax] map to the output value range.
// E.g. green scoop x: scroll 0.15→0.40 maps -600px → -110px
//
// Bounce offsets: defined per scoop below (bounceY / bounceX).
// Wiggle: final rotate loop, degrees set in wiggleVariants.
// Float: waffel bob amplitude in floatVariants (y values).
// ─────────────────────────────────────────────────────────────────────────────

const SPRING = { stiffness: 100, damping: 20 };

export default function IceCreamAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ── Waffel float (CSS animation via Framer Motion animate loop) ──
  const waffelY = useMotionValue(0);
  useEffect(() => {
    const ctrl = animate(waffelY, [0, -12, 0], {
      duration: 2.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    });
    return () => ctrl.stop();
  }, [waffelY]);

  // ── Green scoop (from left) ──
  const greenXRaw = useTransform(scrollYProgress, [0.15, 0.4], [-600, -110]);
  const greenYRaw = useTransform(scrollYProgress, [0.15, 0.4], [200, -180]);
  const greenOpacity = useTransform(scrollYProgress, [0.15, 0.28], [0, 1]);
  const greenX = useSpring(greenXRaw, SPRING);
  const greenY = useSpring(greenYRaw, SPRING);

  // ── Red scoop (from right) ──
  const redXRaw = useTransform(scrollYProgress, [0.4, 0.65], [600, 100]);
  const redYRaw = useTransform(scrollYProgress, [0.4, 0.65], [200, -200]);
  const redOpacity = useTransform(scrollYProgress, [0.4, 0.53], [0, 1]);
  const redX = useSpring(redXRaw, SPRING);
  const redY = useSpring(redYRaw, SPRING);

  // ── White scoop (from top) ──
  const whiteXRaw = useTransform(scrollYProgress, [0.65, 0.85], [-10, -10]);
  const whiteYRaw = useTransform(scrollYProgress, [0.65, 0.85], [-600, -340]);
  const whiteOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  const whiteX = useSpring(whiteXRaw, SPRING);
  const whiteY = useSpring(whiteYRaw, SPRING);

  // ── Finale text fade-in ──
  const textOpacity = useTransform(scrollYProgress, [0.87, 0.97], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.87, 0.97], [30, 0]);

  // ── Wiggle (final assembled ice cream) ──
  const wiggleOpacity = useTransform(scrollYProgress, [0.84, 0.9], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "250vh" }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-pink-50 to-orange-50 flex flex-col items-center justify-center">

        {/* ── Ice cream assembly stage ── */}
        <div className="relative flex items-end justify-center"
             style={{ width: "clamp(260px, 65vw, 380px)", height: "clamp(260px, 65vw, 380px)" }}>

          {/* Waffel — always visible, floating */}
          <motion.div
            className="absolute bottom-0 left-1/2"
            style={{
              x: "-50%",
              y: waffelY,
            }}
          >
            <Image
              src="/eis/waffel.png"
              alt="Eiswaffel"
              width={220}
              height={260}
              className="w-[clamp(140px,36vw,220px)] h-auto drop-shadow-xl"
              priority
            />
          </motion.div>

          {/* Green scoop — from left */}
          <motion.div
            className="absolute bottom-0 left-1/2"
            style={{
              x: greenX,
              y: greenY,
              opacity: greenOpacity,
            }}
          >
            <motion.div
              // Bounce when it lands
              animate={undefined}
              whileInView={undefined}
            >
              <Image
                src="/eis/kugel-gruen.png"
                alt="Pistazie-Kugel"
                width={180}
                height={180}
                className="w-[clamp(100px,28vw,180px)] h-auto drop-shadow-lg"
              />
            </motion.div>
          </motion.div>

          {/* Red scoop — from right */}
          <motion.div
            className="absolute bottom-0 left-1/2"
            style={{
              x: redX,
              y: redY,
              opacity: redOpacity,
            }}
          >
            <Image
              src="/eis/kugel-rot.png"
              alt="Erdbeere-Kugel"
              width={180}
              height={180}
              className="w-[clamp(100px,28vw,180px)] h-auto drop-shadow-lg"
            />
          </motion.div>

          {/* White scoop — from above + wiggle at finale */}
          <motion.div
            className="absolute bottom-0 left-1/2"
            style={{
              x: whiteX,
              y: whiteY,
              opacity: whiteOpacity,
            }}
          >
            <motion.div
              style={{ opacity: wiggleOpacity }}
              animate={{ rotate: [-3, 3, -3] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <Image
                src="/eis/kugel-weiss.png"
                alt="Vanille-Kugel"
                width={180}
                height={180}
                className="w-[clamp(100px,28vw,180px)] h-auto drop-shadow-lg"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Finale text ── */}
        <motion.div
          className="mt-12 text-center px-6"
          style={{ opacity: textOpacity, y: textY }}
        >
          <h2
            className="font-serif text-[--color-text] mb-3"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Wähle deinen Lieblingsgeschmack
          </h2>
          <p className="text-[--color-text-muted] text-base md:text-lg mb-8">
            Täglich frisch — handgemacht mit Liebe
          </p>
          <a
            href="#speisekarte"
            className="inline-block px-8 py-4 rounded-full bg-[--color-accent] text-white text-sm font-medium tracking-wide hover:opacity-90 transition-all duration-300 shadow-md"
          >
            Zur Speisekarte
          </a>
        </motion.div>

      </div>
    </section>
  );
}
