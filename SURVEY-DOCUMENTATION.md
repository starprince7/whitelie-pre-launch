# WhiteLie Market Validation Survey Documentation

This document provides comprehensive instructions for administering the WhiteLie market validation survey, managing responses, and analyzing the collected data.

## Table of Contents
1. [Overview](#overview)
2. [Setup and Configuration](#setup-and-configuration)
3. [Survey Features](#survey-features)
4. [Administration Panel](#administration-panel)
5. [Analytics Dashboard](#analytics-dashboard)
6. [Security & GDPR Compliance](#security--gdpr-compliance)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

## Overview

The WhiteLie market validation survey is designed to collect feedback from potential users about the platonic companionship services platform. It validates market demand, segments users, tests pricing strategies, assesses safety concerns, and builds a beta waitlist.

### Key Objectives
- Validate market demand for platonic companionship services
- Segment potential users (clients, providers, or both)
- Test various pricing models and discover optimal price points
- Assess safety concerns and prioritize platform safety features
- Build a waitlist for the beta launch

## Setup and Configuration

### Prerequisites
- Node.js 18.0+
- MongoDB database
- Resend API account

### Environment Variables
Create a `.env.local` file with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=admin@whitelie.com
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Installation & Deployment
1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Build for production: `npm run build`
5. Start production server: `npm start`

## Survey Features

### Multi-Step Form Flow
The survey consists of six steps:
1. **User Type Selection**: Segments users as clients, providers, both, or undecided
2. **Market Validation**: Conditional questions based on user type
3. **Event Types**: Selection of event types users are interested in
4. **Pricing**: Tests price points based on user type
5. **Safety Concerns**: Assesses safety priorities and comfort level
6. **Beta Waitlist**: Collects contact information and demographic data

### Progressive Saving
- Survey responses are saved incrementally after each step
- Users can resume their survey if they leave before completion
- Each response is assigned a unique ID for tracking

### Email Notifications
The survey sends several types of emails:
- **Completion Confirmation**: Sent to users who complete the survey
- **Beta Waitlist Confirmation**: Sent to users who opt into the beta waitlist
- **Admin Notification**: Sent to administrators when new responses are submitted

## Administration Panel

### Accessing the Admin Panel
Navigate to `/admin/survey` to view and manage survey responses.

### Response Management Features
- **Filtering**: Filter responses by user type, completion status, and beta interest
- **Sorting**: Sort by creation date, completion status, or other fields
- **Pagination**: Navigate through multiple pages of responses
- **Detailed View**: View complete details for individual responses
- **Export**: Export responses as CSV or JSON for further analysis

## Analytics Dashboard

### Accessing the Dashboard
Navigate to `/admin/analytics` to view the survey analytics dashboard.

### Key Metrics
- **Total Responses**: Track total number of responses and completion rate
- **User Type Distribution**: Breakdown of user types (client, provider, both, undecided)
- **Pricing Preferences**: Analysis of price point preferences
- **Safety Priorities**: Ranking of safety features by importance
- **Geographic Distribution**: Map of response locations
- **Survey Funnel Analysis**: Step-by-step completion rates

## Security & GDPR Compliance

### Data Protection
- **Rate Limiting**: Prevents abuse through IP-based rate limiting
- **Data Encryption**: Sensitive data is encrypted at rest and in transit
- **Access Control**: Admin panel requires authentication

### GDPR Compliance
- **Privacy Consent**: Users must accept privacy policy before taking the survey
- **Data Retention**: Personal data is retained for 12 months, then anonymized
- **Right to Access/Erase**: Users can request data access or deletion
- **Data Minimization**: Only necessary data is collected

## Best Practices

### Survey Distribution
- **Social Media**: Share survey link on WhiteLie's social media channels
- **Email Campaigns**: Send targeted emails to potential users
- **Partner Networks**: Distribute through partner channels
- **QR Codes**: Use QR codes at events to direct people to the survey

### Response Analysis
- **Regular Monitoring**: Check responses daily during the campaign
- **Weekly Reporting**: Generate weekly summary reports
- **Iterative Improvement**: Use insights to refine product strategy
- **Segment Analysis**: Analyze differences between user segments

## Troubleshooting

### Common Issues
- **Database Connection**: Ensure MongoDB URI is correct and accessible
- **Email Failures**: Check Resend API key and quota
- **Rate Limiting**: Adjust rate limit parameters in middleware if needed
- **Browser Compatibility**: Ensure survey works across modern browsers

### Support
For technical support, contact the development team at dev@whitelie.com.

---

© 2025 WhiteLie. All rights reserved.
