import express, { Request, Response, Router } from 'express';
import { generateCurrentConverstation, generateResponse } from './controllers/openaiControllers';

const router: Router = express.Router();

// routes
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const messages = generateCurrentConverstation({
    previousMessages: req.body?.previousMessages,
    newMessage: req.body?.newMessage
  })
  
  try {
    const chat = await generateResponse(messages);
    console.log(chat.choices[0].message);

    res.send([
      ...messages,
      {...chat.choices[0].message}
    ]);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;