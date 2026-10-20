import express from "express"
import cors from "cors"
import sql from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.post("/api/threads", async (req,res) => {
    
})
app.get("/api/threads", async (req, res) => {
    try {
        const results = await sql`
        SELECT id, title, created_at 
        FROM threads 
        ORDER BY created_at DESC`;

        res.json(results)
        console.log(results)
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