// TODO: Replace with IceCreamAnimation.tsx using Framer Motion
// - Animate floating ice cream scoops with drag-and-drop flavor selection
// - Use framer-motion's useMotionValue + useSpring for physics-based movement
// - Each scoop color maps to a flavor from MenuSection

export default function AnimationPlaceholder() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-orange-50 px-6">
      <div className="border-2 border-dashed border-pink-300 rounded-2xl p-16 max-w-lg w-full text-center">
        <span className="text-5xl mb-6 block">🍨</span>
        <p className="text-[--color-text-muted] text-lg font-medium">
          [ Eis-Animation kommt hier ]
        </p>
      </div>
      <p className="mt-10 font-serif text-2xl md:text-3xl text-[--color-text] text-center">
        Wähle deinen Lieblingsgeschmack
      </p>
    </section>
  );
}
