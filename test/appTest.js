const chai = require("chai");
const chaiHttp = require("chai-http");
var request = require('request');

const app = require('../app')

const { expect } = chai;
chai.use(chaiHttp);
describe('GET /', () => {
  it('Main page content', done => {
    request('http://localhost:8080' , function(err, res, body) {
        expect(res).to.have.status(200);
        done();
    });
  });

  it('Main page content', done => {
    request('http://localhost:8080' , function(err, res, body) {
        expect(body).to.equal('Hello World!');
        done();
    });
  });
});
