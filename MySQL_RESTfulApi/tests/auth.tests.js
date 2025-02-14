// imports
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Auth API service', () => {
  // register
  it.skip('should POST a new user', (done) => {
    const testUser = {
      username: 'admin',
      password: 'password',
      email: 'admin@example.com',
    };
    
    const expected = { msg: 'new user created'};

    chai
      .request('http://localhost:3000')
      .post('/api/auth/register')
      .send(testUser)
      .end((err, resp) => {
        console.log(resp.body);
        expect(resp.body.username).to.eql(expectedUser.username);
        expect(resp.body.email).to.eql(expectedUser.email);
        expect(resp.body.password).to.eql(expectedUser.password);
        expect(resp.body).to.eql(expected);
        done();
      });
  });

  it('should not POST a new user if they already exist', (done) => {
    const testUser = {
      username: 'admin',
      password: 'password',
      email: 'admin@example.com',
    };
    const expected = { msg: 'user already exists' };

    chai
      .request('http://localhost:3000')
      .post('/api/auth/register')
      .send(testUser)
      .end((err, resp) => {
        expect(resp.body).to.eql(expected);
        done();
      });
  });

  // loggin
  it('should POST a login for an existing user', (done) => {
    const testUser = {
      username: 'admin',
      password: 'password',
      email: 'admin@example.com',
    };

    chai
      .request('http://localhost:3000')
      .post('/api/auth/login')
      .send(testUser)
      .end((err, resp) => {
        expect(resp.body.auth).to.be.true;
        expect(resp.body.expires_in).to.be.eql(86400);
        expect(resp.body.access_token).to.be.a('string');
        expect(resp.body.refresh_token).to.be.a('string');
        done();
      });
  });

  it('should not POST a login for a user that does not exist', (done) => {
    const testUser = {
      username: 'nonexistent',
      password: 'password',
      email: 'none@nowhere.com'
    };

    chai
      .request('http://localhost:3000')
      .post('/api/auth/login')
      .send(testUser)
      .end((err, resp) => {
        expect(resp.body).to.eql({ msg: 'unable to retrieve user' });
        done();
      });
  });

  it('should not POST a login for a user with the wrong password', (done) => {
    const testUser = {
      username: 'admin',
      password: 'wrongpassword',
      email: 'admin@example.com'
    };

    chai
      .request('http://localhost:3000')
      .post('/api/auth/login')
      .send(testUser)
      .end((err, resp) => {
        expect(resp.body).to.eql({ msg: 'invalid password!' });
        done();
      });
  });

  // token
  it('should POST a refresh token', (done) => {
    const testUser = {
      username: 'admin',
      password: 'password',
      email: 'admin@example.com'
    };

    chai
      .request('http://localhost:3000')
      .post('/api/auth/login')
      .send(testUser)
      .end((err, resp) => {
        const refreshToken = resp.body.refresh_token;
        chai
          .request('http://localhost:3000')
          .post('/api/auth/token')
          .send({ token: refreshToken })
          .end((err, resp) => {
            expect(resp.body.access_token).to.be.a('string');
            expect(resp.body.expires_in).to.be.eql(86400);
            done();
          });
      });
  });

  it('should not POST a refresh token if one is not provided', (done) => {
    chai
      .request('http://localhost:3000')
      .post('/api/auth/token')
      .end((err, resp) => {
        expect(resp.body).to.eql({ auth: false, msg: 'access denied, no valid refresh token.' });
        done();
      });
  });

  it('should not POST a refresh token if one is invalid', (done) => {
    chai
      .request('http://localhost:3000')
      .post('/api/auth/token')
      .send({ token: 'invalidtoken' })
      .end((err, resp) => {
        expect(resp.body).to.eql({ msg: 'invalid refresh token' });
        done();
      });
  });

  it('should not POST a refresh token if one is expired', (done) => {
    chai
      .request('http://localhost:3000')
      .post('/api/auth/token')
      .send({ token: 'expiredtoken' })
      .end((err, resp) => {
        expect(resp.body).to.eql({ msg: 'invalid refresh token' });
        done();
      });
  });

  it('should not POST a refresh token if one is malformed', (done) => {
    chai
      .request('http://localhost:3000')
      .post('/api/auth/token')
      .send({ token: 'malformedtoken' })
      .end((err, resp) => {
        expect(resp.body).to.eql({ msg: 'invalid refresh token' });
        done();
      });
  });

  // logout
  it('should POST a logout', (done) => {
    const testUser = {
      username: 'admin',
      password: 'password',
      email: 'admin@example.com'
    };

    chai
      .request('http://localhost:3000')
      .post('/api/auth/login')
      .send(testUser)
      .end((err, resp) => {
        const refreshToken = resp.body.refresh_token;
        chai
          .request('http://localhost:3000')
          .post('/api/auth/logout')
          .send({ token: refreshToken })
          .end((err, resp) => {
            expect(resp.body).to.eql({ msg: 'logout successful' });
            done();
          });
      });
  });

});