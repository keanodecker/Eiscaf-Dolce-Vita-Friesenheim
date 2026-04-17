import Navigation from "@/components/Navigation"
import HeroSection from "@/components/HeroSection"
import GallerySection from "@/components/GallerySection"
import AboutSection from "@/components/AboutSection"
import StorySection from "@/components/StorySection"
import OpeningHours from "@/components/OpeningHours"
import HorizontalScroll from "@/components/HorizontalScroll"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <GallerySection />
        <AboutSection />
        <StorySection />
        <OpeningHours />
        <HorizontalScroll />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
