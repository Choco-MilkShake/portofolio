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

  const x = useTransform(scrollYProgress, [0, 1], ['-200vw', '200vw']);

  return (
    <div className="scroll-train-container" ref={containerRef}>
      <div className="scroll-train-track">
        <motion.div className="scroll-train" style={{ x }}>
          {/* Steam Train Locomotive */}
          <div className="steam-locomotive">
            <div className="cowcatcher"></div>
            <div className="boiler">
              <div className="chimney">
                <div className="smoke puff-1"></div>
                <div className="smoke puff-2"></div>
                <div className="smoke puff-3"></div>
              </div>
              <div className="dome"></div>
            </div>
            <div className="cabin">
              <div className="cabin-roof"></div>
              <div className="cabin-window"></div>
            </div>
            <div className="wheels-container">
              <div className="wheel small-wheel"></div>
              <div className="wheel big-wheel">
                <div className="wheel-spoke"></div>
                <div className="wheel-rod"></div>
              </div>
              <div className="wheel big-wheel">
                <div className="wheel-spoke"></div>
              </div>
            </div>
          </div>
          
          {/* Coal Tender */}
          <div className="coal-tender">
            <div className="coal"></div>
            <div className="wheels-container">
              <div className="wheel small-wheel"></div>
              <div className="wheel small-wheel"></div>
            </div>
          </div>

          {/* Passenger Carriage 1 */}
          <div className="passenger-carriage">
            <div className="carriage-roof"></div>
            <div className="windows-container">
              <div className="carriage-window"></div>
              <div className="carriage-window"></div>
              <div className="carriage-window"></div>
            </div>
            <div className="wheels-container">
              <div className="wheel small-wheel"></div>
              <div className="wheel small-wheel"></div>
            </div>
          </div>
          
          {/* Passenger Carriage 2 */}
          <div className="passenger-carriage">
            <div className="carriage-roof"></div>
            <div className="windows-container">
              <div className="carriage-window"></div>
              <div className="carriage-window"></div>
              <div className="carriage-window"></div>
            </div>
            <div className="wheels-container">
              <div className="wheel small-wheel"></div>
              <div className="wheel small-wheel"></div>
            </div>
          </div>

          {/* Passenger Carriage 3 */}
          <div className="passenger-carriage">
            <div className="carriage-roof"></div>
            <div className="windows-container">
              <div className="carriage-window"></div>
              <div className="carriage-window"></div>
              <div className="carriage-window"></div>
            </div>
            <div className="wheels-container">
              <div className="wheel small-wheel"></div>
              <div className="wheel small-wheel"></div>
            </div>
          </div>

          {/* Passenger Carriage 4 */}
          <div className="passenger-carriage">
            <div className="carriage-roof"></div>
            <div className="windows-container">
              <div className="carriage-window"></div>
              <div className="carriage-window"></div>
              <div className="carriage-window"></div>
            </div>
            <div className="wheels-container">
              <div className="wheel small-wheel"></div>
              <div className="wheel small-wheel"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
