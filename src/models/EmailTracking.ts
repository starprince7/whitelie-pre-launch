import mongoose, { Schema, Document, models } from 'mongoose';

export interface IEmailTracking extends Document {
  campaignId: string;
  email: string;
  status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'unsubscribed';
  events: {
    type: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'unsubscribed';
    timestamp: Date;
    data?: any;
  }[];
  createdAt: Date;
}

const emailTrackingSchema = new Schema<IEmailTracking>(
  {
    campaignId: {
      type: String,
      required: true,
      ref: 'EmailCampaign',
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['sent', 'delivered', 'opened', 'clicked', 'bounced', 'unsubscribed'],
      default: 'sent',
    },
    events: [
      {
        type: {
          type: String,
          enum: ['sent', 'delivered', 'opened', 'clicked', 'bounced', 'unsubscribed'],
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        data: mongoose.Schema.Types.Mixed,
      },
    ],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

emailTrackingSchema.index({ campaignId: 1 });
emailTrackingSchema.index({ email: 1 });
emailTrackingSchema.index({ status: 1 });

const EmailTracking = models.EmailTracking || mongoose.model<IEmailTracking>('EmailTracking', emailTrackingSchema);

export default EmailTracking;
