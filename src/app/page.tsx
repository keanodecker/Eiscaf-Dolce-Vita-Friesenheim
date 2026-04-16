import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import IceCreamAnimation from "@/components/IceCreamAnimation";
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
        <IceCreamAnimation />
        <MenuSection />
        <GallerySection />
        <OpeningHours />
      </main>
      <Footer />
    </>
  );
}
