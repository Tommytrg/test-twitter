/*jshint esversion:6*/
const mongoose = require('mongoose');
const scrappedInfoModel = require('../models/scrappedInfo.model');

exports.getLogList = (req, res, next) => {
  scrappedInfoModel.find({}, (err, info) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json(infoToSend(info));
  });
};

const infoToSend = (info) => {
  return info.map((obj) => {
    scrappedInfo = {
      screen_name: obj.screen_name,
      followers_count: obj.followers_count,
      following_count: obj.following_count,
      total_tweets: obj.total_tweets,
      photo_url: obj.photo_url,
      bio: obj.bio
    };
    return {
      _id: obj.id,
      date: (new Date(obj.created_at)).toUTCString(),
      data: scrappedInfo
    };
  });
};
