import { motion } from 'framer-motion';

export default function JokeButton({ onClick, loading, emoji, text, className }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={loading}
      className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed ${
        className || 'bg-white text-purple-600 hover:bg-gray-100'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.span
        animate={loading ? { rotate: 360 } : {}}
        transition={loading ? { duration: 1, repeat: Infinity } : {}}
      >
        {emoji}
      </motion.span>
      {text}
    </motion.button>
  );
}
