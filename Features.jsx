import React from 'react';

const Features = () => {
  return (
    <section className="features">
      <div className="container">
        <h2 className="section-title">Why Choose Clyra?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">🚚</div>
            <h3>Free Shipping</h3>
            <p>Free shipping on orders over ₹999. Fast and reliable delivery across India.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">👗</div>
            <h3>Rent Fashion</h3>
            <p>Rent designer clothes for special occasions. Look stunning without breaking the bank.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">↩️</div>
            <h3>Easy Returns</h3>
            <p>30-day return policy. Not satisfied? Return it for a full refund.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎧</div>
            <h3>24/7 Support</h3>
            <p>Our customer service team is available 24/7 to help you with any questions.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
