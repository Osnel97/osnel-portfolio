import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registered once here rather than in every component that needs it.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
