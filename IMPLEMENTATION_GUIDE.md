# 📖 Chorsuo Shmenu - Buyurtma Tizimi Qo'llanmasi

## 1️⃣ Tizim Arxitekturasi

```
Frontend (React + TS)              Backend (Express + TS)           Telegram
┌─────────────────┐              ┌─────────────────┐              ┌──────────┐
│  Menu Page      │─────────────▶│  /api/orders    │─────────────▶│  Bot API │
│  - Zig'ir Oshi  │              │  - Validation   │              │  Channel │
│  - Choyxona     │◀─────────────│  - Format msg   │              │ -100395  │
│  - Savat        │  Response    │  - Send to TG   │              └──────────┘
└─────────────────┘              └─────────────────┘
     :5173                              :3000
```

## 2️⃣ Telegram Bot Setup (Qadam-qadam)

### A) Bot Yaratish
1. **@BotFather** ni Telegram'da toping
2. `/newbot` buyrug'ini yubor
3. Bot nomi: `ChorsuosMenu Bot`
4. Bot username: `chorsuos_menu_bot` (o'zingiznikini yarat)
5. **Token** olasiz: `8904330500:AAF60JdGDWDjQsq8...`

### B) Private Channel Yaratish
1. Telegram'da **Private Channel** yarat
2. Bot'ni admin qil va message yo'llashga ruxsat ber
3. Channel ID: `-1003956003008`

### C) Environment Sozlash
```bash
cp .env.example .env
```

Keyin `.env` faylini to'ldiring:
```env
TELEGRAM_BOT_TOKEN=8904330500:AAF60JdGDWDjQsq8-apCT-IFgx9mCXD4D-4
TELEGRAM_CHANNEL_ID=-1003956003008
CONTACT_PHONE=+998 77 256 0202
NODE_ENV=development
PORT=3000
```

## 3️⃣ Installation va Setup

### Backend
```bash
# 1. Katalogga kir
cd artifacts/api-server

# 2. Dependenciyalar o'rnatish
pnpm install

# 3. Environment o'rnatish
cp ../../.env.example .env
# TELEGRAM_BOT_TOKEN va TELEGRAM_CHANNEL_ID'ni to'ldiring

# 4. TypeScript tekshirish
pnpm run typecheck

# 5. Ishga tushirish
pnpm run dev
# Output: 🚀 Server running on http://localhost:3000
```

### Frontend
```bash
# 1. Katalogga kir
cd artifacts/web

# 2. Dependenciyalar o'rnatish
pnpm install

# 3. Ishga tushirish
pnpm run dev
# Output: ➜  Local:   http://localhost:5173/
```

## 4️⃣ API Dokumentatsiyasi

### POST /api/orders
**Buyurtmani qabul qilish va Telegram'ga yuborish**

#### Request Body
```json
{
  "items": [
    {
      "id": "zigir-oshi",
      "name": "Zig'ir Oshi",
      "price": 37000,
      "quantity": 1,
      "portion": "0.7 kg"
    },
    {
      "id": "qazi",
      "name": "Qazi",
      "price": 12000,
      "quantity": 1,
      "portion": "100g"
    }
  ],
  "customerName": "Ali",
  "phone": "+998 77 256 0202",
  "address": "Tashkent, Fergona 123",
  "notes": "Qipiq kodeks: 1234"
}
```

#### Response (Success)
```json
{
  "success": true,
  "message": "Buyurtma muvaffaqiyatli qabul qilindi! Telegram kanaliga yuborildi.",
  "orderId": "ORD-1715851200000",
  "total": 49000
}
```

#### Response (Error)
```json
{
  "error": "Phone number is required"
}
```

#### Status Codes
- `200` - Muvaffaqiyatli ✅
- `400` - Xato ma'lumot (validation error)
- `500` - Server xatosi

### GET /api/orders/health
**Service health check**

```bash
curl http://localhost:3000/api/orders/health
```

Response:
```json
{
  "status": "OK",
  "service": "orders-api",
  "timestamp": "2026-05-16T04:50:00.000Z"
}
```

## 5️⃣ Frontend Integratsiyasi

### App.tsx Component

```typescript
import React, { useState } from 'react';
import Menu from './components/Menu';
import Cart from './components/Cart';

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item, quantity) => {
    // Savat'ga qo'shish
  };

  return (
    <div className="app">
      <header>
        <h1>🍲 Chorsuo's Menu</h1>
        <button onClick={() => setShowCart(!showCart)}>
          🛒 Savat ({cartItems.length})
        </button>
      </header>
      <Menu onAddToCart={handleAddToCart} />
      <Cart items={cartItems} />
    </div>
  );
}
```

### Menu Component
- 4 ta taom: Zig'ir Oshi, Choyxona Oshi, Qazi, Bedana Tuxum
- Har bir taom uchun +/- tugmalari
- Rasmlar beshqozon.uz va kamolonosh.uz'dan

### Cart Component
- Savat'dagi taomlar ro'yxati
- Miqdorni o'zgartirish
- Checkout forma (Ism, Tel, Manzil, Izoh)
- Telegram'ga yuborish

## 6️⃣ Testing

### Unit Test Example
```typescript
// Test: Required fields validation
it('should return 400 for missing phone', async () => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: [{ id: '1', name: 'Osh', price: 37000, quantity: 1 }],
      customerName: 'Ali',
      address: 'Tashkent',
      // phone missing!
    })
  });
  expect(response.status).toBe(400);
});
```

### Manual Testing (cURL)
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"id": "zigir-oshi", "name": "Zig'"'"'ir Oshi", "price": 37000, "quantity": 1, "portion": "0.7 kg"}
    ],
    "customerName": "Test User",
    "phone": "+998 77 256 0202",
    "address": "Tashkent, Test St 123",
    "notes": "Test order"
  }'
