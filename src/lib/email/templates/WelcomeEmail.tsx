import React from 'react';

interface WelcomeEmailProps {
  firstName?: string;
}

export default function WelcomeEmail({ firstName }: Readonly<WelcomeEmailProps>) {
  const containerStyle: React.CSSProperties = {
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    color: '#333',
    backgroundColor: '#f9f9f9',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '30px',
  };

  const contentStyle: React.CSSProperties = {
      backgroundColor: '#ffffff',
      padding: '30px',
      borderRadius: '8px',
      border: '1px solid #ddd'
  }

  const headerStyle: React.CSSProperties = {
    fontSize: '24px',
    color: '#000000',
    marginBottom: '20px',
    borderBottom: '2px solid #FDCA64',
    paddingBottom: '10px'
  };
  
  const pStyle: React.CSSProperties = {
      marginBottom: '15px',
      color: '#555'
  }

  const footerStyle: React.CSSProperties = {
      marginTop: '30px',
      fontSize: '12px',
      color: '#999',
      textAlign: 'center'
  }

  return (
    <div style={containerStyle}>
        <div style={contentStyle}>
            <h1 style={headerStyle}>Welcome to WhiteLie, {firstName || 'Professional'}!</h1>
            <p style={pStyle}>
                Thank you for confirming your registration for the WhiteLie professional services waitlist. We're thrilled to have you as part of our growing network.
            </p>
            <p style={pStyle}>
                We are building a premier platform that connects clients with verified professional companions for business, social, and networking events. Our focus is on safety, professionalism, and creating valuable opportunities.
            </p>
            <p style={pStyle}>
                You'll be among the first to receive updates on our platform launch, exclusive access, and more details about our verification process.
            </p>
            <p>
                Best regards,
                <br />
                <strong>The WhiteLie Team</strong>
            </p>
        </div>
        <div style={footerStyle}>
            <p>You received this email because you joined the waitlist at whitelie.com.</p>
            <p>&copy; {new Date().getFullYear()} WhiteLie. All rights reserved.</p>
        </div>
    </div>
  );
}
