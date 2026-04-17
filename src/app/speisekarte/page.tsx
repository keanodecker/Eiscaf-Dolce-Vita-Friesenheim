import Link from "next/link"

export const metadata = {
  title: "Speisekarte – Eiscafé Dolce Vita Friesenheim",
  description: "Unsere Speisekarte: Eissorten, Eisbecher, Waffeln und Getränke.",
}

interface MenuItem {
  name: string
  desc?: string
  price: string
}

interface MenuCategory {
  title: string
  icon: string
  items: MenuItem[]
}

const menu: MenuCategory[] = [
  {
    title: "Eissorten",
    icon: "🍦",
    items: [
      { name: "Vanille", desc: "Klassisch mit Bourbon-Vanille", price: "1,50 €" },
      { name: "Schokolade", desc: "Dunkle Valrhona-Schokolade", price: "1,50 €" },
      { name: "Erdbeere", desc: "Frische Saisonerdbeeren", price: "1,50 €" },
      { name: "Pistazie", desc: "Sizilianische Pistazien", price: "1,60 €" },
      { name: "Haselnuss", desc: "Geröstete Haselnüsse aus dem Piemont", price: "1,60 €" },
      { name: "Zitrone", desc: "Frisch gepresst, cremig-fruchtig", price: "1,50 €" },
      { name: "Mango", desc: "Tropische Alphonso-Mango", price: "1,60 €" },
      { name: "Tiramisu", desc: "Mit echtem Mascarpone", price: "1,70 €" },
      { name: "Joghurt", desc: "Mild-frisch mit Früchten", price: "1,50 €" },
      { name: "Saison-Sorte", desc: "Wechselt täglich — einfach fragen!", price: "1,60 €" },
    ],
  },
  {
    title: "Eisbecher",
    icon: "🍨",
    items: [
      { name: "Dolce Vita Becher", desc: "3 Kugeln, Sahne, Waffel, Soße", price: "6,90 €" },
      { name: "Erdbeer-Traum", desc: "Erdbeeren, Vanilleeis, Sahne", price: "7,50 €" },
      { name: "Schokoladenparadies", desc: "3× Schoko, heiße Schokosauce, Sahne", price: "7,90 €" },
      { name: "Eisaffäre", desc: "Gemischte Kugeln nach Wahl, Früchte, Sahne", price: "8,20 €" },
      { name: "Kinderglück", desc: "2 Kugeln, Streuer, Waffel", price: "4,50 €" },
    ],
  },
  {
    title: "Waffeln & Süßes",
    icon: "🧇",
    items: [
      { name: "Waffel pur", desc: "Knusprig, frisch gebacken", price: "2,00 €" },
      { name: "Waffel mit 1 Kugel", price: "3,50 €" },
      { name: "Waffel mit 2 Kugeln", price: "5,00 €" },
      { name: "Crepe Natur", price: "3,50 €" },
      { name: "Crepe mit Nutella", price: "4,50 €" },
      { name: "Crepe mit Früchten", price: "5,00 €" },
    ],
  },
  {
    title: "Getränke",
    icon: "🥤",
    items: [
      { name: "Wasser (0,3 l)", price: "2,20 €" },
      { name: "Wasser (0,5 l)", price: "3,20 €" },
      { name: "Limonade", desc: "Cola, Fanta, Sprite (0,3 l)", price: "2,80 €" },
      { name: "Eiskaffee", desc: "Espresso, Vanilleeis, Sahne", price: "5,50 €" },
      { name: "Milchshake", desc: "Erdbeere, Vanille oder Schoko", price: "5,90 €" },
      { name: "Italienische Limonade", desc: "Zitrone, Minze, Sprudelwasser", price: "4,50 €" },
      { name: "Espresso", price: "2,50 €" },
      { name: "Cappuccino", price: "3,20 €" },
    ],
  },
]

export default function SpeisekartePage() {
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

      {/* Header */}
      <div
        className="pt-32 pb-14 px-6 text-center"
        style={{ background: "linear-gradient(160deg, #fff8f3 0%, #fff 100%)" }}
      >
        <p className="text-xs font-semibold tracking-widest text-[--color-accent] uppercase mb-3">
          Eiscafé Dolce Vita
        </p>
        <h1
          className="font-serif text-[--color-text] mb-4 leading-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          Speisekarte
        </h1>
        <p className="text-[--color-text-muted] text-lg max-w-md mx-auto">
          Handgemacht. Frisch. Jeden Tag.
        </p>
        <p className="text-xs text-[--color-text-muted] mt-3">
          * Alle Preise inkl. MwSt. · Saisonale Verfügbarkeit möglich.
        </p>
      </div>

      {/* Menu categories */}
      <div className="max-w-5xl mx-auto px-6 pb-24 space-y-16">
        {menu.map(({ title, icon, items }) => (
          <section key={title}>
            <div className="flex items-center gap-3 mb-8 border-b border-black/5 pb-4">
              <span className="text-3xl">{icon}</span>
              <h2
                className="font-serif text-[--color-text]"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
              >
                {title}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map(({ name, desc, price }) => (
                <div
                  key={name}
                  className="flex items-start justify-between gap-4 p-5 rounded-2xl bg-white border border-black/5 hover:border-[--color-accent]/30 hover:shadow-sm"
                  style={{ transition: "border-color 0.2s, box-shadow 0.2s" }}
                >
                  <div>
                    <p className="font-semibold text-[--color-text] text-sm">{name}</p>
                    {desc && (
                      <p className="text-xs text-[--color-text-muted] mt-0.5">{desc}</p>
                    )}
                  </div>
                  <span className="text-sm font-bold text-[--color-accent] whitespace-nowrap">
                    {price}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer note */}
      <div className="bg-pink-50/40 py-12 px-6 text-center">
        <p className="text-sm text-[--color-text-muted] mb-4">
          Fragen zur Speisekarte oder Allergene? Einfach fragen!
        </p>
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
      </div>
    </>
  )
}
