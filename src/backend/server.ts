import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";

dotenv.config();

const app = Fastify({
  logger: true,
});

type LeadBody = {
  name?: string;
  phone?: string;
  message?: string;
};

const NTFY_TOPIC = process.env.NTFY_TOPIC?.trim() || "zayvka";

app.register(cors, {
  origin: true,
});

app.get("/api/health", async () => {
  return { ok: true };
});

async function sendToNtfy(text: string) {
  const res = await fetch(`https://ntfy.sh/${encodeURIComponent(NTFY_TOPIC)}`, {
    method: "POST",
    headers: {
      Title: "New lead",
      Priority: "urgent",
    },
    body: text,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`NTFY failed: ${errorText}`);
  }
}

app.post("/api/lead", async (req, reply) => {
  try {
    const body =
      typeof req.body === "string"
        ? (JSON.parse(req.body) as LeadBody)
        : (req.body as LeadBody);

    const name = body?.name?.trim();
    const phone = body?.phone?.trim();
    const message = body?.message?.trim();

    if (!name || !phone || !message) {
      return reply.code(400).send({
        error: "Все поля обязательны",
      });
    }

    const text = `🔥 Новая заявка

👤 Имя: ${name}
📞 Телефон: ${phone}
🛠 Проблема: ${message}`;

    // Отвечаем сразу, не ждём ntfy
    reply.send({ ok: true });

    // Отправка в фоне
    void sendToNtfy(text).catch((error) => {
      req.log.error(error, "NTFY ERROR");
    });
  } catch (error) {
    req.log.error(error);

    return reply.code(500).send({
      error: "Internal Server Error",
    });
  }
});

async function start() {
  try {
    const port = Number(process.env.PORT) || 3001;
    await app.listen({ port, host: "0.0.0.0" });
    app.log.info(`Server running on port ${port}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();