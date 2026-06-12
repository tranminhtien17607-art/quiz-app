import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function FileUpload({ onFileUpload }) {
  const [files, setFiles] = useState({ question: null, answer: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dragRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current?.classList.add('bg-blue-500/20', 'border-blue-400');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current?.classList.remove('bg-blue-500/20', 'border-blue-400');
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current?.classList.remove('bg-blue-500/20', 'border-blue-400');

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      setFiles(prev => ({
        ...prev,
        [type]: droppedFiles[0]
      }));
      setError(null);
    }
  };

  const handleFileChange = (e, type) => {
    if (e.target.files.length > 0) {
      setFiles(prev => ({
        ...prev,
        [type]: e.target.files[0]
      }));
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files.question || !files.answer) {
      setError('Please upload both files');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('question_file', files.question);
      formData.append('answer_file', files.answer);

      const response = await axios.post(
        'http://localhost:8000/api/parse-quiz',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      onFileUpload(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to parse files');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Question File */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            📋 Question File (.docx)
          </label>
          <motion.div
            ref={dragRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'question')}
            className="relative border-2 border-dashed border-gray-400 rounded-xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-blue-400 hover:bg-blue-500/10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="file"
              accept=".docx,.pdf,.txt"
              onChange={(e) => handleFileChange(e, 'question')}
              className="hidden"
              id="question-file"
            />
            <label htmlFor="question-file" className="cursor-pointer block">
              <div className="text-3xl mb-2">📁</div>
              <div className="text-white font-semibold">
                {files.question ? files.question.name : 'Drop or click to upload'}
              </div>
              <div className="text-gray-400 text-sm mt-2">
                {files.question ? '✓ Selected' : 'Drag & drop file here'}
              </div>
            </label>
          </motion.div>
        </div>

        {/* Answer File */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            ✅ Answer File (.docx with red text)
          </label>
          <motion.div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'answer')}
            className="relative border-2 border-dashed border-gray-400 rounded-xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-purple-400 hover:bg-purple-500/10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="file"
              accept=".docx,.pdf,.txt"
              onChange={(e) => handleFileChange(e, 'answer')}
              className="hidden"
              id="answer-file"
            />
            <label htmlFor="answer-file" className="cursor-pointer block">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-white font-semibold">
                {files.answer ? files.answer.name : 'Drop or click to upload'}
              </div>
              <div className="text-gray-400 text-sm mt-2">
                {files.answer ? '✓ Selected' : 'Drag & drop file here'}
              </div>
            </label>
          </motion.div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          className="bg-danger-500/20 border border-danger-400 text-danger-200 px-4 py-3 rounded-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ⚠️ {error}
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={loading || !files.question || !files.answer}
        className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading ? (
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ⏳ Processing...
          </motion.span>
        ) : (
          '🚀 Start Quiz'
        )}
      </motion.button>

      {/* Helper Text */}
      <p className="text-center text-gray-400 text-sm">
        ℹ️ Upload both files in .docx format. The answer file should have correct answers highlighted in red.
      </p>
    </motion.form>
  );
}
