import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Leaf } from 'lucide-react';
import { COLORS } from './constants';

const LaunchWrapper = ({ onComplete }) => {
  const [step, setStep] = useState('intro'); // intro, button, countdown, launching
  const [count, setCount] = useState(3);
  const [textIndex, setTextIndex] = useState(0);
  const [isLaunching, setIsLaunching] = useState(false);

  const introTexts = ["ARE", "YOU", "READY?"];

  // Generate random leaves configuration
  const leaves = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      size: Math.random() * 15 + 10, // 10px to 25px
      x: Math.random() * 100, // 0% to 100%
      y: Math.random() * 100, // 0% to 100%
      rotation: Math.random() * 360,
      duration: Math.random() * 20 + 15, // 15s to 35s
      delay: Math.random() * 10,
      blur: Math.random() * 2, // 0px to 2px blur for depth
      opacity: Math.random() * 0.3 + 0.1, // 0.1 to 0.4 opacity
      direction: Math.random() > 0.5 ? 1 : -1 // Clockwise or counter-clockwise rotation
    }));
  }, []);

  useEffect(() => {
    if (step === 'intro') {
      const timer = setInterval(() => {
        setTextIndex((prev) => {
          if (prev < introTexts.length - 1) {
            return prev + 1;
          } else {
            // Last word "READY?" - immediately show button
            clearInterval(timer);
            setStep('button');
            return prev;
          }
        });
      }, 1600); // Slower speed for "ARE YOU READY?"
      return () => clearInterval(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === 'countdown') {
      const timer = setInterval(() => {
        setCount((prev) => {
          if (prev > 1) return prev - 1;
          clearInterval(timer);
          setStep('launching');
          setIsLaunching(true);
          return 0;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === 'launching') {
      // Wait for launch animation to finish before calling onComplete
      const timer = setTimeout(() => {
        onComplete();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ 
        background: `radial-gradient(circle at center, ${COLORS.darkGreen} 0%, #012e1a 100%)`
      }}
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -1000, 
        scale: 1.1,
        transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] } 
      }}
    >
      {/* Floating Tea Leaves Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {leaves.map((leaf) => (
          <motion.div
            key={leaf.id}
            className="absolute"
            initial={{
              left: `${leaf.x}%`,
              top: `${leaf.y}%`,
              rotate: leaf.rotation,
              opacity: leaf.opacity,
              filter: `blur(${leaf.blur}px)`
            }}
            animate={isLaunching ? {
              // During launch, accelerate upwards
              y: [0, -1000],
              opacity: 0,
              transition: { duration: 1.5, ease: "easeIn" }
            } : {
              // Normal floating animation
              y: [0, -100, 0],
              x: [0, leaf.direction * 50, 0],
              rotate: [leaf.rotation, leaf.rotation + 360 * leaf.direction],
            }}
            transition={isLaunching ? {} : {
              duration: leaf.duration,
              repeat: Infinity,
              ease: "linear",
              delay: leaf.delay,
            }}
          >
            <Leaf 
              size={leaf.size} 
              color={COLORS.goldenYellow} 
              strokeWidth={1.5}
              fill={Math.random() > 0.7 ? COLORS.goldenYellow : "transparent"}
              style={{ opacity: 0.6 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Ambient Light Effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent" />

      <div className="relative z-10 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro-text"
              className="flex flex-col items-center justify-center h-full"
            >
              <motion.h1
                key={introTexts[textIndex]}
                initial={{ opacity: 0, scale: 0.8, y: 50, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.2, y: -50, filter: "blur(10px)" }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className="text-7xl md:text-9xl font-black tracking-tighter"
                style={{ 
                  color: COLORS.goldenYellow,
                  textShadow: `0 0 40px ${COLORS.goldenYellow}40`
                }}
              >
                {introTexts[textIndex]}
              </motion.h1>
            </motion.div>
          )}

          {step === 'button' && (
            <motion.div
              key="launch-button"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="relative"
            >
              {/* Pulsing ring behind button */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-30"
                style={{ backgroundColor: COLORS.goldenYellow }}
                animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${COLORS.goldenYellow}60` }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep('countdown')}
                className="group relative px-10 py-5 bg-white rounded-full shadow-[0_0_30px_rgba(249,176,0,0.3)] flex items-center gap-4 text-2xl md:text-3xl font-bold tracking-wide overflow-hidden border-4"
                style={{ 
                  color: COLORS.darkGreen,
                  borderColor: COLORS.goldenYellow
                }}
              >
                <span className="relative z-10">LAUNCH</span>
                <Rocket className="relative z-10 w-8 h-8 group-hover:rotate-45 transition-transform duration-300" />
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: '#fffdf0' }}
                />
              </motion.button>
            </motion.div>
          )}

          {step === 'countdown' && (
            <motion.div
              key="countdown"
              className="flex flex-col items-center"
            >
               <motion.div
                key={count}
                initial={{ opacity: 0, scale: 3, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5, type: "spring" }}
                className="text-[12rem] md:text-[16rem] font-black text-white leading-none mb-4"
                style={{ 
                  textShadow: `0 0 60px ${COLORS.goldenYellow}`,
                  color: COLORS.white 
                }}
              >
                {count}
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white/80 text-2xl font-serif italic tracking-widest"
              >
                BRINGING COMMUNITY TO LIFE…
              </motion.p>
            </motion.div>
          )}

           {step === 'launching' && (
            <motion.div
              key="launching"
              className="flex flex-col items-center justify-center absolute"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: -1500, opacity: 1 }} // Fly up off screen
              transition={{ duration: 1.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
               <div className="relative scale-150">
                  {/* Rocket Body */}
                  <Rocket size={180} color="white" fill="white" className="rotate-[-45deg] drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]" />
                  
                  {/* Advanced Engine Plume */}
                  <motion.div 
                    className="absolute top-[80%] left-[10%] w-24 h-64 rounded-full blur-xl origin-top"
                    style={{ background: 'linear-gradient(to bottom, #fff, #ffff00, #ff4500, transparent)' }}
                    animate={{ 
                        scaleY: [1, 1.5, 0.8, 1.2],
                        opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ repeat: Infinity, duration: 0.1 }}
                  />
                  
                  {/* Shockwave rings */}
                  <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-white/50"
                    animate={{ scale: [0.5, 2], opacity: [1, 0], borderWidth: [4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                  />
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* High-tech loading bar */}
      {step === 'countdown' && (
        <motion.div 
          className="absolute bottom-16 w-full max-w-md h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
            <motion.div 
                className="h-full shadow-[0_0_20px_rgba(249,176,0,0.8)]"
                style={{ backgroundColor: COLORS.goldenYellow }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
            />
        </motion.div>
      )}
    </motion.div>
  );
};

export default LaunchWrapper;
