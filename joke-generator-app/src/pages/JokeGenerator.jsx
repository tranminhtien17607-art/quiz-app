import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLaugh, FaCopy, FaShare2 } from 'react-icons/fa';
import JokeDisplay from '../components/JokeDisplay';
import JokeButton from '../components/JokeButton';
import CategoryFilter from '../components/CategoryFilter';
import JokeHistory from '../components/JokeHistory';
import useJoke from '../hooks/useJoke';

export default function JokeGenerator() {
  const { joke, loading, error, fetchJoke } = useJoke();
  const [selectedCategory, setSelectedCategory] = useState('Any');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFetchJoke = () => {
    fetchJoke(selectedCategory);
  };

  const handleCopyToClipboard = () => {
    if (joke) {
      const jokeText = joke.setup ? `${joke.setup} ${joke.delivery}` : joke.joke;
      navigator.clipboard.writeText(jokeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareJoke = () => {
    if (joke) {
      const jokeText = joke.setup ? `${joke.setup} ${joke.delivery}` : joke.joke;
      if (navigator.share) {
        navigator.share({
          title: '😂 Check out this joke!',
          text: jokeText,
        });
      } else {
        alert('Share functionality not supported on this device');
      }
    }
  };

  const handleAddToHistory = () => {
    if (joke && !history.some(j => j.id === joke.id)) {
      setHistory([joke, ...history]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-6xl md:text-7xl mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          😂
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Joke Generator
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-2">
          Get a random laugh every time you click!
        </p>
        <motion.div
          className="h-1 w-24 bg-white/50 mx-auto rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
      </motion.div>

      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Joke Display */}
      <AnimatePresence mode="wait">
        {joke && (
          <JokeDisplay key={joke.id} joke={joke} />
        )}
      </AnimatePresence>

      {/* Error Display */}
      {error && (
        <motion.div
          className="bg-red-500/20 border border-red-400 text-red-200 px-6 py-4 rounded-lg mb-6 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ⚠️ {error}
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 mb-8 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <JokeButton
          onClick={handleFetchJoke}
          loading={loading}
          emoji="🎲"
          text={loading ? 'Loading...' : 'Get Joke'}
          className="bg-white text-purple-600 hover:bg-gray-100"
        />

        {joke && (
          <>
            <JokeButton
              onClick={handleCopyToClipboard}
              emoji="📋"
              text={copied ? 'Copied!' : 'Copy'}
              className="bg-blue-500/80 text-white hover:bg-blue-600"
            />
            <JokeButton
              onClick={handleShareJoke}
              emoji="📤"
              text="Share"
              className="bg-green-500/80 text-white hover:bg-green-600"
            />
            <JokeButton
              onClick={handleAddToHistory}
              emoji="❤️"
              text="Save"
              className="bg-pink-500/80 text-white hover:bg-pink-600"
            />
          </>
        )}
      </motion.div>

      {/* History Toggle */}
      {history.length > 0 && (
        <motion.button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white py-2 px-4 rounded-lg hover:bg-white/20 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          📚 Joke History ({history.length})
        </motion.button>
      )}

      {/* History Display */}
      {showHistory && <JokeHistory jokes={history} />}

      {/* Info Card */}
      <motion.div
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center text-white/80"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm">
          🤣 Powered by <strong>JokeAPI</strong> - {joke?.type === 'twopart' ? 'Two-Part' : 'Single'} Jokes
        </p>
      </motion.div>
    </div>
  );
}
