// src/app/admin/question/addquestion/page.js
'use client';
import { useState, useEffect } from 'react';
import AnimatedBackground from '../../../../components/AnimatedBackground';
import { FiPlus, FiX, FiChevronDown } from 'react-icons/fi';

export default function AddQuestionPage() {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState('');
  const [questions, setQuestions] = useState([{
    questionText: '',
    options: ['', ''],
    correctAnswer: '',
    points: 1
  }]);

  useEffect(() => {
    const fetchTests = async () => {
      const res = await fetch('/api/test');
      const data = await res.json();
      setTests(data.tests || []);
    };
    fetchTests();
  }, []);

  const handleAddQuestion = () => {
    setQuestions([...questions, {
      questionText: '',
      options: ['', ''],
      correctAnswer: '',
      points: 1
    }]);
  };

  const handleRemoveQuestion = (index) => {
    if (questions.length > 1) {
      const updatedQuestions = [...questions];
      updatedQuestions.splice(index, 1);
      setQuestions(updatedQuestions);
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (qIndex) => {
    if (questions[qIndex].options.length < 5) {
      const updatedQuestions = [...questions];
      updatedQuestions[qIndex].options.push('');
      setQuestions(updatedQuestions);
    }
  };

  const handleRemoveOption = (qIndex, oIndex) => {
    if (questions[qIndex].options.length > 2) {
      const updatedQuestions = [...questions];
      updatedQuestions[qIndex].options.splice(oIndex, 1);
      setQuestions(updatedQuestions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTest) {
      alert('Please select a test first');
      return;
    }

    try {
      for (const question of questions) {
        if (!question.questionText || !question.correctAnswer || question.options.some(opt => !opt)) {
          throw new Error('All fields are required for each question');
        }
        
        await fetch('/api/question', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...question,
            test: selectedTest
          })
        });
      }
      
      alert('Questions added successfully!');
      setQuestions([{
        questionText: '',
        options: ['', ''],
        correctAnswer: '',
        points: 1
      }]);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <AnimatedBackground height="min-h-screen">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h1 className="text-3xl font-bold text-white text-center">Add Questions</h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-gray-800/70">
            {/* Test Selection */}
            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-medium">
                Select Test
              </label>
              <div className="relative">
                <select
                  value={selectedTest}
                  onChange={(e) => setSelectedTest(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/80 border border-gray-600 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a test...</option>
                  {tests.map(test => (
                    <option key={test._id} value={test._id}>{test.title}</option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Questions List */}
            {questions.map((question, qIndex) => (
              <div key={qIndex} className="space-y-4 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-200">Question {qIndex + 1}</h3>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(qIndex)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <FiX className="h-5 w-5" />
                    </button>
                  )}
                </div>

                {/* Question Text */}
                <div className="space-y-2">
                  <label className="block text-gray-300 text-sm font-medium">
                    Question Text
                  </label>
                  <input
                    type="text"
                    value={question.questionText}
                    onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/80 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter the question"
                  />
                </div>

                {/* Options */}
                <div className="space-y-2">
                  <label className="block text-gray-300 text-sm font-medium">
                    Options
                  </label>
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                        className="flex-1 px-4 py-2 bg-gray-700/80 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Option ${oIndex + 1}`}
                      />
                      {question.options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveOption(qIndex, oIndex)}
                          className="text-red-400 hover:text-red-300 p-2"
                        >
                          <FiX className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {question.options.length < 5 && (
                    <button
                      type="button"
                      onClick={() => handleAddOption(qIndex)}
                      className="text-blue-400 hover:text-blue-300 text-sm flex items-center mt-2"
                    >
                      <FiPlus className="h-4 w-4 mr-1" />
                      Add Option
                    </button>
                  )}
                </div>

                {/* Correct Answer */}
                <div className="space-y-2">
                  <label className="block text-gray-300 text-sm font-medium">
                    Correct Answer
                  </label>
                  <select
                    value={question.correctAnswer}
                    onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/80 border border-gray-600 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select correct answer</option>
                    {question.options.map((option, oIndex) => (
                      option && <option key={oIndex} value={option}>Option {oIndex + 1}</option>
                    ))}
                  </select>
                </div>

                {/* Points */}
                <div className="space-y-2">
                  <label className="block text-gray-300 text-sm font-medium">
                    Points
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={question.points}
                    onChange={(e) => handleQuestionChange(qIndex, 'points', parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-gray-700/80 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            ))}

            {/* Add Question Button */}
            <button
              type="button"
              onClick={handleAddQuestion}
              className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-blue-400 rounded-lg border border-dashed border-gray-500 flex items-center justify-center"
            >
              <FiPlus className="h-5 w-5 mr-2" />
              Add Another Question
            </button>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Save All Questions
              </button>
            </div>
          </form>
        </div>
      </div>
    </AnimatedBackground>
  );
}