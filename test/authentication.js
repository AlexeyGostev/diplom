process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let User = require('../src/models/user');

//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/app');
let should = chai.should();

chai.use(chaiHttp);
//Наш основной блок
describe('Authentication', function() {
  before(async function() {
    let user;
    for (let i = 0; i < 5; i += 1) {
      user = new User({
        firstName: 'firstName ' + i,
        lastName: 'lastName ' + i,
        patronymic: 'patronymic ' + i,
        email: i + 'email@mail.ru',
        login: 'login' + i,
        password : '12345' + i,
        type: 'user'
      });
      await user.save();
    }
  });

  describe('POST /authentication', function() {
    it('it should be right login', (done) => {
      chai.request(server)
        .post('/authentication')
        .send({
          login: 'login1',
          password: '123451'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('errorCode').eql(0);
          res.body.body.should.have.property('accessToken').a('string');
          res.body.body.should.have.property('refreshToken').a('string');
          done();
        });
    });
    it('it should be wrong login', (done) => {
      chai.request(server)
        .post('/authentication')
        .send({
          login: 'login',
          password: '123451'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('errorCode').eql(1);
          res.body.body.should.not.have.property('accessToken');
          res.body.body.should.not.have.property('refreshToken');
          done();
        });
    });
    it('it should be wrong password', (done) => {
      chai.request(server)
        .post('/authentication')
        .send({
          login: 'login1',
          password: '123456'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('errorCode').eql(1);
          res.body.body.should.not.have.property('accessToken');
          res.body.body.should.not.have.property('refreshToken');
          done();
        });
    });
  });

});