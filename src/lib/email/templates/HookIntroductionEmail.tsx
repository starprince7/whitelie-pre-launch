import React from 'react';

interface HookIntroductionEmailProps {
  firstName?: string;
}

export default function HookIntroductionEmail({ firstName }: Readonly<HookIntroductionEmailProps>) {
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
  };

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
  };

  const boldStyle: React.CSSProperties = {
    fontWeight: 'bold',
    color: '#000'
  };

  const ctaButtonStyle: React.CSSProperties = {
    display: 'inline-block',
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '12px 25px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
    marginTop: '20px',
    textAlign: 'center' as const,
    width: '80%',
    margin: '20px auto',
  };

  const emojiStyle: React.CSSProperties = {
    fontSize: '18px',
    marginRight: '5px',
  };

  const footerStyle: React.CSSProperties = {
    marginTop: '30px',
    fontSize: '12px',
    color: '#999',
    textAlign: 'center' as const
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={headerStyle}>Hi {firstName || 'there'},</h1>
        
        <p style={pStyle}>
          You haven't actually earned ₦30,000 yet... but you could have! 😏
        </p>
        
        <p style={pStyle}>
          Need a perfect plus-one for that family dinner, work event, or wedding? Or want to earn money being someone's ideal event partner?
        </p>
        
        <p style={{...pStyle, ...boldStyle}}>
          <span>WhiteLie</span> - The world's first peer-to-peer platonic plus-one platform.
        </p>
        
        <p style={pStyle}>
          <span style={emojiStyle}>🎯</span> <strong>Need a plus-one?</strong> Hire a verified girlfriend or boyfriend for your events
        </p>
        <p style={pStyle}>
          <span style={emojiStyle}>💰</span> <strong>Want to earn?</strong> Make ₦30,000+ daily being someone's perfect plus-one
        </p>
        
        <p style={pStyle}>
          Most of our early users are successful singles, but there's absolutely room for non-singles too.
        </p>
        
        <p style={{...pStyle, ...boldStyle, textAlign: 'center' as const, marginTop: '20px'}}>
          Ready to never attend another event alone (or start earning from events)?
        </p>
        
        <div style={{textAlign: 'center' as const}}>
          <a href="https://whitelie.subber.net" target="_blank" rel="noopener noreferrer" style={ctaButtonStyle}>
            JOIN THE WAITLIST - GET EARLY ACCESS
          </a>
          <p style={{fontSize: '12px', color: '#777', marginTop: '-10px'}}>
            👆 <em>Click to visit whitelie.subber.net</em>
          </p>
        </div>
        
        <p style={pStyle}>
          Early members get free booking + priority matching.
        </p>
        
        <p style={pStyle}>
          The WhiteLie Team
        </p>
      </div>
      
      <div style={footerStyle}>
        <p>&copy; {new Date().getFullYear()} WhiteLie. All rights reserved.</p>
      </div>
    </div>
  );
}
