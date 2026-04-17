import Link from "next/link"

// ─── AKTUALISIEREN: Aktuelle Werte von Google Maps ablesen ───────────────────
// https://www.google.com/maps/place/Eiscafé+Dolce+Vita/@48.3750143,7.8753382
const RATING = 4.6        // ← Sternzahl anpassen
const REVIEW_COUNT = 89   // ← Anzahl Bewertungen anpassen
// ─────────────────────────────────────────────────────────────────────────────

const MAPS_URL =
  "https://www.google.com/maps/place/Eiscaf%C3%A9+Dolce+Vita/@48.3750143,7.8753382"

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? "#F59E0B" : "none"}
      stroke="#F59E0B"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

interface GoogleRatingProps {
  /** "dark" for light backgrounds, "light" for dark backgrounds */
  theme?: "dark" | "light"
}

export default function GoogleRating({ theme = "dark" }: GoogleRatingProps) {
  const fullStars = Math.floor(RATING)
  const hasHalf = RATING - fullStars >= 0.5
  const textColor = theme === "light" ? "text-white/90" : "text-[--color-text]"
  const mutedColor = theme === "light" ? "text-white/60" : "text-[--color-text-muted]"
  const borderColor = theme === "light" ? "border-white/20 hover:border-white/50" : "border-black/10 hover:border-black/20"
  const bgColor = theme === "light" ? "bg-white/10 hover:bg-white/20" : "bg-white hover:bg-gray-50"

  return (
    <Link
      href={MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border backdrop-blur-sm ${bgColor} ${borderColor}`}
      style={{ transition: "background 0.3s, border-color 0.3s" }}
      aria-label={`${RATING} von 5 Sternen · ${REVIEW_COUNT} Google Bewertungen`}
    >
      {/* Google G logo */}
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>

      {/* Stars */}
      <span className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <StarIcon key={s} filled={s <= (hasHalf ? fullStars + 1 : fullStars)} />
        ))}
      </span>

      {/* Rating + count */}
      <span className={`text-xs font-semibold ${textColor}`}>{RATING.toFixed(1)}</span>
      <span className={`text-xs ${mutedColor}`}>({REVIEW_COUNT} Bewertungen)</span>
    </Link>
  )
}
