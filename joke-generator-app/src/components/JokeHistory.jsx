import { motion } from 'framer-motion';

export default function JokeHistory({ jokes }) {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
        📚 Saved Jokes
      </h2>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {jokes.map((joke, idx) => (
          <motion.div
            key={joke.id}
            className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <p className="text-white/80 text-sm">
              {joke.setup ? `${joke.setup} ${joke.delivery}` : joke.joke}
            </p>
            <span className="text-white/50 text-xs mt-2 inline-block">📌 {joke.category}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
