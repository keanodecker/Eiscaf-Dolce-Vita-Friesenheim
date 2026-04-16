import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1920&q=80"
        alt="Handgemachtes Eis in der Eisdiele Milano"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 pt-[72px]">
        <h1
          className="font-serif text-white mb-6 leading-tight"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          Handgemachtes Eis
          <br />
          seit 1987
        </h1>
        <p className="text-white/90 text-lg md:text-xl mb-10 max-w-xl mx-auto font-light">
          Frische Zutaten. Klassische Rezepte. Jeden Tag neu.
        </p>
        <a
          href="#speisekarte"
          className="inline-block px-8 py-4 rounded-full border-2 border-white text-white font-medium text-sm tracking-wide hover:bg-[--color-accent] hover:border-[--color-accent] transition-all duration-300 backdrop-blur-sm bg-white/10"
        >
          Speisekarte entdecken
        </a>
      </div>
    </section>
  );
}
