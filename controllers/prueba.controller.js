/* jshint esversion:6 */
const scrappedInfoModel = require('../models/scrappedInfo.model');
const mongoose = require('mongoose');
const Xray = require('x-ray');
const x = Xray();
const url = 'https://twitter.com/';

exports.test = (req, res, next) => {
  const scrappingName = new Promise((resolve, reject) => {
    getScreenName(req, res, resolve);
  });

  scrappingName.then((name) => {
    res.status(200).json(name);
  });
};

const getScreenName = (req, res, resolve) => {
  x(url + req.params.username, '.u-linkComplex-target')((err, name) => {
    if (err) {
      let msg = 'error getting screen_name';
      return handleError(res, msg, err);
    }
    resolve(name);
  });
};


const handleError = (res, msg, err) => {
  return res.status(400).json({
    error: err,
    message: msg
  });
};
