/* jshint esversion:6 */
const scrappedInfoModel = require('../models/scrappedInfo.model');
const mongoose = require('mongoose');
const Xray = require('x-ray');
const x = Xray();
const url = 'https://twitter.com/';

let scrappedInfo = {
  screen_name: '',
  followers_count: 0,
  following_count: 0,
  photo_url: '',
  bio: '',
  total_tweets: 0
};

exports.test = (req, res, next) => {
  const scrappingName = new Promise((resolve, reject) => {
    getScreenName(req, res, resolve);
  });
  const scrappingFollowersFollowingTweets = new Promise((resolve, reject) => {
    getFollowersAndFollowingAndTweets(req, res, resolve);
  });

  scrappingName.then((name) => {
    scrappedInfo.screen_name = name;
    scrappingFollowersFollowingTweets.then( array => {
      // scrappedInfo.total_tweets = array[0];
      // scrappedInfo.followers_count = array[1];
      // scrappedInfo.following_count = array[2];
      return res.status(200).json(array);
    });
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

const getFollowersAndFollowingAndTweets = (req, res, resolve) => {
  x(url + req.params.username, '.ProfileNav-value', [{
      '.ProfileNav-value': ''
    }])
    ((err, array) => {
      console.log(array,'TEST:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');

      if (err) {
        let msg = ' error getting array with followers, following and tweets';
        return handleError(res, msg, err);
      }
      let validInfo = [];
      for (let i = 0; i < 3; i++) {
        validInfo.push(Object.values(array[i]));
      }
      let transformedInfo = validInfo.map(obj => {
        let unit = 1;
        return obj.map(str => {
          let num = str.split('').filter(char => {
            if (char === 'K') {
              unit = 1000;
            }
            if (char === 'M') {
              unit = 1000000;
            }
            return Number.isInteger(parseInt(char)) || char === ',';
          }).map(item => {
            return item === ',' ? '.' : item;
          }).join('');
          return parseFloat(num) * unit;
        });
      });
      let infoToSend = transformedInfo.map(arr => {
        return arr[0];
      });
      resolve(infoToSend);
    });
};


const handleError = (res, msg, err) => {
  return res.status(400).json({
    error: err,
    message: msg
  });
};
