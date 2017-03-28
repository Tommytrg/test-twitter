/*jshint esversion: 6*/

const mongoose = require('mongoose');
const ScrappedInfo = require('../models/scrappedInfo.model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const url = 'http://localhost:3000';
//const url = 'https://twitter-info-scrapping.herokuapp.com';
chai.use(chaiHttp);

//works
describe('GET scrapped info by x-ray', done => {
  it('it should GET a string', (done => {
    chai.request(url)
      .get('/fake-x-ray/get-string')
      .then((err, res) => {
        res.body.should.be.a('string');
      }).then(done());
  }));

  it('it should GET a object', (done => {
    chai.request(url)
      .get('/fake-x-ray/get-object')
      .then((err, res) => {
        res.body.should.be.a('object');
      }).then(done());
  }));

    it('it should GET a array', (done => {
      chai.request(url)
        .get('/fake-x-ray/get-array')
        .then((err, res) => {
          res.body.should.be.a('array');
          done();
        }).then(done());
    }));
});
