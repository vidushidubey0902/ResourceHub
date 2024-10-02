import { motion } from "framer-motion";
import React from "react";

const pageTransition = {
  initial: { opacity: 0, y: "-100vh" },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: "100vh",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const TransitionComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ position: "absolute", width: "100%" }}
      onAnimationComplete={() => window.scrollTo(0, 0)}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
};

export default TransitionComponent;
