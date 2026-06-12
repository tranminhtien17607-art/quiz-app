import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionCard from '../components/QuestionCard';

export default function Quiz({ data, onSubmit }) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [answered, setAnswered] = useState(new Set());

  const questions = data.questions;
  const currentQuestion = questions[currentQuestionIdx];
  const progress = ((currentQuestionIdx + 1) / questions.length) * 100;

  const handleAnswerSelect = (option) => {
    if (answered.has(currentQuestionIdx)) return;

    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIdx + 1]: option
    }));
    setAnswered(prev => new Set(prev).add(currentQuestionIdx));
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const correctAnswers = {};
    questions.forEach((q, idx) => {
      correctAnswers[idx + 1] = q.correct_answer;
    });

    onSubmit({
      answers: userAnswers,
      correctAnswers: correctAnswers,
      totalQuestions: questions.length
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-white">
              Question {currentQuestionIdx + 1} of {questions.length}
            </h1>
            <motion.span
              className="text-lg font-semibold text-purple-400"
              key={currentQuestionIdx}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {answered.size} / {questions.length}
            </motion.span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestionIdx}
            question={currentQuestion}
            questionNumber={currentQuestionIdx + 1}
            selectedAnswer={userAnswers[currentQuestionIdx + 1]}
            correctAnswer={currentQuestion.correct_answer}
            onSelectAnswer={handleAnswerSelect}
            isAnswered={answered.has(currentQuestionIdx)}
          />
        </AnimatePresence>

        {/* Navigation Buttons */}
        <motion.div
          className="flex gap-4 mt-8 justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.button
            onClick={handlePrev}
            disabled={currentQuestionIdx === 0}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Previous
          </motion.button>

          <motion.button
            onClick={handleNext}
            disabled={currentQuestionIdx === questions.length - 1}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next →
          </motion.button>

          {currentQuestionIdx === questions.length - 1 && (
            <motion.button
              onClick={handleSubmit}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✓ Submit Quiz
            </motion.button>
          )}
        </motion.div>

        {/* Question Navigator */}
        <motion.div
          className="mt-12 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-white font-semibold mb-4">Jump to Question</h3>
          <div className="grid grid-cols-6 md:grid-cols-10 gap-2">
            {questions.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setCurrentQuestionIdx(idx)}
                className={`w-full aspect-square rounded-lg font-semibold transition-all ${
                  idx === currentQuestionIdx
                    ? 'bg-blue-500 text-white scale-110'
                    : answered.has(idx)
                    ? 'bg-green-500/50 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {idx + 1}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
