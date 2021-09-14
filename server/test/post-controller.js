const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const User = require('../User/model');
const Post = require('../Post/model');
const postController = require('../Post/controller');

describe('Post Controller', () => {
  before((done) => {
    const DB = process.env.TEST_DATABASE.replace(
      '<PASSWORD>',
      process.env.DATABASE_PASSWORD
    );
    mongoose
      .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(() => {
        console.log('DB CONNECTED SUCCESSFULLY');
        const user = new User({
          email: 'test@test.com',
          username: 'tester',
          name: 'testes',
          surname: 'tester',
          password: 'tester1234',
          passwordConfirm: 'tester1234',
          _id: '5c0f66b979af55031b34728a',
        });
        return user.save();
      })
      .then(() => {
        const post = new Post({
          author: '5c0f66b979af55031b34728a',
          text: 'test',
          _id: '5c0f66b979af55031b34728b',
        });
        return post.save();
      })
      .then(() => {
        done();
      });
  });

  describe('Test setAuthorId', () => {
    it('Req.body.author should be equal to req.user.id', () => {
      const req = {
        user: {
          id: '5c0f66b979af55031b34728a',
        },
        body: {},
      };
      postController.setAuthorId(req, {}, () => {});
      expect(req.body).to.has.property('author');
      expect(req.body.author).to.be.equal(req.user.id);
    });

    it('Req.body.author should not be equal req.user.id', () => {
      const req = {
        user: {
          id: '5c0f66b979af55031b34728a',
        },
        body: {
          author: '1234',
        },
      };
      postController.setAuthorId(req, {}, () => {});
      expect(req.body.author).to.be.equal('1234');
    });
  });

  describe('Test setQueryAuthor', () => {
    it('Req.user.author should be equal req.params.userId', () => {
      req = {
        params: {
          userId: '1234',
        },
        query: {},
      };
      postController.setQueryAuthor(req, {}, () => {});
      expect(req.query).to.has.property('author');
      expect(req.query.author).to.be.equal(req.params.userId);
    });
    it('Req.user.author should not be equal req.params.userId', () => {
      req = {
        params: {
          userId: '1234',
        },
        query: {
          author: '123',
        },
      };
      postController.setQueryAuthor(req, {}, () => {});
      expect(req.query.author).to.be.not.equal(req.params.userId);
      expect(req.query.author).to.be.equal('123');
    });
  });

  describe('Test isAuthor', () => {
    it('Post should belongs to user', (done) => {
      const req = {
        params: {
          id: '5c0f66b979af55031b34728b',
        },
        user: {
          id: '5c0f66b979af55031b34728a',
        },
      };
      const next = () => 'Post belongs to user';
      postController.isAuthor(req, {}, next).then((response) => {
        expect(response).to.be.not.an('error');
        expect(response).to.be.equal('Post belongs to user');
        done();
      });
    });

    it('Post should not belongs to user', (done) => {
      const req = {
        params: {
          id: '5c0f66b979af55031b34728b',
        },
        user: {
          id: '5c0f66b979af55031b34728c',
        },
      };
      const next = (err) => err;
      postController.isAuthor(req, {}, next).then((res) => {
        expect(res).to.be.an('error');
        expect(res.message).to.be.equal(
          'You are not authorized to update this post!'
        );
        expect(res).to.has.property('statusCode');
        expect(res.statusCode).to.be.equal(401);
        done();
      });
    });
  });

  after((done) => {
    User.deleteMany()
      .then(() => Post.deleteMany())
      .then(() => mongoose.disconnect())
      .then(done);
  });
});
