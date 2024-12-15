import OpenAI from "openai";
import express from "express";
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const apiKey = process.env.OPENAI_API_KEY;

// print the API key in the terminal
console.log(apiKey);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
  const { messages } = req.body;
  
  if(!messages || !Array.isArray(messages)) {
    return res.status(400).json({error: 'Format des messages invalide'});
  }

  try {
    // Appel à l'API avec la nouvelle méthode
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // ou gpt-4o-mini ou ce que vous utilisez
      messages: messages,
      temperature: 0.7
    });

    const gptMessage = response.choices[0]?.message?.content.trim();
    if(!gptMessage) {
      return res.status(500).json({error: 'Pas de réponse de l\'IA'});
    }

    res.json({message: gptMessage});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Erreur appel API OpenAI'});
  }
});

export default router;
