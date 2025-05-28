// src/app/admin/question/updatequestion/page.js
'use client';
import { useState, useEffect } from 'react';
import AnimatedBackground from '../../../../components/AnimatedBackground';
import { FiEdit, FiSearch, FiChevronDown, FiSave ,FiX, FiPlus} from 'react-icons/fi';

export default function UpdateQuestionPage() {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState('');
  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    questionText: '',
    options: [],
    correctAnswer: '',
    points: 1
  });

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

  const handleEdit = (question) => {
    setEditingId(question._id);
    setEditForm({
      questionText: question.questionText,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
      points: question.points
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleEditChange = (field, value) => {
    setEditForm({ ...editForm, [field]: value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...editForm.options];
    newOptions[index] = value;
    setEditForm({ ...editForm, options: newOptions });
  };

  const handleAddOption = () => {
    if (editForm.options.length < 5) {
      setEditForm({ ...editForm, options: [...editForm.options, ''] });
    }
  };

  const handleRemoveOption = (index) => {
    if (editForm.options.length > 2) {
      const newOptions = [...editForm.options];
      newOptions.splice(index, 1);
      setEditForm({ ...editForm, options: newOptions });
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/question', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          _id: editingId,
          ...editForm 
        })
      });
      const data = await res.json();
      
      if (data.success) {
        setQuestions(questions.map(q => 
          q._id === editingId ? data.question : q
        ));
        setEditingId(null);
        alert('Question updated successfully');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const filteredQuestions = questions.filter(question =>
    question.questionText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatedBackground height="min-h-screen">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-6">
            <h1 className="text-3xl font-bold text-white text-center">Update Questions</h1>
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
                  className="w-full px-4 py-3 bg-gray-700/80 border border-gray-600 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/80 border border-gray-600 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                      {editingId === question._id ? (
                        <div className="space-y-4">
                          {/* Edit Form */}
                          <div className="space-y-2">
                            <label className="block text-gray-300 text-sm font-medium">
                              Question Text
                            </label>
                            <input
                              type="text"
                              value={editForm.questionText}
                              onChange={(e) => handleEditChange('questionText', e.target.value)}
                              className="w-full px-4 py-2 bg-gray-700/80 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-gray-300 text-sm font-medium">
                              Options
                            </label>
                            {editForm.options.map((option, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => handleOptionChange(index, e.target.value)}
                                  className="flex-1 px-4 py-2 bg-gray-700/80 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                />
                                {editForm.options.length > 2 && (
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveOption(index)}
                                    className="text-red-400 hover:text-red-300 p-1"
                                  >
                                    <FiX className="h-4 w-4" />
                                  </button>
                                )}
                              </div>
                            ))}
                            {editForm.options.length < 5 && (
                              <button
                                type="button"
                                onClick={handleAddOption}
                                className="text-yellow-400 hover:text-yellow-300 text-sm flex items-center mt-2"
                              >
                                <FiPlus className="h-4 w-4 mr-1" />
                                Add Option
                              </button>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label className="block text-gray-300 text-sm font-medium">
                              Correct Answer
                            </label>
                            <select
                              value={editForm.correctAnswer}
                              onChange={(e) => handleEditChange('correctAnswer', e.target.value)}
                              className="w-full px-4 py-2 bg-gray-700/80 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            >
                              <option value="">Select correct answer</option>
                              {editForm.options.map((option, index) => (
                                option && <option key={index} value={option}>Option {index + 1}</option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-gray-300 text-sm font-medium">
                              Points
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={editForm.points}
                              onChange={(e) => handleEditChange('points', parseInt(e.target.value))}
                              className="w-full px-4 py-2 bg-gray-700/80 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            />
                          </div>

                          <div className="flex justify-end space-x-2 pt-2">
                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleSave}
                              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg flex items-center"
                            >
                              <FiSave className="h-4 w-4 mr-1" />
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
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
                            onClick={() => handleEdit(question)}
                            className="text-yellow-400 hover:text-yellow-300 p-2"
                          >
                            <FiEdit className="h-5 w-5" />
                          </button>
                        </div>
                      )}
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