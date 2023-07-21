const express = require('express');
const router = express.Router();
const Url = require('../models/urlModel');
const validateUrl = require('../middleware/validateUrl');

router.put('/update', validateUrl, async (req, res, next) => {
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
      next(error);
    }
  });

module.exports = router;