// models/Question.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const questionSchema = new Schema({
  test: { 
    type: Schema.Types.ObjectId, 
    ref: 'Test',
    required: true
  },
  questionText: {
    type: String,
    required: [true, 'Question text is required']
  },
  options: {
    type: [String],
    required: [true, 'Options are required'],
    validate: {
      validator: function(v) {
        return v.length >= 2 && v.length <= 5;
      },
      message: 'Questions must have between 2-5 options'
    }
  },
  correctAnswer: {
    type: String,
    required: [true, 'Correct answer is required'],
    validate: {
      validator: function(v) {
        return this.options.includes(v);
      },
      message: 'Correct answer must be one of the provided options'
    }
  },
  points: {
    type: Number,
    default: 1,
    min: [1, 'Points must be at least 1']
  }
}, { 
  timestamps: true 
});

const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);
export default Question;