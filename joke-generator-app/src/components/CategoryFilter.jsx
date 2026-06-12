import { motion } from 'framer-motion';

const categories = ['Any', 'General', 'Programming', 'Knock-knock'];

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
        🎯 Choose Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories.map((category, idx) => (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`py-2 px-4 rounded-lg font-semibold transition-all ${
              selectedCategory === category
                ? 'bg-white text-purple-600'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
