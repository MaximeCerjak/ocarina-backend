import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET /comment : retourne tous les commentaires (du plus récent au plus ancien)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT author, content, date FROM comments ORDER BY date DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Erreur interne'});
  }
});

// POST /comment/create : crée un nouveau commentaire
router.post('/create', async (req, res) => {
  const { author, content } = req.body;
  if(!content) {
    return res.status(400).json({error: 'Le contenu du commentaire est requis'});
  }

  const authorName = author || 'Anonymous';
  const date = new Date().toISOString();

  try {
    const result = await pool.query(
      'INSERT INTO comments (author, content, date) VALUES ($1, $2, $3) RETURNING author, content, date',
      [authorName, content, date]
    );
    res.status(201).json({status: 'created', comment: result.rows[0]});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Erreur interne'});
  }
});

export default router;