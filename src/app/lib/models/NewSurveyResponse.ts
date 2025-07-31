import mongoose, { Schema, Document } from 'mongoose';

export interface ISurveyResponse extends Document {
  responseId: string;
  userType: 'client' | 'provider' | 'both' | 'undecided';
  eventAttendanceFrequency?: 'never' | 'rarely' | 'sometimes' | 'often' | 'always';
  eventTypes?: Array<'weddings' | 'corporate_events' | 'social_gatherings' | 'dates' | 'networking' | 'cultural_events' | 'other'>;
  hourlyRateComfort?: {
    client?: number;
    provider?: number;
  };
  providerIncomeInterest?: 'very_interested' | 'somewhat_interested' | 'not_interested' | 'need_more_info';
  expectedEarnings?: '1k-2k' | '2k-5k' | '5k-10k' | '10k+' | 'not_sure';
  safetyPriorities?: Array<'identity_verification' | 'background_checks' | 'in_app_messaging' | 'location_sharing' | 'review_system' | 'emergency_contacts'>;
  safetyComfortLevel?: number;
  betaInterest: boolean;
  email?: string;
  phone?: string;
  ageRange?: '18-24' | '25-34' | '35-44' | '45-54' | '55+';
  location?: { 
    state?: string; 
    city?: string; 
  };
  additionalFeedback?: string;
  source: 'direct' | 'email' | 'social' | 'referral';
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  completedAt?: Date;
  currentStep: number;
  isComplete: boolean;
}

const newSurveyResponseSchema = new Schema<ISurveyResponse>({
  responseId: { 
    type: String, 
    required: true, 
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString()
  },
  userType: { 
    type: String, 
    enum: ['client', 'provider', 'both', 'undecided'],
    required: true 
  },
  eventAttendanceFrequency: { 
    type: String, 
    enum: ['never', 'rarely', 'sometimes', 'often', 'always'] 
  },
  eventTypes: [{ 
    type: String, 
    enum: ['weddings', 'corporate_events', 'social_gatherings', 'dates', 'networking', 'cultural_events', 'other'] 
  }],
  hourlyRateComfort: {
    client: { type: Number },
    provider: { type: Number }
  },
  providerIncomeInterest: { 
    type: String, 
    enum: ['very_interested', 'somewhat_interested', 'not_interested', 'need_more_info'] 
  },
  expectedEarnings: { 
    type: String, 
    enum: ['1k-2k', '2k-5k', '5k-10k', '10k+', 'not_sure'] 
  },
  safetyPriorities: [{ 
    type: String, 
    enum: ['identity_verification', 'background_checks', 'in_app_messaging', 'location_sharing', 'review_system', 'emergency_contacts'] 
  }],
  safetyComfortLevel: { 
    type: Number, 
    min: 1, 
    max: 10 
  },
  betaInterest: { 
    type: Boolean, 
    required: true,
    default: false 
  },
  email: { 
    type: String,
    lowercase: true,
    trim: true
  },
  phone: { type: String },
  ageRange: { 
    type: String, 
    enum: ['18-24', '25-34', '35-44', '45-54', '55+'] 
  },
  location: {
    state: { type: String },
    city: { type: String }
  },
  additionalFeedback: { type: String },
  source: { 
    type: String, 
    enum: ['direct', 'email', 'social', 'referral'],
    required: true,
    default: 'direct'
  },
  ipAddress: { type: String },
  userAgent: { type: String },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  completedAt: { type: Date },
  currentStep: { 
    type: Number, 
    default: 1,
    min: 1
  },
  isComplete: { 
    type: Boolean, 
    default: false 
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
newSurveyResponseSchema.index({ createdAt: -1 });
newSurveyResponseSchema.index({ userType: 1 });
newSurveyResponseSchema.index({ isComplete: 1 });
newSurveyResponseSchema.index({ source: 1 });
newSurveyResponseSchema.index({ 'location.state': 1 });

const NewSurveyResponse = mongoose.models.NewSurveyResponse || 
  mongoose.model<ISurveyResponse>('NewSurveyResponse', newSurveyResponseSchema);

export default NewSurveyResponse;
