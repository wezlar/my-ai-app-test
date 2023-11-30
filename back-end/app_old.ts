import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const params: OpenAI.Chat.ChatCompletionCreateParams = {
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello, World!" }
],
  model: 'gpt-3.5-turbo',
};

const app: Express = express();
const port = process.env.PORT || 3000;

// settings
app.use(express.json());

app.get('/', async (req: Request, res: Response): Promise<void> => {
  res.send('Express + TypeScript Server');
  console.log(req.body)
  const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);
  console.log(chatCompletion.choices);
  console.log(chatCompletion.choices[0].message);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});