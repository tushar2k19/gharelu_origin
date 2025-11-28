import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, CheckCircle2 } from 'lucide-react';
import { COLORS } from './constants';

const LaunchWrapper = ({ onComplete }) => {
  const [step, setStep] = useState('intro'); // intro, button, countdown, launching
  const [count, setCount] = useState(3);
  const [textIndex, setTextIndex] = useState(0);

  const introTexts = ["ARE", "YOU", "READY?"];

  useEffect(() => {
    if (step === 'intro') {
      const timer = setInterval(() => {
        setTextIndex((prev) => {
          if (prev < introTexts.length - 1) return prev + 1;
          clearInterval(timer);
          setTimeout(() => setStep('button'), 500);
          return prev;
        });
      }, 800);
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
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: COLORS.darkGreen }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -1000, transition: { duration: 1, ease: "easeInOut" } }}
    >
      {/* Background Stars/Particles Effect */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * -100],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.h1
              key={introTexts[textIndex]}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.5, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-6xl md:text-8xl font-black text-white tracking-tighter"
              style={{ color: COLORS.goldenYellow }}
            >
              {introTexts[textIndex]}
            </motion.h1>
          )}

          {step === 'button' && (
            <motion.div
              key="launch-button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep('countdown')}
                className="group relative px-8 py-4 bg-white rounded-full shadow-[0_0_20px_rgba(249,176,0,0.5)] flex items-center gap-3 text-xl md:text-2xl font-bold tracking-wide overflow-hidden"
                style={{ color: COLORS.darkGreen }}
              >
                <span className="relative z-10">LAUNCH</span>
                <Rocket className="relative z-10 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: COLORS.goldenYellow }}
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
                initial={{ opacity: 0, scale: 2, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="text-9xl font-black text-white mb-8"
                style={{ textShadow: `0 0 30px ${COLORS.goldenYellow}` }}
              >
                {count}
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white text-xl font-serif italic"
              >
                Initiating engines...
              </motion.p>
            </motion.div>
          )}

           {step === 'launching' && (
            <motion.div
              key="launching"
              className="flex flex-col items-center justify-center"
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: -1500, opacity: 1 }} // Fly up off screen
              transition={{ duration: 1.5, ease: "easeIn" }}
            >
               <div className="relative">
                  {/* Rocket Body */}
                  <Rocket size={120} color="white" fill="white" className="rotate-[-45deg]" />
                  
                  {/* Flame Effect */}
                  <motion.div 
                    className="absolute -bottom-10 -left-10 w-20 h-40 rounded-full blur-lg"
                    style={{ background: 'linear-gradient(to bottom, #ffff00, #ff4500)' }}
                    animate={{ 
                        scale: [1, 1.2, 1],
                        height: [100, 150, 120]
                    }}
                    transition={{ repeat: Infinity, duration: 0.1 }}
                  />
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Bottom loading bar for tech feel */}
      {step === 'countdown' && (
        <motion.div 
          className="absolute bottom-20 w-64 h-1 bg-gray-700 rounded-full overflow-hidden"
        >
            <motion.div 
                className="h-full bg-white"
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