```

### Browser Testing
1. **Frontend:** http://localhost:5173 oching
2. **Menu:** Taomlarni ko'rish va +/- tugmalari bilan quantity tanlash
3. **Cart:** "🛒 Savat" tugmasini bosing
4. **Checkout:** Formasini to'ldiring va "Tasdiqlash" bosing
5. **Telegram:** Channel'da xabar ko'rish (`-1003956003008`)

## 7️⃣ Troubleshooting

### 🔴 "Cannot find module" xatosi
**Sababi:** Dependencies o'rnatilmagan

**Yechimi:**
```bash
pnpm install
pnpm run typecheck
```

### 🔴 "Telegram API Error"
**Sababi:** Bot token yoki channel ID xato

**Yechimi:**
```bash
# 1. Token va channel ID'ni tekshir
cat .env

# 2. Bot'ni channel'ga add qil va admin qil
# 3. Test:
curl "https://api.telegram.org/bot YOUR_TOKEN/getMe"
# Response: "ok": true
```

### 🔴 "CORS Error" - Frontend backend'ga connection qila olmayapti
**Sababi:** Frontend va backend portlari moslashmagan

**Yechimi:**
```typescript
// artifacts/api-server/src/index.ts
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

### 🔴 "Form submission not working"
**Sababi:** API endpoint mavjud emas yoki network xato

**Yechimi:**
1. Backend ishga tuShgan-mi? `pnpm run dev`
2. DevTools Network tab'ni tekshir
3. Console'da xatolarni ko'rish
4. Backend logs'da error message'larni ko'rish

### 🔴 "Xabar Telegram'da ko'rinmaydi"
**Sababi:** Channel ID noto'g'ri yoki bot admin emas

**Yechimi:**
```bash
# 1. Channel ID'ni to'g'ri olish:
curl "https://api.telegram.org/bot YOUR_TOKEN/getUpdates"

# Javobda "chat": {"id": -1003956003008} ko'rarsiz
# Bu to'g'ri channel ID!

# 2. Bot admin-mi tekshirish:
# Private channel'ga kirip, bot'ni admin qil
```

## 🎯 Menyu

### 🍲 Asosiy Taomlar
| Taom | Narxi | Miqdor | Rasm |
|------|-------|--------|------|
| **Zig'ir Oshi** | 37.000 сўм | 0.7 kg | beshqozon.uz |
| **Choyxona Oshi** | 43.000 сўм | 0.7 kg | kamolonosh.uz |

### ➕ Qo'shimchalar
| Qo'shimcha | Narxi | Miqdor |
|-----------|-------|--------|
| **Qazi** | 12.000 сўм | 100g |
| **Bedana Tuxum** | 2.000 сўм | 1 ta |

## 📋 Telegram Xabar Misol

```
📦 YANGI BUYURTMA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Mijoz: Ali
📞 Telefon: +998 77 256 0202
📍 Manzil: Tashkent, Fergona 123
📝 Izoh: Qipiq kodeks: 1234

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUYURTMALAR:
• Zig'ir Oshi x1 (0.7 kg) = 37.000 сўм
• Qazi x1 (100g) = 12.000 сўм
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 Jami: 49.000 сўм
🕐 Vaqt: 2026-05-16, 10:50:00
```

## 📞 Bog'lanish

- **Telefon:** +998 77 256 0202
- **Telegram:** @chorsuos_menu_bot
- **Channel:** -1003956003008

## 🔗 Qo'shimcha Ma'lumotlar

- **Telegram Bot API:** https://core.telegram.org/bots/api
- **Express.js:** https://expressjs.com
- **React:** https://react.dev
- **TypeScript:** https://www.typescriptlang.org

---

✅ **Barcha tayyoq! Ishga tushiring va testlang!**
