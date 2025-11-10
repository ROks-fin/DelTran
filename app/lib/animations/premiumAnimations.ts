/**
 * Ultra-Premium Animation System
 * Advanced animation configurations for luxury UX
 */

import { Variants, Transition } from 'framer-motion';

/**
 * Premium easing curves - handcrafted for luxury feel
 */
export const easings = {
  // Signature DelTran easing
  premium: [0.22, 1, 0.36, 1],

  // Smooth and elegant
  smooth: [0.4, 0, 0.2, 1],

  // Bouncy and playful
  bounce: [0.68, -0.55, 0.265, 1.55],

  // Sharp and snappy
  snap: [0.87, 0, 0.13, 1],

  // Elastic spring
  elastic: [0.175, 0.885, 0.32, 1.275],

  // Luxury slow ease
  luxe: [0.165, 0.84, 0.44, 1],
} as const;

/**
 * Premium transition presets
 */
export const transitions = {
  // Ultra smooth default
  default: {
    duration: 0.6,
    ease: easings.premium,
  } as Transition,

  // Quick and responsive
  fast: {
    duration: 0.3,
    ease: easings.smooth,
  } as Transition,

  // Slow and dramatic
  slow: {
    duration: 1.2,
    ease: easings.luxe,
  } as Transition,

  // Spring physics
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  } as Transition,

  // Bouncy spring
  springBounce: {
    type: 'spring',
    stiffness: 400,
    damping: 20,
  } as Transition,

  // Gentle spring
  springGentle: {
    type: 'spring',
    stiffness: 200,
    damping: 40,
  } as Transition,

  // Smooth spring
  springSmooth: {
    type: 'spring',
    stiffness: 350,
    damping: 35,
    mass: 0.8,
  } as Transition,
} as const;

/**
 * Fade animations with various directions
 */
export const fadeVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  } as Variants,

  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  } as Variants,

  fadeDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
  } as Variants,

  fadeLeft: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  } as Variants,

  fadeRight: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
  } as Variants,

  fadeScale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  } as Variants,

  fadeScaleBig: {
    initial: { opacity: 0, scale: 0.7 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
  } as Variants,
};

/**
 * Slide animations with smooth easing
 */
export const slideVariants = {
  slideUp: {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-100%', opacity: 0 },
  } as Variants,

  slideDown: {
    initial: { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
  } as Variants,

  slideLeft: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  } as Variants,

  slideRight: {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  } as Variants,
};

/**
 * Scale and zoom animations
 */
export const scaleVariants = {
  scaleIn: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
  } as Variants,

  scaleUp: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.2, opacity: 0 },
  } as Variants,

  zoomIn: {
    initial: { scale: 1.2, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  } as Variants,

  pulse: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: easings.smooth,
      },
    },
  } as Variants,
};

/**
 * Rotation animations
 */
export const rotateVariants = {
  rotateIn: {
    initial: { rotate: -180, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    exit: { rotate: 180, opacity: 0 },
  } as Variants,

  flip: {
    initial: { rotateY: -90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: 90, opacity: 0 },
  } as Variants,

  flipVertical: {
    initial: { rotateX: -90, opacity: 0 },
    animate: { rotateX: 0, opacity: 1 },
    exit: { rotateX: 90, opacity: 0 },
  } as Variants,
};

/**
 * 3D perspective animations
 */
export const perspectiveVariants = {
  perspective: {
    initial: {
      rotateX: 20,
      rotateY: -20,
      scale: 0.9,
      opacity: 0,
    },
    animate: {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
    },
    exit: {
      rotateX: -20,
      rotateY: 20,
      scale: 0.9,
      opacity: 0,
    },
  } as Variants,

  tilt: {
    initial: { rotateX: 0, rotateY: 0 },
    hover: {
      rotateX: -5,
      rotateY: 5,
      transition: transitions.springSmooth,
    },
  } as Variants,

  cardHover: {
    initial: {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    },
    hover: {
      rotateX: -2,
      rotateY: 3,
      scale: 1.02,
      transition: transitions.springSmooth,
    },
  } as Variants,
};

/**
 * Blur and glow effects
 */
export const effectVariants = {
  blur: {
    initial: { filter: 'blur(10px)', opacity: 0 },
    animate: { filter: 'blur(0px)', opacity: 1 },
    exit: { filter: 'blur(10px)', opacity: 0 },
  } as Variants,

  glow: {
    initial: {
      boxShadow: '0 0 0px rgba(212, 175, 55, 0)',
    },
    animate: {
      boxShadow: [
        '0 0 20px rgba(212, 175, 55, 0.3)',
        '0 0 40px rgba(212, 175, 55, 0.6)',
        '0 0 20px rgba(212, 175, 55, 0.3)',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: easings.smooth,
      },
    },
  } as Variants,

  shimmer: {
    initial: { backgroundPosition: '-200% 0' },
    animate: {
      backgroundPosition: '200% 0',
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  } as Variants,
};

/**
 * Stagger children animations
 */
export const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
} as Variants;

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
} as Variants;

