// imports
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Testing API Service', function () {
  // get all  
  it('should GET all tests', function (done) {
      chai
        .request('http://localhost:3000')
        .get('/api/testing')
        .end(function (err, resp) {
          expect(resp.status).to.be.eql(200);
          expect(resp.body).to.be.a('array');
          expect(resp.body.length).to.not.be.eql(0);
          done();
        });
    });
  
  // get one
    it('should GET a single test', function (done) {
      const expected = [
        {
          id: 1,
          name: "Test1",
          created_date: '2025-02-12T05:12:00.000Z',
          status: 'completed',
        },
      ];
  
      chai
        .request('http://localhost:3000')
        .get('/api/testing/:id')
        .end(function (err, resp) {
          expect(resp.status).to.be.eql(200);
          expect(resp.body).to.be.a('array');
          expect(resp.body.length).to.not.be.eql(0);
          expect(resp.body).to.be.eql(expected);
          done();
        });
    });
  
    // create
    it.skip('should POST a single test', function (done) {
      const newTest = {
        name: 'New test postedTest!',
      };
      const expected = { message: 'test successfully added' };
  
      chai
        .request('http://localhost:3000')
        .post('/api/testing')
        .send(newTest)
        .end(function (err, resp) {
          expect(resp.status).to.be.eql(200);
          expect(resp.body).to.be.eql(expected);
          done();
        });
    });

    // update
    it('should PUT a single test', function (done) {
      const newTest = {
        name: 'New test updated!',
        status: 'in progress',
      };
      const expected = { message: 'test successfully updated' };

      chai
        .request('http://localhost:3000')
        .put('/api/testing/:id')
        .send(newTest)
        .end(function (err, resp) {
          expect(resp.status).to.be.eql(200);
          expect(resp.body).to.be.eql(expected);
          done();
        });
    });

    // delete
    it('should DELETE a single test', function (done) {
      const expected = { message: 'test successfully deleted' };

      chai
        .request('http://localhost:3000')
        .delete('/api/testing/:id')
        .end(function (err, resp) {
          expect(resp.status).to.be.eql(200);
          expect(resp.body).to.be.eql(expected);
          done();
        });
    });
  });