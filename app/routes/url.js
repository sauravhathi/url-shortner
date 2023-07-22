const express = require('express');
const router = express.Router();
const Url = require('../models/urlModel');

router.get('/url/:urlCode', async (req, res) => {
    try {
        const { urlCode } = req.params;
        const existingUrl = await Url.findOne({ urlCode });
        if (!existingUrl) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        if (existingUrl.expiresAt && existingUrl.expiresAt < new Date()) {
            return res.status(410).json({ error: 'Short URL has expired' });    
        }
        res.json(existingUrl);
    } catch (error) {
        next(error);
    }
});

module.exports = router;