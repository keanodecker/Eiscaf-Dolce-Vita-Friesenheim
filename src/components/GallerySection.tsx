import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
  tall?: boolean;
}

const galleryImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&q=80",
    alt: "Bunte Eiskugeln in der Auslage",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&q=80",
    alt: "Eiskugeln auf einer Waffel",
  },
  {
    src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80",
    alt: "Eisbecher mit frischen Früchten",
  },
  {
    src: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=800&q=80",
    alt: "Softeis mit Toppings",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800&q=80",
    alt: "Eisproduktion in der Küche",
  },
  {
    src: "https://images.unsplash.com/photo-1633933358116-a27b902fad35?w=800&q=80",
    alt: "Schokoladen-Eisbecher",
  },
];

export default function GallerySection() {
  return (
    <section id="galerie" className="py-[120px] px-6 bg-[--color-bg]">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title font-serif">Einblicke</h2>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
          {galleryImages.map((img) => (
            <div
              key={img.src}
              className={`relative overflow-hidden rounded-2xl break-inside-avoid transition-all duration-300 hover:scale-[1.03] ${
                img.tall ? "h-80" : "h-56"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
