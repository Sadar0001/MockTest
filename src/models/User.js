// models/User.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  purchasedTests: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Test' 
  }],
  testAttempts: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'TestAttempt' 
  }]
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;