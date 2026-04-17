import Link from "next/link"
import GalleryFilter from "@/components/GalleryFilter"

export const metadata = {
  title: "Galerie – Eiscafé Dolce Vita Friesenheim",
  description: "Fotos aus unserem Eiscafé: Eis, Süßes und Getränke.",
}

export default function GaleriePage() {
  return (
    <>
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[--color-text-muted] hover:text-[--color-accent] bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-black/5"
          style={{ transition: "color 0.3s" }}
        >
          ← Zurück
        </Link>
      </div>

      <div className="pt-24 pb-4 px-6 text-center bg-[--color-bg]">
        <p className="text-xs font-semibold tracking-widest text-[--color-accent] uppercase mb-3">
          Einblicke
        </p>
        <h1
          className="font-serif text-[--color-text]"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          Unsere Galerie
        </h1>
      </div>

      <GalleryFilter preview={false} />
    </>
  )
}