/**
 * Premium hover interactions
 */
export const hoverVariants = {
  lift: {
    initial: { y: 0 },
    hover: {
      y: -8,
      transition: transitions.springSmooth,
    },
  } as Variants,

  grow: {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: transitions.springBounce,
    },
    tap: { scale: 0.95 },
  } as Variants,

  glow: {
    initial: {
      boxShadow: '0 0 0px rgba(212, 175, 55, 0)',
    },
    hover: {
      boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)',
      transition: transitions.default,
    },
  } as Variants,

  magnetic: {
    initial: { x: 0, y: 0 },
    // Magnetic effect handled via custom logic
  } as Variants,
};

/**
 * Scroll-based reveal animations
 */
export const scrollReveal = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easings.premium,
    },
  },
} as Variants;

export const scrollRevealLeft = {
  hidden: {
    opacity: 0,
    x: -50,
    rotateY: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      duration: 0.8,
      ease: easings.premium,
    },
  },
} as Variants;

export const scrollRevealRight = {
  hidden: {
    opacity: 0,
    x: 50,
    rotateY: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      duration: 0.8,
      ease: easings.premium,
    },
  },
} as Variants;

/**
 * Page transition animations
 */
export const pageTransitions = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: transitions.default,
  },

  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: transitions.default,
  },

  scale: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.05, opacity: 0 },
    transition: transitions.default,
  },
};

/**
 * Loading animations
 */
export const loadingVariants = {
  spinner: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  } as Variants,

  pulse: {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: easings.smooth,
      },
    },
  } as Variants,

  dots: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: easings.smooth,
      },
    },
  } as Variants,
};

/**
 * Particle/floating animations
 */
export const floatingVariants = {
  float: {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: easings.smooth,
      },
    },
  } as Variants,

  floatSlow: {
    animate: {
      y: [-20, 20, -20],
      x: [-5, 5, -5],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: easings.smooth,
      },
    },
  } as Variants,

  orbit: {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  } as Variants,
};

/**
 * Text animations
 */
export const textVariants = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easings.premium,
      },
    },
  } as Variants,

  fadeInChar: {
    initial: { opacity: 0 },
    animate: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  } as Variants,

  wave: {
    animate: (i: number) => ({
      y: [0, -10, 0],
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        repeat: Infinity,
        repeatDelay: 2,
      },
    }),
  } as Variants,
};

/**
 * Premium curtain/reveal animations
 */
export const curtainVariants = {
  horizontal: {
    initial: { scaleX: 0, originX: 0 },
    animate: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: easings.premium,
      },
    },
    exit: {
      scaleX: 0,
      originX: 1,
      transition: {
        duration: 0.8,
        ease: easings.premium,
      },
    },
  } as Variants,

  vertical: {
    initial: { scaleY: 0, originY: 0 },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.8,
        ease: easings.premium,
      },
    },
    exit: {
      scaleY: 0,
      originY: 1,
      transition: {
        duration: 0.8,
        ease: easings.premium,
      },
    },
  } as Variants,
};

/**
 * Morph animations
 */
export const morphVariants = {
  expand: {
    initial: {
      width: 0,
      height: 0,
      opacity: 0,
    },
    animate: {
      width: 'auto',
      height: 'auto',
      opacity: 1,
      transition: transitions.spring,
    },
    exit: {
      width: 0,
      height: 0,
      opacity: 0,
      transition: transitions.spring,
    },
  } as Variants,
};

const premiumAnimations = {
  easings,
  transitions,
  fadeVariants,
  slideVariants,
  scaleVariants,
  rotateVariants,
  perspectiveVariants,
  effectVariants,
  staggerContainer,
  staggerItem,
  hoverVariants,
  scrollReveal,
  scrollRevealLeft,
  scrollRevealRight,
  pageTransitions,
  loadingVariants,
  floatingVariants,
  textVariants,
  curtainVariants,
  morphVariants,
};

export default premiumAnimations;
