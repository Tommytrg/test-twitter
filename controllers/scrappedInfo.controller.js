/*jshint esversion:6*/const scrappedInfoModel = require('../models/scrappedInfo.model');
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

exports.getUserInfo = (req, res, next) => {
  const scrappingName = new Promise((resolve, reject) => {
    getScreenName(req, res, resolve);
  });
  const scrappingFollowersFollowingTweets = new Promise((resolve, reject) => {
    getFollowersAndFollowingAndTweets(req, res, resolve);
  });
  const scrappingPhoto = new Promise((resolve, reject) => {
    getPhotoUrl(req, res, resolve);
  });
  const scrappingBio = new Promise((resolve, reject) => {
    getBio(req, res, resolve);
  });
  scrappingName.then((name) => {
    scrappedInfo.screen_name = name;
    scrappingFollowersFollowingTweets.then(array => {
      scrappedInfo.total_tweets = array[0];
      scrappedInfo.followers_count = array[1];
      scrappedInfo.following_count = array[2];
      scrappingPhoto.then(photo => {
        scrappedInfo.photo_url = photo;
        scrappingBio.then(bio => {
          scrappedInfo.bio = bio;
          saveScrappedInfo(res);
        });
      });
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

const getBio = (req, res, resolve) => {
  return x(url + req.params.username, '.ProfileHeaderCard-bio')((err, bio) => {
    if (err) {
      let msg = 'error getting bio';
      return handleError(res, msg, err);
    }
    resolve(bio);
  });
};

const getPhotoUrl = (req, res, resolve) => {
  return x(url + req.params.username, '.ProfileAvatar-image', [{
      'ProfileAvatar-image': '',
      src: '@src'
    }])
    ((err, array) => {
      let msg = ' error getting photo_url';
      if (err) {
        return handleError(res, msg, err);

      }
      resolve(array[0].src);
    });
};

const saveScrappedInfo = (res) => {
  scrappedInformation = new scrappedInfoModel(scrappedInfo);
  scrappedInformation.save((err, info) => {
    if (err) {
      let msg = 'error saving info';
      return handleError(res, msg, err);
    }
    sendInfo(res, info);
  });
};

const handleError = (res, msg, err) => {
  return res.status(404).json({
    error: err,
    message: msg
  });
};

const sendInfo = (res, info) => {
  return res.status(200).json({
    id: info.id,
    data: scrappedInfo
  });
};
