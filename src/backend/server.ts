import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = Fastify();

const start = async () => {
    await app.register(cors, {
        origin: true
    });

    app.post("/api/lead", async (req, reply) => {
        const { name, phone, message } = req.body as any;

        const text = `
🔥 Новая заявка

👤 Имя: ${name}
📞 Телефон: ${phone}
🛠 Проблема: ${message}
    `;

        const res = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: process.env.CHAT_ID,
                text
            })
        });

        const data = await res.json();
        console.log("TG RESPONSE:", data);

        if (!res.ok) {
            return reply.status(500).send(data);
        }

        return { ok: true };
    });

    await app.listen({ port: 3000 });
    console.log("Server running on http://localhost:3000");
};

start();