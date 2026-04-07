import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";

dotenv.config();

const app = Fastify();

type LeadBody = {
    name?: string;
    phone?: string;
    message?: string;
};

const NTFY_TOPIC = process.env.NTFY_TOPIC?.trim() || "zayvka";

app.register(cors, {
    origin: true,
});

app.post("/api/lead", async (req, reply) => {
    try {
        console.log("BODY:", req.body);

        const body: LeadBody =
            typeof req.body === "string"
                ? JSON.parse(req.body)
                : (req.body as LeadBody);

        const name = body.name?.trim();
        const phone = body.phone?.trim();
        const message = body.message?.trim();

        if (!name || !phone || !message) {
            return reply.status(400).send({
                error: "Все поля обязательны",
            });
        }

        const text = `🔥 Новая заявка

👤 Имя: ${name}
📞 Телефон: ${phone}
🛠 Проблема: ${message}`;

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
            console.error("NTFY ERROR:", errorText);

            return reply.status(500).send({
                error: "Не удалось отправить уведомление",
                details: errorText,
            });
        }

        return { ok: true };
    } catch (error) {
        console.error(error);
        return reply.status(500).send({
            error: "Internal Server Error",
        });
    }
});

async function start() {
    await app.listen({ port: 3001, host: "0.0.0.0" });
    console.log("Server running on http://localhost:3001");
}

start();