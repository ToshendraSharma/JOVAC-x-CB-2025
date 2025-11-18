import React from 'react';

const Contact = () => {
  return (
    <section id="contact" style={{ background: 'rgba(248,249,250,0.97)', padding: '60px 0' }}>
      <div className="container">
        <h2 className="section-title">Contact</h2>
        <p style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', fontSize: '1.1rem' }}>
          Have questions or need help? Reach out to us at{' '}
          <a href="mailto:support@clyra.com" style={{ color: '#764ba2', textDecoration: 'underline' }}>
            support@clyra.com
          </a>{' '}
          or fill out the form below.
        </p>
        <form style={{ maxWidth: '400px', margin: '2rem auto 0', textAlign: 'left' }}>
          <input
            type="text"
            placeholder="Your Name"
            required
            style={{
              width: '100%',
              padding: '0.7rem',
              marginBottom: '1rem',
              borderRadius: '6px',
              border: '1px solid #ccc'
            }}
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            style={{
              width: '100%',
              padding: '0.7rem',
              marginBottom: '1rem',
              borderRadius: '6px',
              border: '1px solid #ccc'
            }}
          />
          <textarea
            placeholder="Your Message"
            required
            style={{
              width: '100%',
              padding: '0.7rem',
              marginBottom: '1rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              minHeight: '80px'
            }}
          ></textarea>
          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg,#667eea,#764ba2)',
              color: '#fff',
              padding: '0.7rem 2rem',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
