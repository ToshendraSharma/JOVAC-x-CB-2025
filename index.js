
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;



app.use(cors({
  origin: true, 
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));


app.use(express.json());


const orders = [];
let orderCounter = 1000;


function processPaymentSim(amount) {
  console.log(`[Payment] Charging ₹${amount}...`);
  if (Math.random() < 0.1) {
    const err = new Error("Payment declined by bank");
    err.code = "PAYMENT_DECLINED";
    throw err;
  }
  return true;
}

function validateOrderPayload(payload) {
  if (!payload || !Array.isArray(payload.items) || payload.items.length === 0) {
    return "Cart is empty or items missing";
  }
  if (typeof payload.total !== "number" && typeof payload.total !== "string") {
    return "Total is missing or invalid";
  }
  return null;
}


app.post("/api/checkout", async (req, res) => {
  const payload = req.body;

  const errMsg = validateOrderPayload(payload);
  if (errMsg) {
    return res.status(400).json({ success: false, message: errMsg });
  }


  const total = Number(payload.total || payload.subtotal || 0);

  try {
   
    processPaymentSim(total);

    await new Promise(r => setTimeout(r, 400));

    const orderId = `C${orderCounter++}`;
    const orderRecord = {
      orderId,
      timestamp: new Date().toISOString(),
      items: payload.items,
      total,
      meta: payload.meta || null,
      status: "Processed"
    };
    orders.push(orderRecord);

    console.log(`[Order] Saved ${orderId} — items:${payload.items.length} total:₹${total}`);

    return res.status(201).json({
      success: true,
      orderId,
      message: "Order processed successfully."
    });

  } catch (err) {
    console.error("[Checkout Error]", err?.message || err);
    const status = err.code === "PAYMENT_DECLINED" ? 402 : 500;
    return res.status(status).json({
      success: false,
      message: `Checkout failed: ${err.message || "Internal error"}`
    });
  }
});

app.get("/api/orders", (req, res) => {
  return res.json({ success: true, count: orders.length, orders });
});


app.get("/api/health", (req, res) => res.json({ ok: true, time: new Date().toISOString() }));


app.listen(PORT, () => {
  console.log("=====================================");
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
  console.log("POST /api/checkout  -> accepts order JSON");
  console.log("GET  /api/orders    -> view saved orders (dev only)");
  console.log("GET  /api/health    -> health check");
  console.log("=====================================");
});
