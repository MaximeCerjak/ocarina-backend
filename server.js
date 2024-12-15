import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import commentRoutes from './routes/comment.js';
import chatRoutes from './routes/chat.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes pour le livre d'or
app.use('/comment', commentRoutes);

// Routes pour le chatbot IA
app.use('/api/chat', chatRoutes);

// Test route
app.get('/', (req, res) => {
  res.send("Backend Ocarina en ligne");
});

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
