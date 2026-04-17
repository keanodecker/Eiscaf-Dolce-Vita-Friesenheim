import Navigation from "@/components/Navigation"
import HeroSection from "@/components/HeroSection"
import StorySection from "@/components/StorySection"
import HorizontalScroll from "@/components/HorizontalScroll"
import GallerySection from "@/components/GallerySection"
import MenuSection from "@/components/MenuSection"
import OpeningHours from "@/components/OpeningHours"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <StorySection />
        <GallerySection />
        <MenuSection />
        <OpeningHours />
        <HorizontalScroll />
      </main>
      <Footer />
    </>
  )
}
