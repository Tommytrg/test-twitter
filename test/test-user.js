/*jshint esversion: 6*/
const mongoose = require('mongoose');
const ScrappedInfo = require('../models/scrappedInfo.model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const url = 'http://localhost:3000';
const getUserInfo = '../controllers/scrappedInfo.controller';
//const url = 'https://twitter-info-scrapping.herokuapp.com';
chai.use(chaiHttp);

/*Test for /api/user/:username endpoint*/

describe('Get twitter user info', (done) => {
  it('it should GET an object with id property', (done => {
    chai.request(url)
      .get('/api/user/influencity')
      .then(res => {
        res.body.should.have.property('id');
      }).then(done, done);
  }));

  it('it should GET an object with data property', (done => {
    chai.request(url)
      .get('/api/user/influencity')
      .then(res => {
        res.body.should.have.property('data');
      }).then(done, done);
  }));

  it(`it should GET an object with data property with screen_name, followers_count,
     following_count, photo_url, bio,,total_tweets properties`, ((done) => {
    chai.request(url)
      .get('/api/user/influencity')
      .then(res => {
        res.body.data.should.have.property('screen_name');
        res.body.data.should.have.property('followers_count');
        res.body.data.should.have.property('following_count');
        res.body.data.should.have.property('photo_url');
        res.body.data.should.have.property('bio');
        res.body.data.should.have.property('total_tweets');
      }).then(done, done);
  }));
});
