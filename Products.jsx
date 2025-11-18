import React from 'react';

const Products = ({ onAddToCart }) => {
  const products = [
    {
      id: 1,
      title: 'Designer Silk Saree',
      image: 'saree.jpg',
      alt: 'Designer Saree',
      buyPrice: '₹2,999',
      rentPrice: '₹299/day',
      rating: '⭐⭐⭐⭐⭐',
      reviews: '(128 reviews)'
    },
    {
      id: 2,
      title: 'Denim Jacket',
      image: 'denim jacket.jpg',
      alt: 'Denim Jacket',
      buyPrice: '₹2,499',
      rentPrice: '₹299/day',
      rating: '⭐⭐⭐⭐⭐',
      reviews: '(89 reviews)'
    },
    {
      id: 3,
      title: 'Evening Gown',
      image: 'evening gown.jpg',
      alt: 'Evening Gown',
      buyPrice: '₹18,999',
      rentPrice: '₹1,899/day',
      rating: '⭐⭐⭐',
      reviews: '(256 reviews)'
    },
    {
      id: 4,
      title: 'Wedding Lehenga',
      image: 'Lehenga.jpg',
      alt: 'Wedding Lehenga',
      buyPrice: '₹45,999',
      rentPrice: '₹4,599/day',
      rating: '⭐⭐⭐⭐⭐',
      reviews: '(174 reviews)'
    },
    {
      id: 5,
      title: 'Premium Suit',
      image: 'suit.jpg',
      alt: 'Formal Suit',
      buyPrice: '₹25,999',
      rentPrice: '₹2,599/day',
      rating: '⭐⭐⭐⭐⭐',
      reviews: '(92 reviews)'
    },
    {
      id: 6,
      title: 'Party Dress',
      image: 'party dress.jpg',
      alt: 'Party Dress',
      buyPrice: '₹6,999',
      rentPrice: '₹699/day',
      rating: '⭐⭐⭐⭐⭐',
      reviews: '(203 reviews)'
    }
  ];

  return (
    <section className="products" id="products">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.alt} />
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <div className="price-options">
                  <div className="price-option active">
                    <div className="option-type">Buy</div>
                    <div className="option-price">{product.buyPrice}</div>
                  </div>
                  <div className="price-option">
                    <div className="option-type">Rent</div>
                    <div className="option-price">{product.rentPrice}</div>
                  </div>
                </div>
                <div className="product-rating">
                  <span className="stars">{product.rating}</span>
                  <span>{product.reviews}</span>
                </div>
                <button className="add-to-cart" onClick={() => onAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
