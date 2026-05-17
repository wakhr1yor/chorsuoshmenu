import React, { useState } from 'react';
import Menu from './components/Menu';
import Cart from './components/Cart';
import './App.css';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const handleAddToCart = (item: Omit<CartItem, 'quantity'>, quantity: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const handleCheckout = () => {
    setCartItems([]);
    setShowCart(false);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>🍽️ Chorsuo's Menu</h1>
          <p className="tagline">Haqiqiy O'zbek taomlari - Eng mazali oshi!</p>
        </div>
        <button
          className="btn-cart-toggle"
          onClick={() => setShowCart(!showCart)}
        >
          🛒 Savat ({cartItems.length}) - {totalPrice.toLocaleString()} сўм
        </button>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="app-container">
          {showCart ? (
            <Cart
              items={cartItems}
              onRemoveItem={handleRemoveItem}
              onUpdateQuantity={handleUpdateQuantity}
              onCheckout={handleCheckout}
            />
          ) : (
            <Menu onAddToCart={handleAddToCart} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>📞 Bog'lanish: <strong>+998 77 256 0202</strong></p>
        <p className="footer-small">© 2026 Chorsuo's Menu - Telegram orqali buyurtma berish</p>
      </footer>
    </div>
  );
}
