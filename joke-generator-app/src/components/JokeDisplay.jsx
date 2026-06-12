import { motion } from 'framer-motion';

export default function JokeDisplay({ joke }) {
  const isSetupPunchline = joke.setup && joke.delivery;
  const jokeText = isSetupPunchline ? joke.setup : joke.joke;

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8 shadow-2xl"
      initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.9, rotateX: 10 }}
      transition={{ duration: 0.4 }}
    >
      {/* Setup */}
      <motion.p
        className="text-xl md:text-2xl text-white font-semibold mb-6 text-center leading-relaxed"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {jokeText}
      </motion.p>

      {/* Delivery/Punchline */}
      {isSetupPunchline && (
        <motion.div
          className="border-t border-white/20 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.p
            className="text-lg md:text-xl text-yellow-300 font-bold text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {joke.delivery}
          </motion.p>
        </motion.div>
      )}

      {/* Category Badge */}
      <motion.div
        className="flex justify-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <span className="bg-white/20 text-white/80 px-4 py-1 rounded-full text-sm font-semibold">
          📌 {joke.category}
        </span>
      </motion.div>
    </motion.div>
  );
}
