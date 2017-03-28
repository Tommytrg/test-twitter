/*jshint esversion: 6*/
const mongoose = require('mongoose');
const ScrappedInfo = require('../models/scrappedInfo.model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const url = 'https://twitter-info-scrapping.herokuapp.com/';

//const url = 'http://localhost:3000';
chai.use(chaiHttp);

/*Test for /api/log/list endpoint*/

describe('Get log of twitter info', () => {
  it('it should GET an array', (done => {
    chai.request(url)
      .get('/api/log/list')
      .end((err,res) => {
        res.should.be.a('array');
      });
      done();
  }));

  it('it should GET an array with objects', (done => {
    chai.request(url)
      .get('/api/log/list')
      .end((err,res) => {
        res.map(obj => {
          obj.should.be.a('object');
        });
      });
      done();
  }));

  it('it should GET an array with objects with id property', (done => {
    chai.request(url)
      .get('/api/log/list')
      .end((err,res) => {
        res.map(obj => {
          obj.should.have.property('id');
        });
      });
      done();
  }));

  it('it should GET an array with objects with data property', (done => {
    chai.request(url)
      .get('/api/log/list')
      .end((err,res) => {
        res.map(obj => {
          obj.should.have.property('data');
        });
      });
      done();
  }));

  it('it should GET an array with objects with data property with screen_name, followers_count, following_count, photo_url, bio, total_tweets properties', (done => {
    chai.request(url)
      .get('/api/log/list')
      .end((err,res) => {
        res.map(obj => {
          obj.data.should.have.property('screen_name');
          obj.data.should.have.property('followers_count');
          obj.data.should.have.property('following_count');
          obj.data.should.have.property('photo_url');
          obj.data.should.have.property('bio');
          obj.data.should.have.property('total_tweets');
        });
      });
      done();
  }));
});
