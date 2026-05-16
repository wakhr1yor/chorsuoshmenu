import React, { useState } from 'react';
import './Cart.css';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  items,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
}) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // Validate required fields
      if (!formData.customerName.trim() || !formData.phone.trim() || !formData.address.trim()) {
        throw new Error('Iltimos, barcha maydonlarni to\'ldiring');
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customerName: formData.customerName,
          phone: formData.phone,
          address: formData.address,
          notes: formData.notes,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Buyurtma yaratishda xato');
      }

      setMessage({
        type: 'success',
        text: '✅ Buyurtma muvaffaqiyatli yuborildi! Qabul qilindi.',
      });

      // Reset form
      setFormData({ customerName: '', phone: '', address: '', notes: '' });
      setIsCheckoutOpen(false);

      // Clear cart after successful order
      onCheckout();
    } catch (error) {
      setMessage({
        type: 'error',
        text: `❌ Xato: ${error instanceof Error ? error.message : 'Noma\'lum xato'}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0 && !isCheckoutOpen) {
    return (
      <div className="cart-empty">
        <p>🛒 Savat bo\'sh</p>
        <small>Taomlarni qo\'shish uchun menyudan tanlang</small>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {/* Cart Items */}
      {!isCheckoutOpen && (
        <div className="cart-items">
          <h2>🛒 Savat</h2>
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <h4>{item.name}</h4>
                <p className="item-price">{(item.price * item.quantity).toLocaleString()} сўм</p>
              </div>
              <div className="item-controls">
                <button
                  className="btn-quantity"
                  onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                >
                  −
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  className="btn-quantity"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button className="btn-remove" onClick={() => onRemoveItem(item.id)}>
                  ✕
                </button>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="cart-total">
            <strong>Jami:</strong>
            <span>{total.toLocaleString()} сўм</span>
          </div>

          {/* Checkout Button */}
          <button
            className="btn-checkout"
            onClick={() => setIsCheckoutOpen(true)}
            disabled={items.length === 0}
          >
            Buyurtma Berish →
          </button>
        </div>
      )}

      {/* Checkout Form */}
      {isCheckoutOpen && (
        <div className="checkout-form">
          <button className="btn-back" onClick={() => setIsCheckoutOpen(false)}>
            ← Orqaga
          </button>

          <h2>📋 Buyurtma Ma\'lumotlari</h2>

          {message && (
            <div className={`message message-${message.type}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmitOrder}>
            <div className="form-group">
              <label htmlFor="customerName">👤 Ismi *</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleFormChange}
                placeholder="Sizning ismingiz"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">📞 Telefon Raqami *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                placeholder="+998 (XX) XXX-XXXX"
                pattern="[0-9+\-\s()]+"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">📍 Manzil *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                placeholder="Ko\'cha, uy raqami, QO\'KH"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">📝 Qo\'shimcha Izoh (ixtiyoriy)</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleFormChange}
                placeholder="Kuryer uchun qo'shimcha ma'lumot (masalan: qipiq kodeks, ko'cha nomi)"
                rows={3}
              />
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h3>Buyurtma Xulasasi</h3>
              {items.map((item) => (
                <div key={item.id} className="summary-item">
                  <span>{item.name} x{item.quantity}</span>
                  <span>{(item.price * item.quantity).toLocaleString()} сўм</span>
                </div>
              ))}
              <div className="summary-total">
                <strong>Jami:</strong>
                <strong>{total.toLocaleString()} сўм</strong>
              </div>
            </div>

            <button
              type="submit"
              className="btn-submit"
              disabled={isLoading}
            >
              {isLoading ? '⏳ Yuborilmoqda...' : '✓ Buyurtmani Tasdiqlash'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cart;
