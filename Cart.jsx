
import React, { useState, useMemo } from "react";
import Cart from "./Cart";

export default function App() {
 
  const [cartItems, setCartItems] = useState([
    { id: 1, title: "Hand-Painted Ceramic Mug", buyPrice: "₹399", quantity: 1, image: "" },
    { id: 2, title: "Cozy Blanket", buyPrice: "₹1,299", quantity: 1, image: "" }
  ]);

  
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, it) => {
      const price = parseInt(String(it.buyPrice).replace(/[^0-9]/g, "")) || 0;
      return sum + price * (it.quantity || 1);
    }, 0);
  }, [cartItems]);

  const handleUpdateQuantity = (id, newQty) => {
    setCartItems(prev => prev.map(it => it.id === id ? { ...it, quantity: Math.max(1, newQty) } : it));
  };

  const handleRemove = (id) => {
    setCartItems(prev => prev.filter(it => it.id !== id));
  };

  const handleCloseCart = () => {
  
  };


  const handleCheckout = async () => {
    if (!cartItems || cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    const orderData = {
      items: cartItems.map(i => ({
        id: i.id,
        title: i.title,
        price: parseInt(String(i.buyPrice).replace(/[^0-9]/g, "")) || 0,
        qty: i.quantity
      })),
      subtotal
    };

    try {
    
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Checkout failed");

      alert(`Order placed! Order ID: ${data.orderId}`);
      
      setCartItems([]);
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Checkout failed: " + err.message);
    }
  };

  return (
    <div>
      <h1>Your Store</h1>
      {    }
      <Cart
        cartItems={cartItems}
        onClose={handleCloseCart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
        subtotal={subtotal}
        isEmpty={cartItems.length === 0}
        onCheckout={handleCheckout}    
      />
    </div>
  );
}
