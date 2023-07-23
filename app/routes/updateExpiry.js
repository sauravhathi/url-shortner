const express = require('express');
const router = express.Router();
const Url = require('../models/urlModel');

router.post('/update-expiry', async (req, res) => {
    try {
        const { shortUrl, expiry } = req.body;
        const existingUrl = await Url.findOne({ shortUrl });
        if (!existingUrl) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        existingUrl.expiresAt = expiry;
        await existingUrl.save();
        res.json({ success: true });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
