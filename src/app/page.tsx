import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AnimationPlaceholder from "@/components/AnimationPlaceholder";
import MenuSection from "@/components/MenuSection";
import GallerySection from "@/components/GallerySection";
import OpeningHours from "@/components/OpeningHours";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <AnimationPlaceholder />
        <MenuSection />
        <GallerySection />
        <OpeningHours />
      </main>
      <Footer />
    </>
  );
}
