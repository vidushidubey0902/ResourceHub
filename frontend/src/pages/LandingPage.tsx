import LandingHero from "../components/landing-page/LandingHero";
import LandingUsps from "../components/landing-page/LandingUsps";
import LandingHeader from "../components/landing-page/LandingHeader";
import LandingCarousel from "../components/landing-page/LandingCarousel";
import LandingParagraph from "../components/landing-page/LandingParagraph";

const LandingPage = () => {
  return (
    <>
      <LandingHeader />
      <main>
        <div className="bg-black relative z-10">
          <LandingHero />
          <LandingUsps />
        </div>
        <LandingCarousel />
        <LandingParagraph text="We give you the head start that everyone wishes they had. No more pulling your hair out of confusion, trying to find the perfect pathway. We solve that problem for you." />
      </main>
    </>
  );
};

export default LandingPage;
