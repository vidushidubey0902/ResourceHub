import { useState, useEffect } from 'react';
import '../assets/loader_animation.css';
import { motion } from 'framer-motion';

const LoaderAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [isMiddleDivAnimated, setIsMiddleDivAnimated] =
    useState<boolean>(false);
  const [isReversing, setIsReversing] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReversing(true);
      setTimeout(onComplete, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (isReversing: boolean) => ({
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.3,
        ease: 'easeOut',
      },
      ...(!isReversing && { y: 0 }),
      ...(isReversing && { y: -800, transition: { duration: 1 } }),
    }),
  };

  const itemVariants = (custom: number) => ({
    hidden: { y: -800, opacity: 0 },
    visible: (isReversing: boolean) => ({
      y: isReversing ? -800 : 0,
      opacity: isReversing ? 0 : 1,
      transition: { duration: 1, delay: custom },
    }),
  });

  return (
    <div className="w-screen h-screen overflow-hidden">
      <motion.div
        custom={isReversing}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full h-full grid grid-cols-3"
      >
        <motion.div
          custom={isReversing}
          variants={itemVariants(0)}
          className="h-full bg-slate-800"
        />
        <motion.div
          custom={isReversing}
          variants={itemVariants(1)}
          onAnimationComplete={() => setIsMiddleDivAnimated(true)}
          className="h-full bg-slate-800 relative blur-[10px] contrast-[10px] flex justify-center items-center"
        >
          <div className="flex justify-center items-center relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={
                isMiddleDivAnimated
                  ? { opacity: 1, transition: { duration: 1 } }
                  : {}
              }
              className="circle"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={
                isMiddleDivAnimated
                  ? { opacity: 1, transition: { duration: 1 } }
                  : {}
              }
              className="circle"
            />
          </div>
        </motion.div>
        <motion.div
          custom={isReversing}
          variants={itemVariants(0.3)}
          className="h-full bg-slate-800"
        />
      </motion.div>
    </div>
  );
};

export default LoaderAnimation;
