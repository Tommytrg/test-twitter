/*jshint esversion:6*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scrappedInfoSchema = mongoose.Schema({
  screen_name: {
    type: String,
    required: true
  },
  followers_count: {
    type: Number,
    required: true
  },
  following_count: {
    type: Number,
    required: true
  },
  total_tweets: {
    type: Number,
    required: true
  },
  photo_url: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at'
  }
});

const ScrappedInfo = mongoose.model('ScrappedInfo', scrappedInfoSchema);
module.exports = ScrappedInfo;
