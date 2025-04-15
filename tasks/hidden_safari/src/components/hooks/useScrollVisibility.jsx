import { useState, useEffect, useRef } from 'react';

export const useScrollVisibility = (options = {}) => {
  const ref = useRef(null);
  const [visibilityRatio, setVisibilityRatio] = useState(0);
  
  // Default options
  const {
    fadeStart = 0.2,
    fadeEnd = 0.8,
    minScale = 0.75,
    maxScale = 1,
    transitionDuration = 300,
    animationDirection = 'none', // default is no direction
    maxTranslate = 30 // maximum translate in px
  } = options;

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

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

  // Calculate animation values
  const opacity = Math.min(1, Math.max(0, (visibilityRatio - fadeStart) / (fadeEnd - fadeStart)));
  const scale = minScale + (opacity * (maxScale - minScale));

  // Calculate translate based on direction
  let translateX = 0;
  let translateY = 0;

  const offset = (1 - opacity) * maxTranslate;

  switch (animationDirection) {
    case 'up':
      translateY = offset;
      break;
    case 'down':
      translateY = -offset;
      break;
    case 'left':
      translateX = offset;
      break;
    case 'right':
      translateX = -offset;
      break;
    default:
      break;
  }

  return {
    ref,
    style: {
      opacity,
      transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
      transition: `all ${transitionDuration}ms ease-out`
    }
  };
};
