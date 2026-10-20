import express from "express"

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) =>{
    res.json({
        message: "Serveren er oppe"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is online at: http://localhost:${PORT}`)
});