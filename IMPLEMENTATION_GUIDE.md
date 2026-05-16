# 📖 Chorsuo Shmenu - Buyurtma Tizimi Qo'llanmasi

## 1️⃣ Tizim Arxitekturasi

```
Frontend (React + TS)              Backend (Express + TS)           Telegram
┌─────────────────┐              ┌─────────────────┐              ┌──────────┐
│  Menu Page      │─────────────▶│  /api/orders    │─────────────▶│  Bot API │
│  - Taomlar      │              │  - Validation   │              │  Channel │
│  - Savat        │◀─────────────│  - Format msg   │              └──────────┘
│  - Checkout     │  Response    │  - Send to TG   │
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

### B) Channel Yaratish
1. Telegram'da yangi **Private Channel** yarat
2. Bot'ni admin qil (`/setprivacy` → Disable)
3. Channel ID olyish:
   - Bot'ga `/start` yubor
   - Channel'ga `@bot_usernamebot /start` yubor
   - Bot agentini channel'ga add qil
   - First message yubor
   - Bot forward qilib ID ko'rsatadi: `-1002345678901`

### C) Environment Sozlash
```bash
cp .env.example .env
```

Keyin `.env` faylini to'ldiring:
```env
TELEGRAM_BOT_TOKEN=8904330500:AAF60JdGDWDjQsq8-apCT-IFgx9mCXD4D-4
TELEGRAM_CHANNEL_ID=-1002345678901
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
# .env'ni to'ldiring (TELEGRAM_BOT_TOKEN, TELEGRAM_CHANNEL_ID)

# 4. TypeScript tekshirish
pnpm run typecheck

# 5. Ishga tushirish
pnpm run dev
# Output: Server running on http://localhost:3000
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
      "id": "osh-1",
      "name": "Osh",
      "price": 15000,
      "quantity": 2
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
  "message": "Order created and sent successfully",
  "orderId": "ORD-1715851200000",
  "total": 30000
}
```

#### Response (Error)
```json
{
  "error": "Missing required fields: items, phone, address"
}
```

#### Status Codes
- `200` - Muvaffaqiyatli
- `400` - Xato ma'lumot (missing fields)
- `500` - Server xatosi

## 5️⃣ Frontend Integratsiyasi

### Cart.tsx Component

#### Props
```typescript
interface CartProps {
  items: CartItem[];                      // Savat'dagi taomlar
  onRemoveItem: (id: string) => void;     // Taomni o'chirish
  onUpdateQuantity: (id: string, qty: number) => void;  // Miqdorni o'zgartirish
  onCheckout: () => void;                 // Checkout tugallangandan keyin
}
```

#### Ishlatish
```typescript
import Cart from './components/Cart';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <Cart
      items={cartItems}
      onRemoveItem={(id) => setCartItems(prev => prev.filter(i => i.id !== id))}
      onUpdateQuantity={(id, qty) => {
        setCartItems(prev => prev.map(i => 
          i.id === id ? { ...i, quantity: qty } : i
        ))
      }}
      onCheckout={() => setCartItems([])}
    />
  );
}
```

## 6️⃣ Testing

### Unit Test Example
```typescript
// Test: Buyurtma API'siga xato ma'lumot yuborish
it('should return 400 for missing phone', async () => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: [{ id: '1', name: 'Osh', price: 15000, quantity: 1 }],
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
      {"id": "1", "name": "Osh", "price": 15000, "quantity": 1}
    ],
    "customerName": "Test User",
    "phone": "+998 77 256 0202",
    "address": "Tashkent, Test St 123",
    "notes": "Test order"
  }'
```

### Telegram Bot Testing
1. Channel'ni oching
2. Savat'dan taom qo'shing
3. "Buyurtma Berish" bosing
4. Formasini to'ldiring
5. "Tasdiqlash" bosing
6. ✅ Xabar channel'da ko'rinishi kerak

## 7️⃣ Troubleshooting

### 🔴 "Telegram API Error"
**Sababi:** Bot token noto'g'ri yoki channel ID xato

**Yechimi:**
```bash
# 1. Token va channel ID'ni tekshir
cat .env

# 2. Bot'ni channel'ga add qilganini tekshir
# 3. Bot admin huquqlariga ega ekanini tekshir

# Test:
curl "https://api.telegram.org/bot YOUR_TOKEN/getMe"
# Response: "ok": true bo'lishi kerak
```

### 🔴 "CORS Error"
**Sababi:** Frontend va backend portlari moslashmagan

**Yechimi:**
```typescript
// artifacts/api-server/src/index.ts
import cors from 'cors';
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### 🔴 "Form submission not working"
**Sababi:** API endpoint mavjud emas yoki network xato

**Yechimi:**
1. Backend ishga tuShgan-mi? `localhost:3000/api/orders`
2. Network tab'ni (DevTools) tekshir
3. Console'da xatolarni ko'rish

### 🔴 "Xabar Telegram'da ko'rinmaydi"
**Sababi:** Channel ID noto'g'ri yoki bot admin emas

**Yechimi:**
```bash
# Channel ID'ni to'g'ri olish:
# 1. Bot'ni channel'ga add qil
# 2. "Hello" xabar yubor
# 3. curl orqali so'rov yubor:
curl "https://api.telegram.org/bot YOUR_TOKEN/getUpdates"

# Javobda "chat": {"id": -1002345678901} ko'rarsiz
# Bu to'g'ri channel ID!
```

## 📋 Production Deploy

### Heroku
```bash
# 1. Heroku app yaratish
heroku create chorsuos-menu

# 2. Environment variables o'rnatish
heroku config:set TELEGRAM_BOT_TOKEN=...
heroku config:set TELEGRAM_CHANNEL_ID=...

# 3. Deploy
git push heroku main
```

### Environment Variables
```
TELEGRAM_BOT_TOKEN      ← BotFather'dan oladigan token
TELEGRAM_CHANNEL_ID     ← Private channel ID
CONTACT_PHONE          ← Bog'lanish uchun raqam
NODE_ENV               ← production
PORT                   ← 3000 (Heroku o'z sozlaydi)
```

## 📞 Qo'shimcha Manziller

- **Telegram Bot API Docs:** https://core.telegram.org/bots/api
- **Express.js Docs:** https://expressjs.com
- **React Docs:** https://react.dev
- **Uzbek Telefon Formati:** +998 XX XXX XXXX
