import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useEffect } from 'react';

export default function VideoPlayer() {
  const { isVideoOpen, playingMovie, closeVideo } = useStore();

  // Prevent scrolling when video is open
  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVideoOpen]);

  if (!isVideoOpen || !playingMovie) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10"
        onClick={closeVideo}
      >
        <button 
          onClick={closeVideo}
          className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-50"
        >
          <X className="w-6 h-6" />
        </button>

        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-neon border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Using a high-quality YouTube trailer embed for maximum compatibility */}
          <iframe 
            className="w-full h-full border-0"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&rel=0&modestbranding=1" 
            title="SemanticFlix Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
