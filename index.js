const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 3000;
DEFAULT_EXPIRATION_TIME = 30 * 24 * 60 * 60 * 1000

const urlSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: Date.now },
});

const Url = mongoose.model('Url', urlSchema);

mongoose.connect(process.env.DATABASE_URL, {});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));

app.post('/shorten', async (req, res) => {
    try {
      const { destinationUrl } = req.body;
      const urlCode = generateUniqueCode();
      const shortUrl = process.env.BASE_URL + '/' + urlCode;
      const expiresAt = new Date(Date.now() + DEFAULT_EXPIRATION_TIME);
      const newUrl = new Url({
        urlCode,
        longUrl: destinationUrl,
        shortUrl,
        expiresAt,
      });
      await newUrl.save();
      res.json({ shortUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.put('/update', async (req, res) => {
    try {
      const { shortUrl, destinationUrl } = req.body;
      const existingUrl = await Url.findOne({ shortUrl });
      if (!existingUrl) {
        return res.status(404).json({ error: 'Short URL not found' });
      }
      existingUrl.longUrl = destinationUrl;
      existingUrl.updatedAt = new Date();
      await existingUrl.save();
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/:urlCode', async (req, res) => {
    try {
      const { urlCode } = req.params;
      const existingUrl = await Url.findOne({ urlCode });
      if (!existingUrl) {
        return res.status(404).json({ error: 'Short URL not found' });
      }
      if (existingUrl.expiresAt && existingUrl.expiresAt < new Date()) {
        return res.status(410).json({ error: 'Short URL has expired' });
      }
      res.redirect(existingUrl.longUrl);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.post('/update-expiry', async (req, res) => {
    try {
      const { shortUrl, daysToAdd } = req.body;
      const existingUrl = await Url.findOne({ shortUrl });
      if (!existingUrl) {
        return res.status(404).json({ error: 'Short URL not found' });
      }
      existingUrl.expiresAt = new Date(existingUrl.expiresAt.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
      await existingUrl.save();
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  function generateUniqueCode() {
    const length = 7;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${process.env.BASE_URL}`);
});