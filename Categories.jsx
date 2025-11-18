import React from 'react';

const Categories = () => {
  return (
    <section className="categories" id="categories">
      <div className="container">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-grid">
          <div className="category-card">
            <div className="category-icon">👗</div>
            <h3>Women's Wear</h3>
            <p>Elegant dresses, sarees & more</p>
          </div>
          <div className="category-card">
            <div className="category-icon">👔</div>
            <h3>Men's Wear</h3>
            <p>Formal & casual clothing</p>
          </div>
          <div className="category-card">
            <div className="category-icon">💍</div>
            <h3>Wedding Collection</h3>
            <p>Special occasion outfits</p>
          </div>
          <div className="category-card">
            <div className="category-icon">👶</div>
            <h3>Kids Fashion</h3>
            <p>Adorable outfits for children</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
