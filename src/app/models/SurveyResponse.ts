import mongoose, { Document, Schema } from 'mongoose';

export interface ISurveyResponse extends Document {
  // Response tracking
  responseId: string;
  
  // User segmentation
  userType: 'client' | 'provider' | 'both' | 'undecided';
  
  // Market validation questions
  eventAttendanceFrequency?: 'never' | 'rarely' | 'sometimes' | 'often' | 'always';
  eventTypes?: Array<'weddings' | 'corporate_events' | 'social_gatherings' | 'dates' | 'networking' | 'cultural_events' | 'other'>;
  
  // Pricing validation
  hourlyRateComfort?: {
    client?: number;
    provider?: number;
  };
  
  // Provider income interest
  providerIncomeInterest?: 'very_interested' | 'somewhat_interested' | 'not_interested' | 'need_more_info';
  expectedEarnings?: '1k-2k' | '2k-5k' | '5k-10k' | '10k+' | 'not_sure';
  
  // Safety concerns
  safetyPriorities?: Array<'identity_verification' | 'background_checks' | 'in_app_messaging' | 'location_sharing' | 'review_system' | 'emergency_contacts'>;
  safetyComfortLevel?: number;
  
  // Beta waitlist
  betaInterest: boolean;
  
  // Contact information (optional)
  email?: string;
  phone?: string;
  
  // Demographics (optional)
  ageRange?: '18-24' | '25-34' | '35-44' | '45-54' | '55+';
  location?: {
    state?: string;
    city?: string;
  };
  
  // Open feedback
  additionalFeedback?: string;
  
  // Metadata
  source: 'direct' | 'email' | 'social' | 'referral';
  ipAddress?: string;
  userAgent?: string;
  
  // Timestamps
  createdAt: Date;
  completedAt?: Date;
  
  // Survey flow tracking
  currentStep: number;
  isComplete: boolean;
}

const SurveyResponseSchema = new Schema<ISurveyResponse>(
  {
    // Response tracking
    responseId: {
      type: String,
      required: true,
      unique: true,
      default: () => new mongoose.Types.ObjectId().toString()
    },
    
    // User segmentation
    userType: {
      type: String,
      enum: ['client', 'provider', 'both', 'undecided'],
      required: true
    },
    
    // Market validation questions
    eventAttendanceFrequency: {
      type: String,
      enum: ['never', 'rarely', 'sometimes', 'often', 'always'],
      required: false
    },
    
    eventTypes: [{
      type: String,
      enum: ['weddings', 'corporate_events', 'social_gatherings', 'dates', 'networking', 'cultural_events', 'other']
    }],
    
    // Pricing validation
    hourlyRateComfort: {
      client: {
        type: Number,
        min: 0,
        max: 50000 // in Naira
      },
      provider: {
        type: Number, 
        min: 0,
        max: 50000 // in Naira
      }
    },
    
    // Provider income interest
    providerIncomeInterest: {
      type: String,
      enum: ['very_interested', 'somewhat_interested', 'not_interested', 'need_more_info'],
      required: false
    },
    
    expectedEarnings: {
      type: String,
      enum: ['1k-2k', '2k-5k', '5k-10k', '10k+', 'not_sure'],
      required: false
    },
    
    // Safety concerns
    safetyPriorities: [{
      type: String,
      enum: ['identity_verification', 'background_checks', 'in_app_messaging', 'location_sharing', 'review_system', 'emergency_contacts']
    }],
    
    safetyComfortLevel: {
      type: Number,
      min: 0, // Changed from 1 to 0 to allow for unselected state
      max: 5, // 1 = very uncomfortable, 5 = very comfortable
      required: false
    },
    
    // Beta waitlist
    betaInterest: {
      type: Boolean,
      default: false
    },
    
    // Contact information (optional)
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    
    phone: {
      type: String,
      trim: true
    },
    
    // Demographics (optional)
    ageRange: {
      type: String,
      enum: ['18-24', '25-34', '35-44', '45-54', '55+']
    },
    
    location: {
      state: String,
      city: String
    },
    
    // Open feedback
    additionalFeedback: {
      type: String,
      maxlength: 1000
    },
    
    // Metadata
    source: {
      type: String,
      enum: ['direct', 'email', 'social', 'referral'],
      default: 'direct'
    },
    
    ipAddress: String,
    userAgent: String,
    
    // Timestamps
    createdAt: {
      type: Date,
      default: Date.now
    },
    
    completedAt: Date,
    
    // Survey flow tracking
    currentStep: {
      type: Number,
      default: 1
    },
    
    isComplete: {
      type: Boolean,
      default: false
    }
  }
);

// Indexes for analytics
SurveyResponseSchema.index({ createdAt: -1 });
SurveyResponseSchema.index({ userType: 1 });
SurveyResponseSchema.index({ isComplete: 1 });
SurveyResponseSchema.index({ betaInterest: 1 });

export default mongoose.models.SurveyResponse || mongoose.model<ISurveyResponse>('SurveyResponse', SurveyResponseSchema);
