const express = require('express');
const OpenAi = require('openai');

require('dotenv').config();

const router = express.Router();

const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').get(async (req, res) => {
  res.send('Hola de DALL-E!');
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
    });

    const image = response.data[0].url;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response.data.error.message);
  }
});

module.exports = router;
