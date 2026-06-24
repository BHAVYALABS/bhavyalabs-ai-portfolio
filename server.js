const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {

const { message } = req.body;

const response = await client.chat.completions.create({
model: "gpt-4o-mini",
messages: [
{ role: "system", content: "You are the BHAVYA LABS AI assistant." },
{ role: "user", content: message }
]
});

res.json({
reply: response.choices[0].message.content
});

});

app.listen(3000, () => {
console.log("Server running on http://localhost:3000");
});