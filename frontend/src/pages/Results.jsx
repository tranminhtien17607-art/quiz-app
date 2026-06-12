import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from '../components/Confetti';
import axios from 'axios';

export default function Results({ quizData, userAnswers, onRestart }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculateResult = async () => {
      try {
        const correctAnswers = {};
        quizData.questions.forEach((q, idx) => {
          correctAnswers[idx + 1] = q.correct_answer;
        });

        const response = await axios.post(
          'http://localhost:8000/api/submit-quiz',
          {
            answers: userAnswers,
            correctAnswers: correctAnswers,
          }
        );

        setResult(response.data);
      } catch (err) {
        console.error('Error calculating results:', err);
      } finally {
        setLoading(false);
      }
    };

    calculateResult();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-4xl"
        >
          ⏳
        </motion.div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Error loading results</div>
      </div>
    );
  }

  const isPassed = result.passed;
  const percentage = result.percentage;

  return (
    <div className="min-h-screen py-12 px-4 flex items-center justify-center">
      {isPassed && <Confetti />}

      <motion.div
        className="max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Score Card */}
        <motion.div
          className={`bg-gradient-to-br rounded-3xl p-12 text-center mb-8 border ${
            isPassed
              ? 'from-green-500/20 to-emerald-500/20 border-green-400'
              : 'from-red-500/20 to-danger-500/20 border-danger-400'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            className="text-6xl md:text-7xl font-bold mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
          >
            {isPassed ? '🎉' : '📚'}
          </motion.div>

          <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${
            isPassed ? 'text-green-300' : 'text-danger-300'
          }`}>
            {isPassed ? 'Excellent!' : 'Try Again!'}
          </h1>

          <p className="text-gray-300 text-lg mb-6">
            {isPassed
              ? 'You passed the quiz with flying colors!'
              : 'Keep practicing to improve your score!'}
          </p>

          {/* Score Display */}
          <motion.div
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center">
              <motion.div
                className="text-5xl font-bold text-white mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                {result.score}/{result.total}
              </motion.div>
              <div className="text-gray-300 text-lg mb-4">
                Correct Answers
              </div>

              {/* Percentage Circle */}
              <div className="flex items-center justify-center">
                <motion.div
                  className="relative w-32 h-32"
                  initial={{ rotate: -90 }}
                  animate={{ rotate: -90 + (percentage * 3.6) / 10 }}
                  transition={{ delay: 1, duration: 1.5 }}
                >
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="60"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="60"
                      stroke={isPassed ? '#22c55e' : '#ef4444'}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(percentage * 376) / 100} 376`}
                      initial={{ strokeDasharray: '0 376' }}
                      animate={{ strokeDasharray: `${(percentage * 376) / 100} 376` }}
                      transition={{ delay: 1, duration: 1.5 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-3xl font-bold ${
                      isPassed ? 'text-green-300' : 'text-danger-300'
                    }`}>
                      {percentage}%
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Details */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-green-400">{result.score}</div>
            <div className="text-gray-400 text-sm mt-2">Correct</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-danger-400">{result.total - result.score}</div>
            <div className="text-gray-400 text-sm mt-2">Wrong</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-blue-400">{result.total}</div>
            <div className="text-gray-400 text-sm mt-2">Total</div>
          </div>
        </motion.div>

        {/* Restart Button */}
        <motion.button
          onClick={onRestart}
          className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl transition-all hover:shadow-lg hover:shadow-purple-500/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          🔄 Try Another Quiz
        </motion.button>
      </motion.div>
    </div>
  );
}
