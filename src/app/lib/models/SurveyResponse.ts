import mongoose, { Schema } from 'mongoose';
import { ISurveyResponse } from '@/app/types';

// Define the SurveyResponse schema
const surveyResponseSchema = new Schema<ISurveyResponse>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    responses: {
      interestType: { 
        type: String, 
        enum: ['seeking', 'providing', 'both'],
        required: true 
      },
      eventCategories: [{ 
        type: String, 
        enum: ['family', 'professional', 'social', 'other'] 
      }],
      pricingSensitivity: {
        casualEvents: { type: Number, min: 30, max: 45 },
        semiFormalEvents: { type: Number, min: 45, max: 65 },
        formalEvents: { type: Number, min: 65, max: 85 }
      },
      availabilityPerWeek: { type: Number },
      experience: { 
        type: String, 
        enum: ['none', 'some', 'experienced'] 
      },
      safetyConcerns: [String],
      additionalComments: String
    },
    sentimentScore: { type: Number, default: 0 },
    completedAt: { type: Date, default: Date.now },
    processingStatus: { 
      type: String, 
      enum: ['pending', 'processed', 'flagged'],
      default: 'pending' 
    }
  }
);

// Create the model
const SurveyResponse = mongoose.models.SurveyResponse || 
  mongoose.model<ISurveyResponse>('SurveyResponse', surveyResponseSchema);

export default SurveyResponse;
