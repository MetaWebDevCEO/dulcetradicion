"use client";

import { motion, Variants } from "framer-motion";

const anim: Variants = {
  initial: {
    scaleY: 1,
    originY: 1,
  },
  animate: (i: number) => ({
    scaleY: 0,
    originY: 1,
    transition: {
      duration: 1,
      delay: 0.1 * i,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: (i: number) => ({
    scaleY: 1,
    originY: 0,
    transition: {
      duration: 1,
      delay: 0.1 * i,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const TransitionLoader = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] flex">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          variants={anim}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={i}
          className="relative h-full w-full bg-[#60a27d]"
        />
      ))}
    </div>
  );
};

export default TransitionLoader;