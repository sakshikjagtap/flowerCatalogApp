const request = require('supertest');
const { createApp } = require('../src/app');
const fs = require('fs');
const assert = require('assert');

describe('test app', () => {
  let config = {};
  let fileOperations = {};
  let details = {};

  beforeEach(() => {
    config = {
      guestBookSrc: '[]',
      guestBook: '__Comments__',
      sessions: {},
    }

    details = {
      users: { 'abc': { username: 'abc', password: 'a' } },
      sessions: {}
    }

    fileOperations = {
      write: (file) => file,
      read: (file) => file
    };
  })

  describe('path:/invalid', () => {
    it('should return error for invalid path', (done) => {
      request(createApp(config, fileOperations, details))
        .get('/invalid')
        .expect(404, done)
    });
  });

  describe('path:/', () => {
    it('should give homepage for GET /', (done) => {
      const homePage = fs.readFileSync('./public/index.html', 'utf-8');
      request(createApp(config, fileOperations, details))
        .get('/')
        .expect(200)
        .expect('content-type', 'text/html; charset=UTF-8')
        .expect(homePage, done)
    });
  });

  describe('path:/guest-book', () => {
    it('should redirect to login if cookie is not set', (done) => {
      request(createApp(config, fileOperations, details))
        .get('/guest-book')
        .expect(302)
        .expect('location', '/login.html', done);
    });

    it('should show guestbook page if session is already set', (done) => {
      details.sessions = {
        123: {
          sessionId: 123,
          username: 'abc',
          date: new Date().toLocaleString()
        }
      }

      const expectedHTML = '';
      request(createApp(config, fileOperations, details))
        .get('/guest-book')
        .expect(200)
        .set('Cookie', ['sessionId=123'])
        .expect(expectedHTML, done)
    });

    it('should show guestbook page if session is already set with existing cookies', (done) => {
      details.sessions = {
        123: {
          sessionId: 123,
          username: 'abc',
          date: new Date().toLocaleString()
        }
      }
      config.guestBookSrc =
        '[{"comment":"hello","id":1,"username":"abc","date":"13/07/2022, 14:49:18"}]';

      const expectedHTML = '<li id=1>13/07/2022, 14:49:18 abc : hello</li>';
      request(createApp(config, fileOperations, details))
        .get('/guest-book')
        .expect(200)
        .set('Cookie', ['sessionId=123'])
        .expect(expectedHTML, done)
    });

    it('should add a comment if post /guest-book', (done) => {
      const actual = [];
      const write = (file, content) => {
        actual.push(content);
      };

      details.sessions = {
        123: {
          sessionId: 123,
          username: 'abc',
          date: new Date().toLocaleString()
        }
      }
      fileOperations.write = write;

      const date = new Date().toLocaleString();
      const expected = [`[{"comment":"hello","id":1,"username":"abc","date":"${date}"}]`];
      request(createApp(config, fileOperations, details))
        .post('/guest-book')
        .set('Cookie', ['sessionId=123'])
        .send('comment=hello')
        .expect('comment added')
        .end((error, res) => {
          done(error)
          assert.deepStrictEqual(actual, expected);
        })
    });
  });

  describe('path:/login.html', () => {
    it('should give login page for GET /login.html', (done) => {
      const loginPage = fs.readFileSync('./public/login.html', 'utf-8');
      request(createApp(config, fileOperations, details))
        .get('/login.html')
        .expect(200)
        .expect('content-type', 'text/html; charset=UTF-8')
        .expect(loginPage, done)
    });
  });

  describe('path:/login', () => {
    it('should redirect to guest-book if user is valid', (done) => {
      request(createApp(config, fileOperations, details))
        .post('/login')
        .send('username=abc&password=a')
        .expect(200)
        .expect('set-cookie', /sessionId=\d+/)
        .expect('login successful', done)
    });

    it('should redirect to /login if user is invalid', (done) => {
      request(createApp(config, fileOperations, details))
        .post('/login')
        .send('username=abcd&password=a')
        .expect(404, done)
    });
  });

  describe('path:/api', () => {
    it('should send api of flower catalouge', (done) => {
      const expected = {
        flowers: 'http://localhost:9999/api/flowers',
        comment: 'http://localhost:9999/api/comment'
      };

      request(createApp(config, fileOperations, details))
        .get('/api')
        .expect(200)
        .expect(JSON.stringify(expected), done)
    });

    it('should send api of flowers', (done) => {
      const expected = [
        {
          name: 'abeliophyllum', url: 'http://localhost:9999/Abeliophyllum.html'
        },
        {
          name: 'agerantum', url: 'http://localhost:9999/agerantum.html'
        }
      ];

      request(createApp(config, fileOperations, details))
        .get('/api/flowers')
        .expect(200)
        .expect(JSON.stringify(expected), done)
    });

    it('should send api of comments', (done) => {
      const expected = [];
      request(createApp(config, fileOperations, details))
        .get('/api/comment')
        .expect(200)
        .expect(JSON.stringify(expected), done)
    });
  });

  describe('path:/signup', () => {

    it('should redirect to signup.html page', (done) => {
      request(createApp(config, fileOperations, details))
        .get('/signup')
        .expect(302, done);
    });

    it('should show a signup page ', (done) => {
      const signupPage = fs.readFileSync('./public/signup.html', 'utf-8');

      request(createApp(config, fileOperations, details))
        .get('/signup.html')
        .expect(200)
        .expect(signupPage, done)
    });

    it('should add a user', (done) => {
      const expected = {
        'abc': { username: 'abc', password: 'a' },
        'sakshi': { username: 'sakshi', password: 'abc' }
      }

      request(createApp(config, fileOperations, details))
        .post('/signup')
        .send("username=sakshi&password=abc")
        .end((err, res) => {
          assert.strictEqual(res.statusCode, 200);
          assert.strictEqual(res.text, 'signup successful');
          assert.deepStrictEqual(details.users, expected);
          done();
        })
    });

    it('should give user already exist message', (done) => {
      const expected = {
        'abc': { username: 'abc', password: 'a' },
      }

      request(createApp(config, fileOperations, details))
        .post('/signup')
        .send("username=abc&password=a")
        .end((err, res) => {
          assert.strictEqual(res.statusCode, 409);
          assert.strictEqual(res.text, 'already exist');
          assert.deepStrictEqual(details.users, expected);
          done();
        })
    });
  });
});
