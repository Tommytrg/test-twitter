/* jshint esversion:6 */
const scrappedInfoModel = require('../models/scrappedInfo.model');
const mongoose = require('mongoose');
const Xray = require('x-ray');
const x = Xray();
const url = 'https://twitter.com/';

exports.test = (req, res, next) => {
  const address =  url + req.params.username;
  console.log(address);
  x(address, '.u-linkComplex-target')((err, name) => {
    if (err) {
      let msg = 'error getting screen_name';
      return handleError(res, msg, err);
    }
    return res.status(200).json(name);
  });
};

const handleError = (res, msg, err) => {
  return res.status(400).json({
    error: err,
    message: msg
  });
};
