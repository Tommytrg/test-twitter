/*jshint esversion: 6*/
const mongoose = require('mongoose');
const ScrappedInfo = require('../models/scrappedInfo.model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const url = 'http://localhost:3000';
chai.use(chaiHttp);

/*Test for /api/user/:username endpoint*/
describe('Get twitter info', () => {
  it('it should GET an object', (done => {
    chai.request(url)
      .get('/api/user/influencity')
      .end((err, res) => {
        res.should.be.a('object');
      });
    done();
  }));

  it('it should GET an object with id property', (done => {
    chai.request(url)
      .get('/api/user/influencity')
      .end((err, res) => {
        res.body.should.have.property('id');
      });
    done();
  }));

  it('it should GET an object with data property', (done => {
    chai.request(url)
      .get('/api/user/influencity')
      .end((err, res) => {
        res.body.should.have.property('data');
      });
    done();
  }));

  it(`it should GET an object with data property with screen_name, followers_count,
     following_count, photo_url, bio,,total_tweets properties`, (done => {
    chai.request(url)
      .get('/api/user/influencity')
      .end((err, res) => {
        res.body.data.should.have.property('screen_name');
        res.body.data.should.have.property('followers_count');
        res.body.data.should.have.property('following_count');
        res.body.data.should.have.property('photo_url');
        res.body.data.should.have.property('bio');
        res.body.data.should.have.property('total_tweets');
      });
    done();
  }));
});
