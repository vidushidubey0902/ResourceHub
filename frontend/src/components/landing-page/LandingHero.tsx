import { AiFillCode } from "react-icons/ai";
import { useScroll, useTransform, motion } from "framer-motion";

import Button from "./Button";
import Container from "./Container";
import { useRef } from "react";

const LandingHero = () => {
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: videoContainerRef,
    offset: ["start start", "end end"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);

  return (
    <div className="relative bg-black text-white">
      <motion.div
        style={{ opacity }}
        ref={videoContainerRef}
        className="absolute -top-[--header-height] left-0 w-full h-[200vh]"
      >
        <img
          src="/landing-page/carousel/c3.jpeg"
          className="sticky top-0 h-screen object-cover w-full"
        />
      </motion.div>

      <Container className="relative z-10 h-[--hero-height] pb-7">
        <motion.div
          className="h-full flex flex-col justify-end items-start"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          whileInView="visible"
          exit="hidden"
          animate="hidden"
          viewport={{ amount: 0.9 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-bold leading-[1.15] mb-10">
            Aspiring Developer?
            <br />
            Dev-10 is All You Need.
          </h1>
          <Button className="mb-16" size="large">
            Join the Community
          </Button>
          <p className="flex gap-2 items-center font-semibold">
            Turning your coding aspirations into a reality.
            <AiFillCode size={24} />
          </p>
        </motion.div>
      </Container>
    </div>
  );
};

export default LandingHero;
