const express = require('express');
const cors = require('cors');
const connectDB = require('./mongoDB/connect');
const dalleRoutes = require('./routes/dalleRoutes');
const postRoutes = require('./routes/postRoutes');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.send('Hola de DALL-E, Home!');
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log('Server running on http://localhost:8080')
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();

export {};
