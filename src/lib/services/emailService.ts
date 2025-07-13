import { Resend } from 'resend';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

if (!fromEmail) {
  throw new Error('FROM_EMAIL environment variable is not set');
}

interface EmailOptions {
  to: string;
  subject: string;
  react: React.ReactElement;
}

export const sendEmail = async ({ to, subject, react }: EmailOptions) => {
  try {
    const { data, error } = await resend.emails.send({
      from: `WhiteLie <${fromEmail}>`,
      to,
      subject,
      react,
    });

    if (error) {
      console.error('Error sending email:', error);
      // In a real app, you'd want more robust error handling, like logging to a service
      return { success: false, error };
    }

    return { success: true, data };
  } catch (exception) {
    console.error('An exception occurred while sending email:', exception);
    return { success: false, error: exception };
  }
};
