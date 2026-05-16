import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

// Types
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderPayload {
  items: OrderItem[];
  customerName: string;
  phone: string;
  address: string;
  notes?: string;
}

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID || '';

/**
 * POST /api/orders
 * Create order and send to Telegram channel
 */
router.post('/orders', async (req: Request, res: Response) => {
  try {
    const { items, customerName, phone, address, notes }: OrderPayload = req.body;

    // Validate input
    if (!items?.length || !phone || !address) {
      return res.status(400).json({
        error: 'Missing required fields: items, phone, address',
      });
    }

    // Calculate total
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Format order message for Telegram
    const orderMessage = formatOrderForTelegram({
      items,
      customerName,
      phone,
      address,
      notes,
      total,
    });

    // Send to Telegram
    await sendToTelegram(orderMessage);

    // TODO: Save order to database
    res.json({
      success: true,
      message: 'Order created and sent successfully',
      orderId: `ORD-${Date.now()}`,
      total,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      error: 'Failed to create order',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Format order data into Telegram message
 */
function formatOrderForTelegram(data: OrderPayload & { total: number }): string {
  const itemsList = data.items
    .map((item) => `• ${item.name} x${item.quantity} = ${(item.price * item.quantity).toLocaleString()} сўм`)
    .join('\n');

  return `
📦 YANGI BUYURTMA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Mijoz: ${data.customerName || 'Noma\'lum'}
📞 Telefon: ${data.phone}
📍 Manzil: ${data.address}
${data.notes ? `📝 Izoh: ${data.notes}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUYURTMALAR:
${itemsList}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 Jami: ${data.total.toLocaleString()} сўм
🕐 Vaqt: ${new Date().toLocaleString('uz-UZ')}
  `;
}

/**
 * Send message to Telegram channel
 */
async function sendToTelegram(message: string): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHANNEL_ID) {
    console.warn('Telegram credentials not configured');
    return;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  await axios.post(url, {
    chat_id: TELEGRAM_CHANNEL_ID,
    text: message,
    parse_mode: 'HTML',
  });
}

export default router;
