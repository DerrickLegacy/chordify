import { useState, useEffect, useRef } from 'react';

export const useScrollVisibility = (options = {}) => {
  const ref = useRef(null);
  const [visibilityRatio, setVisibilityRatio] = useState(0);
  
  // Default options
  const {
    fadeStart = 0.2,    // Start fading when 20% visible
    fadeEnd = 0.8,      // Fully visible at 80%
    minScale = 0.75,    // Minimum scale when not visible
    maxScale = 1,       // Maximum scale when fully visible
    transitionDuration = 300 // Transition duration in ms
  } = options;

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate visible height
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const elementHeight = rect.height;
        const ratio = Math.min(1, Math.max(0, visibleHeight / elementHeight));
        
        setVisibilityRatio(ratio);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate styles based on visibility
  const opacity = Math.min(1, Math.max(0, (visibilityRatio - fadeStart) / (fadeEnd - fadeStart)));
  const scale = minScale + (opacity * (maxScale - minScale));

  return {
    ref,
    style: {
      opacity,
      transform: `scale(${scale})`,
      transition: `all ${transitionDuration}ms ease-out`
    }
  };
};