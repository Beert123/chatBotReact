import express from "express"
import cors from "cors"
import sql from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/api/threads/:id", async (req, res) => {
    try {
        const value = req.params.id;
        const result = await sql`
        SELECT id, title, created_at
        FROM threads 
        WHERE id = ${value}
        `
        if(result.length === 0){
            return res.status(404).json({error: "thread not found"})
        }
        res.json(result[0]);

    } catch (e) {
        console.error("Bums", e)
        res.status(500).json({error: "failed to fetch from database"})
    }

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