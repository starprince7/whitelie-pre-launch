import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Email template for survey completion
export const sendCompletionEmail = async (email: string) => {
  try {
    const data = await resend.emails.send({
      from: 'WhiteLie <no-reply@whitelie.com>',
      to: email,
      subject: "Thanks for helping us build something amazing!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #000000;">Thank you for taking our survey!</h2>
          <p>We're building a platform that connects people for meaningful social experiences. Your feedback helps us create a service that truly serves your needs.</p>
          <p>We're building WhiteLie to provide professional platonic companionship services for events and social gatherings.</p>
          <div style="background-color: #FDCA64; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #000000; font-weight: bold; margin: 0;">We'll keep you updated on our progress!</p>
          </div>
          <p>If you have any questions, feel free to reach out to us at <a href="mailto:hello@whitelie.com" style="color: #FDCA64;">hello@whitelie.com</a>.</p>
        </div>
      `
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

// Email template for beta waitlist
export const sendBetaWaitlistEmail = async (email: string) => {
  try {
    const data = await resend.emails.send({
      from: 'WhiteLie <no-reply@whitelie.com>',
      to: email,
      subject: "You're on the list! Early access coming soon",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #000000;">You're on our beta waitlist!</h2>
          <p>Thank you for your interest in WhiteLie. We'll notify you as soon as our platform is ready for beta testing.</p>
          <div style="background-color: #FDCA64; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #000000; font-weight: bold; margin: 0;">Early access is coming soon!</p>
          </div>
          <p>As a beta tester, you'll get:</p>
          <ul>
            <li>First access to the platform</li>
            <li>Exclusive discounts and promotions</li>
            <li>Direct influence on our roadmap</li>
            <li>Priority support from our team</li>
          </ul>
          <p>If you have any questions, feel free to reach out to us at <a href="mailto:hello@whitelie.com" style="color: #FDCA64;">hello@whitelie.com</a>.</p>
        </div>
      `
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

// Email notification for admin
export const sendAdminNotification = async (responseData: any) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@whitelie.com';
    
    const data = await resend.emails.send({
      from: 'WhiteLie Survey <no-reply@whitelie.com>',
      to: adminEmail,
      subject: "New Survey Response Received",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #000000;">New Survey Response</h2>
          <p>A new survey response has been submitted with the following details:</p>
          <ul>
            <li><strong>User Type:</strong> ${responseData.userType}</li>
            <li><strong>Beta Interest:</strong> ${responseData.betaInterest ? 'Yes' : 'No'}</li>
            <li><strong>Email:</strong> ${responseData.email || 'Not provided'}</li>
            <li><strong>Response ID:</strong> ${responseData.responseId}</li>
          </ul>
          <p>View the full response in the <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/survey" style="color: #FDCA64;">admin dashboard</a>.</p>
        </div>
      `
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

// Email for weekly digest
export const sendWeeklyDigest = async (analyticsData: any) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@whitelie.com';
    
    const data = await resend.emails.send({
      from: 'WhiteLie Survey <no-reply@whitelie.com>',
      to: adminEmail,
      subject: "Weekly Survey Analytics Digest",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #000000;">Weekly Survey Analytics</h2>
          <p>Here's a summary of survey responses for the past week:</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Total Responses:</strong> ${analyticsData.totalResponses}</p>
            <p><strong>Completion Rate:</strong> ${analyticsData.completionRate}%</p>
            <p><strong>Beta Signups:</strong> ${analyticsData.betaSignups}</p>
            <p><strong>User Types:</strong></p>
            <ul>
              <li>Clients: ${analyticsData.userTypes.client}</li>
              <li>Providers: ${analyticsData.userTypes.provider}</li>
              <li>Both: ${analyticsData.userTypes.both}</li>
              <li>Undecided: ${analyticsData.userTypes.undecided}</li>
            </ul>
          </div>
          <p>View detailed analytics in the <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/analytics" style="color: #FDCA64;">admin dashboard</a>.</p>
        </div>
      `
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};
