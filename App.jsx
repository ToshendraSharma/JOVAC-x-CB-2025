import React, { useState, useCallback, useMemo } from 'react';
import { ShoppingCart, X, Plus, Minus, CheckCircle, Gift, Truck } from 'lucide-react';


const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};


const MOCK_PRODUCTS = [
    { id: 1, name: "Hand-Painted Ceramic Mug", description: "Ethically sourced clay, perfect for morning coffee.", buyPrice: "₹ 550", image: "https://placehold.co/300x200/4F46E5/ffffff?text=MUG", category: "Kitchen" },
    { id: 2, name: "Organic Cotton Throw Blanket", description: "Woven by local artisans, soft and hypoallergenic.", buyPrice: "₹ 2,900", image: "https://placehold.co/300x200/10B981/ffffff?text=BLANKET", category: "Textiles" },
    { id: 3, name: "Sandalwood Incense Sticks", description: "Natural fragrance for meditation and relaxation.", buyPrice: "₹ 350", image: "https://placehold.co/300x200/F59E0B/ffffff?text=INCENSE", category: "Wellness" },
    { id: 4, name: "Brass Ganesha Sculpture", description: "Intricate detailing, a symbol of good fortune.", buyPrice: "₹ 4,800", image: "https://placehold.co/300x200/EF4444/ffffff?text=SCULPTURE", category: "Decor" },
    { id: 5, name: "Leather Tote Bag (Vegetable-Tanned)", description: "Durable and stylish, large capacity.", buyPrice: "₹ 7,500", image: "https://placehold.co/300x200/6B7280/ffffff?text=BAG", category: "Accessories" },
    { id: 6, name: "Assam Black Tea (500g)", description: "Strong, malty flavor, single-estate origin.", buyPrice: "₹ 680", image: "https://placehold.co/300x200/3B82F6/ffffff?text=TEA", category: "Food" },
];

const MOCK_CATEGORIES = [
    "All Products", "Decor", "Textiles", "Kitchen", "Wellness", "Accessories", "Food"
];



const Header = ({ cartCount, onCartClick }) => (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center max-w-7xl">
            <h1 className="text-3xl font-extrabold text-indigo-700 font-inter tracking-tight">Clyra</h1>
            <nav className="hidden md:flex space-x-8 text-gray-600">
                {['Home', 'Categories', 'Products', 'About', 'Contact'].map(item => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-indigo-600 transition duration-150 font-medium">{item}</a>
                ))}
            </nav>
            <div className="flex items-center space-x-4">
                <button onClick={onCartClick} className="relative p-2 bg-indigo-50 hover:bg-indigo-100 rounded-full transition duration-150">
                    <ShoppingCart className="w-6 h-6 text-indigo-700" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </div>
    </header>
);

const Hero = () => (
    <section id="home" className="pt-24 pb-16 bg-indigo-50 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
            <div className="bg-white p-8 md:p-16 rounded-3xl shadow-2xl">
                <h2 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-4">
                    Handcrafted Goods, <span className="text-indigo-600">Ethically Sourced.</span>
                </h2>
                <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                    Discover unique pieces from local artisans, bringing heritage and quality craftsmanship into your home.
                </p>
                <a href="#products" className="inline-block px-10 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-full hover:bg-indigo-700 transition duration-300 transform hover:scale-105 shadow-lg">
                    Shop the Collection
                </a>
            </div>
        </div>
    </section>
);

