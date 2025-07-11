import mongoose, { Schema } from 'mongoose';
import { IUser } from '@/app/types';

// Define the User schema
const userSchema = new Schema<IUser>(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      lowercase: true
    },
    source: { 
      type: String, 
      required: true, 
      default: 'direct' 
    },
    surveyCompleted: { 
      type: Boolean, 
      default: false 
    },
    surveyResponse: { 
      type: Schema.Types.ObjectId, 
      ref: 'SurveyResponse' 
    },
    status: { 
      type: String, 
      enum: ['active', 'inactive', 'waitlisted'],
      default: 'active' 
    },
    location: {
      city: String,
      state: String,
      country: String
    }
  }, 
  { 
    timestamps: true 
  }
);

// Create the model
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
