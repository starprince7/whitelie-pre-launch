import mongoose, { Schema, Document, models } from 'mongoose';

export interface IWaitlist extends Document {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  userType: 'client' | 'provider' | 'both';
  ageRange?: '18-24' | '25-34' | '35-44' | '45-54' | '55+';
  location?: {
    state?: string;
    city?: string;
    country?: string;
  };
  providerInfo?: {
    experience?: 'beginner' | 'some_experience' | 'experienced' | 'professional';
    availability?: 'weekends' | 'weekdays' | 'evenings' | 'flexible';
    interests?: ('corporate' | 'social' | 'cultural' | 'family' | 'networking')[];
  };
  clientInfo?: {
    eventTypes?: ('weddings' | 'corporate' | 'social' | 'family' | 'networking' | 'cultural')[];
    frequency?: 'occasional' | 'monthly' | 'weekly' | 'as_needed';
  };
  source: 'landing_page' | 'email_campaign' | 'social_media' | 'referral' | 'survey';
  referralCode?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  emailOptIn: boolean;
  smsOptIn: boolean;
  status: 'active' | 'contacted' | 'converted' | 'unsubscribed';
  priority: 'high' | 'medium' | 'low';
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  lastContacted?: Date;
  convertedAt?: Date;
}

const waitlistSchema = new Schema<IWaitlist>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    firstName: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    phone: {
      type: String,
      trim: true,
    },
    userType: {
      type: String,
      enum: ['client', 'provider', 'both'],
      required: true,
    },
    ageRange: {
      type: String,
      enum: ['18-24', '25-34', '35-44', '45-54', '55+'],
    },
    location: {
      state: String,
      city: String,
      country: {
        type: String,
        default: 'Nigeria',
      },
    },
    providerInfo: {
      experience: {
        type: String,
        enum: ['beginner', 'some_experience', 'experienced', 'professional'],
      },
      availability: {
        type: String,
        enum: ['weekends', 'weekdays', 'evenings', 'flexible'],
      },
      interests: [
        {
          type: String,
          enum: ['corporate', 'social', 'cultural', 'family', 'networking'],
        },
      ],
    },
    clientInfo: {
      eventTypes: [
        {
          type: String,
          enum: ['weddings', 'corporate', 'social', 'family', 'networking', 'cultural'],
        },
      ],
      frequency: {
        type: String,
        enum: ['occasional', 'monthly', 'weekly', 'as_needed'],
      },
    },
    source: {
      type: String,
      enum: ['landing_page', 'email_campaign', 'social_media', 'referral', 'survey'],
      default: 'landing_page',
    },
    referralCode: String,
    utmSource: String,
    utmMedium: String,
    utmCampaign: String,
    emailOptIn: {
      type: Boolean,
      default: true,
    },
    smsOptIn: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'contacted', 'converted', 'unsubscribed'],
      default: 'active',
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium',
    },
    ipAddress: String,
    userAgent: String,
    lastContacted: Date,
    convertedAt: Date,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

waitlistSchema.index({ email: 1 });
waitlistSchema.index({ userType: 1 });
waitlistSchema.index({ createdAt: -1 });
waitlistSchema.index({ 'location.city': 1, 'location.state': 1 });
waitlistSchema.index({ status: 1 });

const Waitlist = models.Waitlist || mongoose.model<IWaitlist>('Waitlist', waitlistSchema);

export default Waitlist;
