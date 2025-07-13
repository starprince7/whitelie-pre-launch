import mongoose, { Schema, Document, models } from 'mongoose';

export interface IEmailCampaign extends Document {
  campaignId: string;
  name: string;
  subject: string;
  template: string;
  targetSegment: 'all' | 'clients' | 'providers' | 'both' | 'custom';
  customFilters?: {
    location?: {
      states?: string[];
      cities?: string[];
    };
    ageRange?: string[];
    userType?: string[];
    source?: string[];
  };
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'completed';
  scheduledFor?: Date;
  metrics: {
    totalRecipients: number;
    sentCount: number;
    deliveredCount: number;
    openCount: number;
    clickCount: number;
    unsubscribeCount: number;
    conversions: number;
  };
  createdAt: Date;
  sentAt?: Date;
  completedAt?: Date;
}

const emailCampaignSchema = new Schema<IEmailCampaign>(
  {
    campaignId: {
      type: String,
      required: true,
      unique: true,
      default: () => `campaign_${Date.now()}`,
    },
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    template: {
      type: String,
      required: true,
    },
    targetSegment: {
      type: String,
      enum: ['all', 'clients', 'providers', 'both', 'custom'],
      default: 'all',
    },
    customFilters: {
      location: {
        states: [String],
        cities: [String],
      },
      ageRange: [String],
      userType: [String],
      source: [String],
    },
    status: {
      type: String,
      enum: ['draft', 'scheduled', 'sending', 'sent', 'completed'],
      default: 'draft',
    },
    scheduledFor: Date,
    metrics: {
      totalRecipients: {
        type: Number,
        default: 0,
      },
      sentCount: {
        type: Number,
        default: 0,
      },
      deliveredCount: {
        type: Number,
        default: 0,
      },
      openCount: {
        type: Number,
        default: 0,
      },
      clickCount: {
        type: Number,
        default: 0,
      },
      unsubscribeCount: {
        type: Number,
        default: 0,
      },
      conversions: {
        type: Number,
        default: 0,
      },
    },
    sentAt: Date,
    completedAt: Date,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const EmailCampaign = models.EmailCampaign || mongoose.model<IEmailCampaign>('EmailCampaign', emailCampaignSchema);

export default EmailCampaign;
