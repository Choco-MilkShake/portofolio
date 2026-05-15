'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import './ScrollTrain.css';

export default function ScrollTrain() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const x = useTransform(scrollYProgress, [0, 1], ['-160%', '160%']);

  return (
    <div className="scroll-train-container" ref={containerRef}>
      <div className="scroll-train-track">
        <motion.div className="scroll-train" style={{ x }}>
          <div className="train-engine">
            <div className="train-chimney"></div>
            <div className="train-window"></div>
            <div className="train-headlight"></div>
            <div className="train-buffer"></div>
          </div>
          <div className="train-carriage carriage-one"></div>
          <div className="train-carriage carriage-two"></div>
          <div className="train-wheel train-wheel--front"></div>
          <div className="train-wheel train-wheel--rear"></div>
        </motion.div>
      </div>
    </div>
  );
}
