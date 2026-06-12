import { motion } from 'framer-motion';

export default function AnswerOption({
  option,
  isSelected,
  isCorrect,
  isWrong,
  showAnswer,
  onClick,
  disabled,
  delay,
}) {
  let bgColor = 'bg-gray-700 hover:bg-gray-600';
  let borderColor = 'border-gray-600';

  if (showAnswer) {
    if (isCorrect) {
      bgColor = 'bg-success-500/30';
      borderColor = 'border-success-400';
    } else if (isWrong) {
      bgColor = 'bg-danger-500/30';
      borderColor = 'border-danger-400';
    }
  } else if (isSelected) {
    bgColor = 'bg-blue-500/30';
    borderColor = 'border-blue-400';
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-4 border-2 rounded-xl text-left font-semibold text-white transition-all ${
        bgColor
      } ${
        borderColor
      } ${
        disabled && !showAnswer ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={!disabled ? { scale: 1.02, x: 10 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      <div className="flex items-center gap-4">
        <motion.div
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
            isCorrect
              ? 'bg-success-500 border-success-400 text-white'
              : isWrong
              ? 'bg-danger-500 border-danger-400 text-white'
              : isSelected
              ? 'bg-blue-500 border-blue-400 text-white'
              : 'border-gray-400 text-gray-400'
          }`}
          animate={{
            scale: isCorrect ? [1, 1.2, 1] : isWrong ? { rotate: 360 } : 1,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          {isCorrect ? '✓' : isWrong ? '✗' : option.key}
        </motion.div>

        <span className="flex-1">{option.value}</span>

        {isCorrect && (
          <motion.span
            className="text-2xl"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            ✓
          </motion.span>
        )}
      </div>
    </motion.button>
  );
}
