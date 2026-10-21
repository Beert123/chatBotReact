import express from "express"
import cors from "cors"
import sql from "./db.js";
import { Groq } from "groq-sdk/client.js";
import e from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

//GROQ endpoint fra API

app.post("/api/test-groq", async (req, res) => {
    const api = process.env.GROQ_API_KEY;

    if (!api) {
        return res.status(500).json({ error: "API key not found" })
    }
    const result = await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${api}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            messages: [
                {
                    "role": "user",
                    "content": "this is a test to test my api respond with something fitting"
                }
            ],
            model: "openai/gpt-oss-120b",
            temperature: 1,
            max_completion_tokens: 2048,
            top_p: 1,
            stream: false,
            reasoning_effort: "low",
            stop: null
        })
    })

    const groqData = await result.json()

    if (!result.ok) {
        return res.status(result.status).json(groqData)
    }
    return res.status(200).json(groqData);
})

app.get("/api/threads/:id/messages", async (req, res) => {
    try {
        const value = req.params.id;
        const result = await sql`
        SELECT id, thread_id, type, content, created_at
        FROM messages
        WHERE thread_id = ${value}
        ORDER BY created_at ASC
        `
        res.json({ result })
    } catch (e) {
        console.error("Messages id kunne ikke findes", e)
        res.status(500).json({ error: "failed to fetch from database" })
    }
})

app.get("/api/threads/:id", async (req, res) => {
    try {
        const value = req.params.id;
        const result = await sql`
        SELECT id, title, created_at
        FROM threads 
        WHERE id = ${value}
        `
        if (result.length === 0) {
            return res.status(404).json({ error: "thread not found" })
        }

        res.json(result[0]);

    } catch (e) {
        console.error("Bums", e)
        res.status(500).json({ error: "Failed to fetch from database" })
    }

})
app.get("/api/threads", async (req, res) => {
    try {
        const results = await sql`
        SELECT id, title, created_at 
        FROM threads 
        ORDER BY created_at DESC`;

        res.json(results)
    } catch (e) {
        console.error("error fetching threads", e)
        res.status(500).json({
            error: "Failed to fetch threads from database",
        });
    }
})
app.get("/", (req, res) => {
    res.json({
        message: "Serveren er oppe"
    })
})

app.listen(PORT, () => {
    console.log(`Server is online at: http://localhost:${PORT}`)
});