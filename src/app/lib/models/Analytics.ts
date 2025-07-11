import mongoose, { Schema } from 'mongoose';
import { IAnalytics } from '@/app/types';

// Define the Analytics schema
const analyticsSchema = new Schema<IAnalytics>(
  {
    date: { 
      type: Date, 
      required: true,
      default: Date.now 
    },
    metrics: {
      totalSignups: { 
        type: Number, 
        default: 0 
      },
      surveyCompletions: { 
        type: Number, 
        default: 0 
      },
      conversionRate: { 
        type: Number, 
        default: 0 
      },
      geographicDistribution: {
        type: Map,
        of: Number
      },
      segmentationData: {
        seekers: { 
          type: Number, 
          default: 0 
        },
        providers: { 
          type: Number, 
          default: 0 
        },
        both: { 
          type: Number, 
          default: 0 
        }
      },
      sentimentAnalysis: {
        positive: { 
          type: Number, 
          default: 0 
        },
        neutral: { 
          type: Number, 
          default: 0 
        },
        negative: { 
          type: Number, 
          default: 0 
        }
      }
    },
    updatedAt: { 
      type: Date, 
      default: Date.now 
    }
  }
);

// Create the model
const Analytics = mongoose.models.Analytics || 
  mongoose.model<IAnalytics>('Analytics', analyticsSchema);

export default Analytics;
