const express = require('express');
const router = express.Router();
const Url = require('../models/urlModel');
const generateUniqueCode = require('../utils/codeGenerator');
const validateUrl = require('../middleware/validateUrl');

router.post('/shorten', validateUrl, async (req, res, next) => {
    try {
        const { destinationUrl } = req.body;
        const existingUrl = await Url.findOne({ longUrl: destinationUrl });
        if (existingUrl) {
            return res.json({ shortUrl: existingUrl.shortUrl });
        }
        const urlCode = generateUniqueCode();
        const shortUrl = process.env.BASE_URL + '/' + urlCode;
        const newUrl = new Url({
            urlCode,
            longUrl: destinationUrl,
            shortUrl,
        });
        await newUrl.save();
        res.json({ shortUrl });
    } catch (error) {
        next(error);
    }
});

module.exports = router;