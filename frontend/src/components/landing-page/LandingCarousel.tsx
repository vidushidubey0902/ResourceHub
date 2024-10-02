import { useMemo, useRef, useState } from "react";
import { useWindowSize } from "react-use";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

import { landingCarouselImages } from "../../utils/constants";
import { randomCarouselSet1, randomCarouselSet2 } from "../../utils/helpers";
import { LandingCarouselProps } from "../../utils/types";
import Button from "./Button";

const LandingCarousel = () => {
  const { width, height } = useWindowSize();
  const carouselWrapperRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: carouselWrapperRef,
    offset: ["start start", "end start"],
  });

  const maximumScale = useMemo(() => {
    const windowYRatio = height / width;
    const xScale = 1.667;
    const yScale = xScale * (16 / 9) * windowYRatio;
    return Math.max(xScale, yScale);
  }, [width, height]);

  const scale = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.66],
    [maximumScale * 1.1, maximumScale, 1]
  );

  const imagesOpacity = useTransform(scrollYProgress, [0.64, 0.68], [0, 1]);
  const imageTranslateXLeft = useTransform(
    scrollYProgress,
    [0.64, 0.68],
    [-100, 0]
  );
  const imageTranslateXRight = useTransform(
    scrollYProgress,
    [0.64, 0.68],
    [100, 0]
  );

  const [carouselVariant, setCarouselVariant] = useState<"inactive" | "active">(
    "inactive"
  );

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress > 0.67) {
      setCarouselVariant("active");
    } else {
      setCarouselVariant("inactive");
    }
  });

  return (
    <motion.div animate={carouselVariant} className="bg-black pb-16">
      <div
        ref={carouselWrapperRef}
        className="overflow-clip h-[300vh] mt-[-100vh]"
      >
        <div className="h-screen sticky top-0 flex items-center">
          <div className="flex gap-5 mb-5 relative left-1/2 -translate-x-1/2">
            <motion.div
              style={{ opacity: imagesOpacity, x: imageTranslateXLeft }}
              className="shrink-0 w-[300px] md:w-[60vw] aspect-[9/16] md:aspect-video rounded-2xl overflow-clip"
            >
              <img
                src={landingCarouselImages[0].image}
                alt={landingCarouselImages[0].name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              style={{ scale }}
              className="shrink-0 w-[300px] md:w-[60vw] aspect-[9/16] md:aspect-video rounded-2xl overflow-clip relative"
            >
              <img
                src={landingCarouselImages[1].image}
                alt={landingCarouselImages[1].name}
                className="w-full h-full object-cover"
              />
              <motion.div
                variants={{
                  active: { opacity: 1 },
                  inactive: { opacity: 0 },
                }}
                transition={{ duration: 0.5 }}
                className="absolute left-0 bottom-0 w-full flex flex-col md:flex-row md:justify-between items-center gap-4 md:gap-2 p-5 text-white text-lg"
              >
                <p>Your Next Step as a Developer</p>
                <Button>Start Now</Button>
              </motion.div>
            </motion.div>
            <motion.div
              style={{ opacity: imagesOpacity, x: imageTranslateXRight }}
              className="shrink-0 w-[300px] md:w-[60vw] aspect-[9/16] md:aspect-video rounded-2xl overflow-clip"
            >
              <img
                src={landingCarouselImages[2].image}
                alt={landingCarouselImages[2].name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        variants={{
          active: { opacity: 1, y: 0 },
          inactive: { opacity: 0, y: 20 },
        }}
        transition={{ duration: 0.4 }}
        className="space-y-3 -mt-[calc((100vh-(300px*(16/9)))/2)] md:-mt-[calc((100vh-(60vw*(9/16)))/2)] pt-4"
      >
        <SmallVideoCarousel images={randomCarouselSet1} />
        <div className="[--duration:74s] [--carousel-offset:-32px]">
          <SmallVideoCarousel images={randomCarouselSet2} />
        </div>
      </motion.div>
    </motion.div>
  );
};

const SmallVideoCarousel = ({ images }: { images: LandingCarouselProps[] }) => {
  return (
    <div className="overflow-clip">
      <div className="flex gap-3 animate-carousel-move relative left-[var(--carousel-offset, 0px)]">
        {images.map((carouselImg, idx) => (
          <div className="w-[40vw] md:w-[23vw] aspect-video shrink-0" key={idx}>
            <img
              className="w-full h-full object-cover rounded-xl"
              src={carouselImg.image}
              alt={carouselImg.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingCarousel;
