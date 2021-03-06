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

/*Test routes*/

describe('Check routes', done => {
  it('/ should GET 200 status code', done => {
    chai.request(url)
      .get('/')
      .then(res => {
        res.should.have.property('status', 200);
      }).then(done,done);
  });

  it('/api/user should GET a 200 status code', (done => {
    chai.request(`${url}/api/user`)
      .get('/influencity')
      .then(res => {
        res.should.have.property('status', 200);
      }).then(done, done);
  }));

  it('log/list should GET a 200 status code', (done => {
    chai.request(`${url}/api/log/list`)
      .get('')
      .then(res => {
        res.should.have.property('status', 200);
      }).then(done, done);
  }));
});
