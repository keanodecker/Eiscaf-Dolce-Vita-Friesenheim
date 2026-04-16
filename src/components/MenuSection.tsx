interface FlavorItem {
  emoji: string;
  name: string;
  price: string;
}

interface MenuCard {
  title: string;
  subtitle: string;
  flavors: FlavorItem[];
}

const menuCards: MenuCard[] = [
  {
    title: "Klassiker",
    subtitle: "Zeitlose Favoriten",
    flavors: [
      { emoji: "🤍", name: "Vanille", price: "€ 1,50" },
      { emoji: "🍫", name: "Schokolade", price: "€ 1,50" },
      { emoji: "🍓", name: "Erdbeere", price: "€ 1,50" },
      { emoji: "💚", name: "Pistazie", price: "€ 1,50" },
    ],
  },
  {
    title: "Saisonal",
    subtitle: "Frisch & Besonders",
    flavors: [
      { emoji: "🥭", name: "Mango", price: "€ 1,80" },
      { emoji: "🌿", name: "Rhabarber", price: "€ 1,80" },
      { emoji: "🌸", name: "Holunder", price: "€ 1,80" },
    ],
  },
  {
    title: "Sorbets",
    subtitle: "Fruchtig & Leicht",
    flavors: [
      { emoji: "🍋", name: "Zitrone", price: "€ 1,60" },
      { emoji: "🫐", name: "Himbeere", price: "€ 1,60" },
      { emoji: "🌺", name: "Passionsfrucht", price: "€ 1,60" },
    ],
  },
];

export default function MenuSection() {
  return (
    <section id="speisekarte" className="py-[120px] px-6 bg-[--color-bg]">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title font-serif">Unsere Sorten</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {menuCards.map((card) => (
            <div
              key={card.title}
              className="glass-card p-8 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-serif text-2xl text-[--color-text] mb-1">
                {card.title}
              </h3>
              <p className="text-sm text-[--color-text-muted] mb-6">
                {card.subtitle}
              </p>

              <ul className="space-y-4">
                {card.flavors.map((flavor) => (
                  <li
                    key={flavor.name}
                    className="flex items-center justify-between border-b border-black/5 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="flex items-center gap-3 text-[--color-text]">
                      <span className="text-xl">{flavor.emoji}</span>
                      <span className="text-sm font-medium">{flavor.name}</span>
                    </span>
                    <span className="text-sm font-semibold text-[--color-accent]">
                      {flavor.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
