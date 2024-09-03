const express = require('express');
const cloudinary = require('cloudinary').v2;
const { MongoClient } = require('mongodb');
const Post = require('../mongoDB/models/post');

require('dotenv').config();

const router = express.Router();

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db(process.env.DB_NAME);
const collection = db.collection('posts');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET ALL POSTS
router.route('/').get(async (req, res) => {
  try {
    await client.connect();
    const posts = await collection.find({}).toArray();

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, data: error });
  }
});

// CREATE A POST
router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    // const photoUrl = await cloudinary.uploader.upload(photo);

    await client.connect();
    const result = await collection.insertOne({
      name,
      prompt,
      photo,
    });

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

module.exports = router;
export {};
