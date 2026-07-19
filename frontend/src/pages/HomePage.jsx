import Hero from "../components/layout/Hero";
import Features from "../components/layout/Features";
import HowItWorks from "../components/layout/HowItWorks";
import About from "../components/layout/About";
import Footer from "../components/layout/Footer";

export default function HomePage() {
  return (
   <>
      <Hero />
      <Features />
      <HowItWorks />
      <About />
      <Footer />
    </>
  );
}