import Container from "./Container";
import FadeIn from "./FadeIn";

const LandingUsps = () => {
  return (
    <Container className="text-white text-2xl sm:text-3xl md:text-4xl xl:text-5xl leading-tight font-bold py-36 space-y-12 max-w-[992px] z-10 relative">
      <FadeIn>
        <p>
          From dev resources to blogs &ndash;&ndash; everything under one roof.
        </p>
      </FadeIn>
      <FadeIn>
        <p>Clear roadmaps to guide you through different tech stacks.</p>
      </FadeIn>
      <FadeIn>
        <p>
          Create notes to capture ideas & schedules for your unique journey.
        </p>
      </FadeIn>
      <FadeIn>
        <p>
          Connect, share knowledge, and get help from other aspiring devs, like
          you.
        </p>
      </FadeIn>
    </Container>
  );
};

export default LandingUsps;
