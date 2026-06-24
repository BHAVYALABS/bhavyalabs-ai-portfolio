import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const client = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

app.post(
"/chat",
async (req,res)=>{

try{

const message =
req.body.message;

console.log(
"User:",
message
);

const response =
await client.responses.create({
model:"gpt-5-mini",
input:message
});

console.log(
"AI OK"
);

res.json({
reply:
response.output_text
});

}
catch(err){

console.error(
err
);

res.status(500).json({
reply:
"Server error. Check terminal."
});

}

}
);

app.listen(
3000,
()=>{

console.log(
"Server running on http://localhost:3000"
);

}
);