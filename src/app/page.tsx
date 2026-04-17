import Navigation from "@/components/Navigation"
import HeroSection from "@/components/HeroSection"
import GoogleRatingSection from "@/components/GoogleRatingSection"
import GalleryFilter from "@/components/GalleryFilter"
import AboutSection from "@/components/AboutSection"
import CertificateStories from "@/components/CertificateStories"
import OpeningHours from "@/components/OpeningHours"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <GoogleRatingSection />
        <GalleryFilter preview />
        <AboutSection />
        <CertificateStories />
        <OpeningHours />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
