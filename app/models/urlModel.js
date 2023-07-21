const mongoose = require('mongoose');

const DEFAULT_EXPIRATION_TIME = 30 * 24 * 60 * 60 * 1000;

const urlSchema = new mongoose.Schema({
  urlCode: {
    type: String,
    required: true,
    unique: true,
  },
  longUrl: {
    type: String,
    required: true,
    unique: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  expiresAt: {
    type: Date,
    default: new Date(Date.now() + DEFAULT_EXPIRATION_TIME),
  },
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;