const Categories = () => (
    <section id="categories" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Shop By Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
                {MOCK_CATEGORIES.map(category => (
                    <div key={category} className="p-4 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center cursor-pointer hover:bg-indigo-50">
                        <p className="font-semibold text-gray-700">{category}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const ProductCard = ({ product, onAddToCart }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300 flex flex-col">
        <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover object-center"
            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/300x200/E0E7FF/4F46E5?text=${product.category}`; }}
        />
        <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-3 flex-grow">{product.description}</p>
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                <span className="text-2xl font-extrabold text-indigo-600">{product.buyPrice}</span>
                <button
                    onClick={() => onAddToCart(product)}
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:bg-indigo-700 transition duration-300 shadow-md transform hover:scale-105"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
);

const Products = ({ onAddToCart }) => (
    <section id="products" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">Our Featured Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_PRODUCTS.map(product => (
                    <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                ))}
            </div>
        </div>
    </section>
);

const About = () => (
    <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Our Commitment to Craftsmanship</h2>
            <div className="max-w-4xl mx-auto text-center text-gray-600 text-lg space-y-6">
                <p>Clyra was founded on the belief that beautiful design should not come at the expense of ethical production. We partner directly with artisan collectives across India, ensuring fair wages, safe working conditions, and sustainable practices.</p>
                <p>Every piece in our collection tells a story—a story of heritage techniques, responsible sourcing, and genuine human connection. When you shop with Clyra, you support not just a business, but a vibrant ecosystem of creators.</p>
                <div className="flex justify-center space-x-8 pt-6">
                    <div className="text-indigo-600 font-semibold">100% Fair Trade</div>
                    <div className="text-indigo-600 font-semibold">Sustainable Materials</div>
                    <div className="text-indigo-600 font-semibold">Direct Artisan Partnerships</div>
                </div>
            </div>
        </div>
    </section>
);

const Contact = () => (
    <section id="contact" className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">Get In Touch</h2>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="Your Name" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea id="message" rows="4" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="How can we help you?" />
                    </div>
                    <button type="submit" className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition duration-300 shadow-md">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    </section>
);

const Features = () => (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Why Choose Clyra?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6 bg-gray-50 rounded-xl shadow-md">
                    <Truck className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Fast & Free Shipping</h3>
                    <p className="text-gray-600">Free delivery on all orders over ₹ 2,000 across India.</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl shadow-md">
                    <CheckCircle className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
                    <p className="text-gray-600">Every product is hand-checked for quality before shipping.</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl shadow-md">
                    <Gift className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Eco-Friendly Packaging</h3>
                    <p className="text-gray-600">We use biodegradable and recycled materials for all packaging.</p>
                </div>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h4 className="text-xl font-bold mb-4 text-indigo-400">Clyra</h4>
                    <p className="text-sm text-gray-400">Bringing artistry to your everyday life.</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#about" className="hover:text-indigo-400 transition">About Us</a></li>
                        <li><a href="#products" className="hover:text-indigo-400 transition">Shop</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Support</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#contact" className="hover:text-indigo-400 transition">Contact</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition">Shipping</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition">Returns</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                    {  }
                    <div className="flex space-x-4 text-gray-400">
                        <a href="#" className="hover:text-indigo-400 transition">FB</a>
                        <a href="#" className="hover:text-indigo-400 transition">IG</a>
                        <a href="#" className="hover:text-indigo-400 transition">TW</a>
                    </div>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Clyra. All rights reserved.
            </div>
        </div>
    </footer>
);



const Cart = ({ cartItems, onClose, onUpdateQuantity, onRemove, subtotal, onCheckout, isEmpty, checkoutStatus, resetCheckoutStatus }) => {
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);

    const handleCheckoutClick = () => {
       
        onCheckout();
        setShowCheckoutModal(true);
    };

    const handleCloseModal = () => {
        resetCheckoutStatus();
        setShowCheckoutModal(false);
    };

    return (
        <>
            {  }
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 transition-opacity" onClick={onClose}></div>

            {   }
            <div className="fixed top-0 right-0 w-full md:w-96 bg-white h-full shadow-2xl z-50 transform transition-transform duration-500 ease-in-out translate-x-0">
                <div className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                            <ShoppingCart className="w-6 h-6 mr-2 text-indigo-600" />
                            Your Cart
                        </h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-grow overflow-y-auto py-4 space-y-4">
                        {isEmpty ? (
                            <div className="text-center py-10">
                                <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">Your cart is empty.</p>
                                <button onClick={onClose} className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium">Continue Shopping</button>
                            </div>
                        ) : (
                            cartItems.map(item => (
                                <div key={item.id} className="flex items-center border-b border-gray-100 pb-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-lg mr-4"
                                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/64x64/E0E7FF/4F46E5?text=${item.id}`; }}
                                    />
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                        <p className="text-sm text-indigo-600">{formatPrice(parseInt(item.buyPrice.replace(/[^0-9]/g, '')))}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <button onClick={() => onRemove(item.id)} className="ml-4 text-gray-400 hover:text-red-500 transition">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {!isEmpty && (
                        <div className="pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center text-xl font-bold mb-4">
                                <span>Subtotal:</span>
                                <span className="text-indigo-700">{formatPrice(subtotal)}</span>
                            </div>
                            <button
                                onClick={handleCheckoutClick}
                                className="w-full py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full hover:bg-indigo-700 transition duration-300 shadow-lg transform hover:scale-[1.01]"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {    }
            {showCheckoutModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center transform scale-100 transition-all duration-300">
                        <h3 className="text-2xl font-bold mb-4">
                            {checkoutStatus === 'success' ? 'Order Placed!' : 'Checkout Failed'}
                        </h3>
                        <div className={`mx-auto mb-6 ${checkoutStatus === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                            <CheckCircle className="w-16 h-16 mx-auto" />
                        </div>
                        <p className="text-gray-600 mb-6">
                            {checkoutStatus === 'success'
                                ? 'Thank you! Your order has been successfully processed and is being prepared for shipping.'
                                : 'There was an issue processing your order. Please try again or contact support.'}
                        </p>
                        <button
                            onClick={handleCloseModal}
                            className={`w-full py-3 text-white font-semibold rounded-full transition duration-300 ${checkoutStatus === 'success' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-500 hover:bg-gray-600'}`}
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};



const App = () => {
    const [cartItems, setCartItems] = useState([]); 
    const [showCart, setShowCart] = useState(false); 
    const [checkoutStatus, setCheckoutStatus] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false); 

    const addToCart = useCallback((product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
               
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
               
                const cleanedPrice = product.buyPrice.replace('₹', '').replace(',', '');
                return [...prevItems, { ...product, buyPrice: cleanedPrice, quantity: 1 }];
            }
        });
    }, []);

    const removeFromCart = useCallback((id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    }, []);

    const updateQuantity = useCallback((id, quantity) => {
        if (quantity <= 0) {
            removeFromCart(id);
        } else {
            setCartItems(prevItems => prevItems.map(item =>
                item.id === id ? { ...item, quantity } : item
            ));
        }
    }, [removeFromCart]);

    const getCartCount = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    const getSubtotal = useMemo(() => {
        return cartItems.reduce((total, item) => {
           
            const price = parseFloat(item.buyPrice);
            return total + (price * item.quantity);
        }, 0);
    }, [cartItems]);

    const handleCheckout = async () => {
        if (isProcessing) return;

        setIsProcessing(true);

        const orderData = {
            items: cartItems.map(item => ({
                id: item.id,
                name: item.name,
                price: parseFloat(item.buyPrice),
                quantity: item.quantity
            })),
            total: getSubtotal,
            timestamp: new Date().toISOString()
        };

        try {
           
            const response = await fetch('http://localhost:4000/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setCheckoutStatus('success');
                setCartItems([]); 
            } else {
                setCheckoutStatus('failure');
            }
        } catch (error) {
            console.error("Checkout API Error:", error);
            setCheckoutStatus('failure');
        } finally {
            setIsProcessing(false);
        }
    };

    const resetCheckoutStatus = () => {
        setCheckoutStatus(null);
    };

    return (
        <div className="App min-h-screen pt-16 bg-white">
            <Header cartCount={getCartCount} onCartClick={() => setShowCart(true)} />
            <Hero />
            <Categories />
            <Products onAddToCart={addToCart} />
            <About />
            <Contact />
            <Features />
            <Footer />

            {  }
            {showCart && (
                <Cart
                    cartItems={cartItems}
                    onClose={() => setShowCart(false)}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                    subtotal={getSubtotal}
                    onCheckout={handleCheckout}
                    isEmpty={cartItems.length === 0}
                    checkoutStatus={checkoutStatus}
                    resetCheckoutStatus={resetCheckoutStatus}
                />
            )}
            {    }
            {isProcessing && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-[100] flex items-center justify-center">
                    <div className="text-white text-xl flex items-center space-x-3">
                        <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing Order...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
