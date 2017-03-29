/* jshint esversion:6 */
const scrappedInfoModel = require('../models/scrappedInfo.model');
const mongoose = require('mongoose');
const Xray = require('x-ray');
const x = Xray();
const url = 'https://twitter.com/Tomastrg';

exports.test = (req, res, next) => {
  x(url, 'h1')((err, info) => {
    if (err) {
      let msg = 'error getting string';
      console.log('puto');
      return res.status(400).json(err);
    }
    return res.status(200).json(info);
  });
};
