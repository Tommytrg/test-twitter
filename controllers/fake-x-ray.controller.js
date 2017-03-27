/* jshint esversion:6 */
const scrappedInfoModel = require('../models/scrappedInfo.model');
const mongoose = require('mongoose');
const Xray = require('x-ray');
const x = Xray();
const url = 'https://twitter.com/influencity';

exports.getString = (req, res, next) => {
  return x(url, '.u-linkComplex-target')((err, name) => {
    if (err) {
      let msg = 'error getting string';
      return handleError(res, msg, err);
    }
  });
};

exports.getObject = (req, res, next) => {
  return x(url, '.ProfileAvatar-image', {
      'ProfileAvatar-image': '',
      src: '@src'
    })
    ((err, array) => {
      if (err) {
        let msg = 'error getting photo_url';
        return handleError(res, msg, err);
      }
    });
};

exports.getArray = (req, res, next) => {
  return x(url + req.params.username, '.ProfileNav-value', [{
      '.ProfileNav-value': ''
    }])
    ((err, array) => {
      if (err) {
        let msg = 'error getting array with followers, following and tweets';
        return handleError(res, msg, err);
      }
    });
};

const handleError = (res, msg, err) => {
  return res.status(404).json({
    error: err,
    message: msg
  });
};
