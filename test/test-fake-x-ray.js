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

/*test fake x-ray*/
describe('GET scrapped info by x-ray', () => {
  it('it should GET a string', (done => {
    chai.request(url)
      .get('/fake-x-ray/get-string')
      .end((err, res) => {
        res.should.be.a('string');
      });
    done();
  }));

  it('it should GET a object', (done => {
    chai.request(url)
      .get('/fake-x-ray/get-object')
      .end((err, res) => {
        res.should.be.a('object');
      });
    done();
  }));

  it('it should GET a array', (done => {
    chai.request(url)
      .get('/fake-x-ray/get-array')
      .end((err, res) => {
        res.should.be.a('array');
      });
    done();
  }));
});
