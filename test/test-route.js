/*jshint esversion: 6*/
const mongoose = require('mongoose');
const ScrappedInfo = require('../models/scrappedInfo.model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
//const url = 'http://localhost:3000';
const url = 'https://twitter-info-scrapping.herokuapp.com/';
chai.use(chaiHttp);

describe('Check routes', () => {
  it('it should GET a 200 status code',(done => {
    chai.request(url)
    .get('')
    .end((err,res) => {
      res.should.have.property('status', 200);
    });
    done();

  }));

  it('it should GET a 200 status code', (done => {
    chai.request(`${url}/api/user`)
      .get('/influencity')
      .end((err, res) => {
        res.should.be.a('object');
      });
      done();
  }));

  it('it should GET a 200 status code', (done => {
    chai.request(`${url}api/log/list`)
      .get('/')
      .end((err, res) => {
        res.should.be.a('object');
      });
      done();
  }));
});
