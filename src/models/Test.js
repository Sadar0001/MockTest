// models/Test.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const testSchema = new Schema({
  title: { type: String, required: [true, 'Test title is required'], trim: true },
  category: { type: String, enum: ['math', 'science', 'history', 'language'], required: [true, 'Category is required'] },
  price: { type: Number, default: 0, min: [0, 'Price cannot be negative'] },
  description: String,
  duration: { type: Number, default: 60 },
  image: { type: String, default: '', trim: true }, // 🔥 added image field here
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Test = mongoose.models.Test || mongoose.model('Test', testSchema);
export default Test;