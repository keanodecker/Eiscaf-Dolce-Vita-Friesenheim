interface HoursRow {
  days: string;
  hours: string;
}

const hours: HoursRow[] = [
  { days: "Montag – Freitag", hours: "11:00 – 20:00 Uhr" },
  { days: "Samstag – Sonntag", hours: "10:00 – 21:00 Uhr" },
  { days: "Feiertags", hours: "12:00 – 19:00 Uhr" },
];

export default function OpeningHours() {
  return (
    <section id="oeffnungszeiten" className="py-[120px] px-6 bg-pink-50/40">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title font-serif">Öffnungszeiten</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hours Card */}
          <div className="glass-card p-10">
            <h3 className="font-serif text-xl text-[--color-text] mb-8 flex items-center gap-3">
              <span>🕐</span> Wir sind für dich da
            </h3>
            <ul className="space-y-6">
              {hours.map(({ days, hours: time }) => (
                <li
                  key={days}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-black/5 pb-5 last:border-0 last:pb-0"
                >
                  <span className="text-sm text-[--color-text-muted] font-medium">
                    {days}
                  </span>
                  <span className="text-sm font-semibold text-[--color-text]">
                    {time}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-black/5">
              <p className="text-xs text-[--color-text-muted]">
                * Saisonale Abweichungen möglich. Bitte folge uns auf Instagram
                für aktuelle Infos.
              </p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-100 rounded-2xl flex flex-col items-center justify-center p-10 min-h-[320px] border border-gray-200">
            <span className="text-5xl mb-4">📍</span>
            <p className="font-serif text-xl text-[--color-text] mb-2 text-center">
              Hier findest du uns
            </p>
            <p className="text-sm text-[--color-text-muted] text-center">
              Hauptstraße 42
              <br />
              77948 Friesenheim
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block px-6 py-2.5 rounded-full bg-[--color-accent] text-white text-sm font-medium hover:opacity-90 transition-all duration-300"
            >
              In Google Maps öffnen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
