import { ObjectId } from 'mongoose';

// User Interface for email captures and survey responses
export interface IUser {
  _id: ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  source: string; // tracking source of signup
  surveyCompleted: boolean;
  surveyResponse?: ObjectId; // reference to SurveyResponse
  status: 'active' | 'inactive' | 'waitlisted';
  location?: {
    city: string;
    state: string;
    country: string;
  };
}

// Survey Response Schema
export interface ISurveyResponse {
  _id: ObjectId;
  userId: ObjectId;
  responses: {
    interestType: 'seeking' | 'providing' | 'both';
    eventCategories: Array<'family' | 'professional' | 'social' | 'other'>;
    pricingSensitivity: {
      casualEvents: number; // $30-45 range
      semiFormalEvents: number; // $45-65 range
      formalEvents: number; // $65-85 range
    };
    availabilityPerWeek: number; // hours
    experience: 'none' | 'some' | 'experienced';
    safetyConcerns: string[];
    additionalComments?: string;
  };
  sentimentScore: number; // automated sentiment analysis result
  completedAt: Date;
  processingStatus: 'pending' | 'processed' | 'flagged';
}

// Analytics Schema for dashboard metrics
export interface IAnalytics {
  _id: ObjectId;
  date: Date;
  metrics: {
    totalSignups: number;
    surveyCompletions: number;
    conversionRate: number;
    geographicDistribution: Map<string, number>;
    segmentationData: {
      seekers: number;
      providers: number;
      both: number;
    };
    sentimentAnalysis: {
      positive: number;
      neutral: number;
      negative: number;
    };
  };
  updatedAt: Date;
}
