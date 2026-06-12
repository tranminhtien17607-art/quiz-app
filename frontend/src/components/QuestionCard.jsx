import { motion } from 'framer-motion';
import AnswerOption from './AnswerOption';

export default function QuestionCard({
  question,
  questionNumber,
  selectedAnswer,
  correctAnswer,
  onSelectAnswer,
  isAnswered,
}) {
  const options = Object.entries(question.options).map(([key, value]) => ({
    key,
    value,
  }));

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      {/* Question Text */}
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-white mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {question.question}
      </motion.h2>

      {/* Options */}
      <div className="space-y-4">
        {options.map((option, idx) => (
          <AnswerOption
            key={option.key}
            option={option}
            isSelected={selectedAnswer === option.key}
            isCorrect={correctAnswer === option.key}
            isWrong={selectedAnswer === option.key && correctAnswer !== option.key}
            showAnswer={isAnswered}
            onClick={() => onSelectAnswer(option.key)}
            disabled={isAnswered}
            delay={idx * 0.1}
          />
        ))}
      </div>

      {/* Feedback Message */}
      {isAnswered && (
        <motion.div
          className={`mt-8 p-4 rounded-lg text-center font-semibold ${
            selectedAnswer === correctAnswer
              ? 'bg-success-500/20 border border-success-400 text-success-200'
              : 'bg-danger-500/20 border border-danger-400 text-danger-200'
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {selectedAnswer === correctAnswer ? (
            <>✓ Correct! Well done!</>
          ) : (
            <>✗ Incorrect. The correct answer is <strong>{correctAnswer}</strong></>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
