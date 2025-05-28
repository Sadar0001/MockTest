// models/TestAttempt.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const answerSchema = new Schema({
  question: { 
    type: Schema.Types.ObjectId, 
    ref: 'Question',
    required: true
  },
  selectedAnswer: {
    type: String,
    required: true
  },
  isCorrect: Boolean,
  pointsEarned: Number
});

const testAttemptSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  test: { 
    type: Schema.Types.ObjectId, 
    ref: 'Test',
    required: true
  },
  answers: [answerSchema],
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date,
  timeSpent: Number, // in seconds
  score: {
    type: Number,
    default: 0
  },
  passed: Boolean,
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'timed-out'],
    default: 'in-progress'
  }
}, { 
  timestamps: true 
});

// Calculate score before saving
testAttemptSchema.pre('save', async function(next) {
  if (this.isModified('answers') && this.status === 'completed') {
    const Question = mongoose.model('Question');
    let score = 0;
    
    for (const answer of this.answers) {
      const question = await Question.findById(answer.question);
      answer.isCorrect = answer.selectedAnswer === question.correctAnswer;
      answer.pointsEarned = answer.isCorrect ? question.points : 0;
      score += answer.pointsEarned;
    }
    
    this.score = score;
    this.passed = this.score >= (this.score * 0.7); // Assuming 70% to pass
  }
  next();
});

const TestAttempt = mongoose.models.TestAttempt || mongoose.model('TestAttempt', testAttemptSchema);
export default TestAttempt;