import { Hero, Pricing, Section } from "@/components/LandingPage";
import Footer from "@/components/LandingPage/Footer";
import Testinomials from "@/components/LandingPage/Testinomials";

const Home = () => {
  return (
    <div>
      <Hero />
      <Section />
      <Pricing />
      <Testinomials />
      <Footer />
    </div>
  );
};

export default Home;
