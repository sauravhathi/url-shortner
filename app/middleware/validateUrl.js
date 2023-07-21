const validateUrl = (req, res, next) => {
    const { destinationUrl } = req.body;
    const urlRegex = new RegExp(/^(ftp|http|https):\/\/[^ "]+\.[^ "]+$/);
    if (!destinationUrl || !urlRegex.test(destinationUrl)) {
        return res.status(400).json({ error: 'Invalid URL' });
    }
    next();
};

module.exports = validateUrl;