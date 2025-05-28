// src/app/admin/question/removequestion/page.js
'use client';
import { useState, useEffect } from 'react';
import AnimatedBackground from '../../../../components/AnimatedBackground';
import { FiTrash2, FiSearch, FiChevronDown } from 'react-icons/fi';

export default function RemoveQuestionPage() {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState('');
  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTests = async () => {
      const res = await fetch('/api/test');
      const data = await res.json();
      setTests(data.tests || []);
    };
    fetchTests();
  }, []);

  useEffect(() => {
    if (selectedTest) {
      const fetchQuestions = async () => {
        const res = await fetch(`/api/question?testId=${selectedTest}`);
        const data = await res.json();
        setQuestions(data.questions || []);
      };
      fetchQuestions();
    }
  }, [selectedTest]);

  const handleDelete = async (questionId) => {
    if (confirm('Are you sure you want to delete this question?')) {
      try {
        const res = await fetch('/api/question', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _id: questionId })
        });
        const data = await res.json();
        
        if (data.success) {
          setQuestions(questions.filter(q => q._id !== questionId));
          alert('Question deleted successfully');
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  const filteredQuestions = questions.filter(question =>
    question.questionText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatedBackground height="min-h-screen">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6">
            <h1 className="text-3xl font-bold text-white text-center">Remove Questions</h1>
          </div>

          <div className="p-6 space-y-6 bg-gray-800/70">
            {/* Test Selection */}
            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-medium">
                Select Test
              </label>
              <div className="relative">
                <select
                  value={selectedTest}
                  onChange={(e) => setSelectedTest(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/80 border border-gray-600 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Select a test...</option>
                  {tests.map(test => (
                    <option key={test._id} value={test._id}>{test.title}</option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Search */}
            {selectedTest && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-300" />
                </div>
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/80 border border-gray-600 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Questions List */}
            {selectedTest && (
              <div className="space-y-4">
                {filteredQuestions.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">
                    {questions.length === 0 ? 'No questions found for this test' : 'No matching questions found'}
                  </p>
                ) : (
                  filteredQuestions.map(question => (
                    <div key={question._id} className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-200">{question.questionText}</h3>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-400">
                              Options: {question.options.join(', ')}
                            </p>
                            <p className="text-sm text-green-400">
                              Correct Answer: {question.correctAnswer}
                            </p>
                            <p className="text-sm text-blue-400">
                              Points: {question.points}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete(question._id)}
                          className="text-red-400 hover:text-red-300 p-2"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
}