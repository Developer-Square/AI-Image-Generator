const express = require('express');
const cloudinary = require('cloudinary').v2;
const Post = require('../mongoDB/models/post');

require('dotenv').config();

const router = express.Router();

module.exports = router;
export {};
