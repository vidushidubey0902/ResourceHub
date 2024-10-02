import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface ButtonProps {
  isDisabled: boolean;
  text: string;
}

const SpotlightButton = ({ isDisabled, text }: ButtonProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const { width } = target.getBoundingClientRect();
      const offset = e.offsetX;
      const left = `${(offset / width) * 100}%`;

      spanRef.current?.animate({ left }, { duration: 800, fill: "forwards" });
    };

    const handleMouseLeave = () => {
      spanRef.current?.animate(
        { left: "50%" },
        { duration: 300, fill: "forwards" }
      );
    };

    btnRef.current?.addEventListener("mousemove", handleMouseMove);
    btnRef.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btnRef.current?.removeEventListener("mousemove", handleMouseMove);
      btnRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      ref={btnRef}
      className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-spotlight-bg-1 via-spotlight-bg-2 to-spotlight-bg-3 px-4 py-2 md:py-3 text-lg font-medium text-white"
      type="submit"
      disabled={isDisabled}
    >
      <span className="pointer-events-none relative z-10 text-spotlight-text mix-blend-difference text-sm md:text-base">
        {isDisabled ? "Loading..." : text}
      </span>
      <span
        ref={spanRef}
        className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-spotlight-circle"
      />
    </motion.button>
  );
};

export default SpotlightButton;
