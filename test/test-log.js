/*jshint esversion: 6*/
const mongoose = require('mongoose');
const ScrappedInfo = require('../models/scrappedInfo.model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
//const url = 'http://localhost:3000';
const url = 'http://twitter-info-scrapping.herokuapp.com';
chai.use(chaiHttp);

/*Test for /api/log/list endpoint*/

describe('Get log of twitter info', done => {
  it('it should GET an array', (done => {
    chai.request(url)
      .get('/api/log/list')
      .then(res => {
        res.body.should.be.a('array');
      }).then(done, done);
  }));

  it('it should GET an array with objects', (done => {
    chai.request(url)
      .get('/api/log/list')
      .then(res => {
        res.body.map(obj => {
          obj.should.be.a('object');
        });
      }).then(done, done);
  }));

  it('it should GET an array with objects with id property', (done => {
    chai.request(url)
      .get('/api/log/list')
      .then(res => {
        res.body.map(obj => {
          obj.should.have.property('_id');
        });
      }).then(done, done);
  }));

  it('it should GET an array with objects with data property', (done => {
    chai.request(url)
      .get('/api/log/list')
      .then(res => {
        res.body.map(obj => {
          obj.should.have.property('data');
        });
      }).then(done, done);
  }));

  it('it should GET an array with objects with data property with screen_name, followers_count, following_count, photo_url, bio, total_tweets properties', (done => {
    chai.request(url)
      .get('/api/log/list')
      .then(res => {
        res.body.map(obj => {
          obj.data.should.have.property('screen_name');
          obj.data.should.have.property('followers_count');
          obj.data.should.have.property('following_count');
          obj.data.should.have.property('photo_url');
          obj.data.should.have.property('bio');
          obj.data.should.have.property('total_tweets');
        });
      }).then(done, done);
  }));
});
