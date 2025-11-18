import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Clyra</h3>
            <p>Your fashion destination where style meets affordability. Buy or rent the latest trends and express your unique style.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#categories">Categories</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Size Guide</a></li>
              <li><a href="#">Track Order</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Connect</h3>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">YouTube</a></li>
              <li><a href="#">Newsletter</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Clyra. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
