import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";

import Container from "./Container";
import { LandingWordsProps } from "../../utils/types";

const LandingParagraph = ({ text }: { text: string }) => {
  const element = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold h-[200vh] flex items-center justify-center bg-slate-50">
      <Container>
        <p ref={element} className="flex flex-wrap">
          {words.map((word, idx) => {
            const start = idx / words.length;
            const end = start + 1 / words.length;
            const isLastWord =
              idx === words.length - 1 || idx === words.length - 2;

            return (
              <Word
                key={idx}
                range={[start, end]}
                progress={scrollYProgress}
                isLastWord={isLastWord}
              >
                {word}
              </Word>
            );
          })}
        </p>
      </Container>
    </div>
  );
};

export default LandingParagraph;

const Word = ({ children, range, progress, isLastWord }: LandingWordsProps) => {
  const opacity = useTransform(progress, range, [0, 1]);

  const createTransform = (outputRange: string[]) =>
    isLastWord
      ? useTransform(
          progress,
          [range[0], range[1] * 0.95, range[1]],
          outputRange
        )
      : outputRange[0];

  const color = createTransform(["#000", "#000", "#fff"]);
  const backgroundColor = createTransform(["#fff", "#fff", "#000"]);
  const textDecoration = createTransform(["none", "none", "underline"]);
  const textUnderlineOffset = createTransform(["auto", "auto", "10px"]);

  return (
    <span className="flex flex-wrap relative">
      <span className="absolute opacity-[0.1] px-2 py-3">{children}</span>
      <motion.span
        style={{
          opacity,
          color,
          backgroundColor,
          textDecoration,
          textUnderlineOffset,
        }}
        className="px-2 py-3"
      >
        {children}
      </motion.span>
    </span>
  );
};
