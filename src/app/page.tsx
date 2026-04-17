import Navigation from "@/components/Navigation"
import HeroSection from "@/components/HeroSection"
import GallerySection from "@/components/GallerySection"
import StorySection from "@/components/StorySection"
import MenuSection from "@/components/MenuSection"
import OpeningHours from "@/components/OpeningHours"
import HorizontalScroll from "@/components/HorizontalScroll"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <GallerySection />
        <StorySection />
        <MenuSection />
        <OpeningHours />
        <HorizontalScroll />
      </main>
      <Footer />
    </>
  )
}
