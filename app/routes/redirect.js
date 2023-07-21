const express = require('express');
const router = express.Router();
const Url = require('../models/urlModel');

router.get('/:urlCode', async (req, res) => {
    try {
        const { urlCode } = req.params;
        const existingUrl = await Url.findOne({ urlCode });
        if (!existingUrl) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        if (existingUrl.expiresAt && existingUrl.expiresAt < new Date()) {
            return res.status(410).json({ error: 'Short URL has expired' });
        }
        // use emojin in console
        console.log(`🚀  Redirecting to ${existingUrl.longUrl}...`);
        res.redirect(existingUrl.longUrl);
    } catch (error) {
        next(error);
    }
});

module.exports = router;