(async () => {
  const chai = await import('chai');
  const chaiHttp = await import('chai-http');
  const app = require('../server.js'); // Adjust the path if necessary
  const Item = require('../models/item.js'); // Adjust the path if necessary

  chai.default.use(chaiHttp.default);
  const { expect } = chai.default;

  describe('Items API', () => {
    describe('GET /api/items', () => {
      it('should GET all the items', (done) => {
        chai.default.request(app)
          .get('/api/items')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });
    });

    describe('POST /api/items', () => {
      it('should not POST an item without name field', (done) => {
        const item = { quantity: 10 };
        chai.default.request(app)
          .post('/api/items')
          .send(item)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            done();
          });
      });

      it('should POST an item', (done) => {
        const item = { name: "Test Item", quantity: 10 };
        chai.default.request(app)
          .post('/api/items')
          .send(item)
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('name');
            expect(res.body).to.have.property('quantity');
            done();
          });
      });
    });
  });

  // Run Mocha programmatically
  const Mocha = require('mocha');
  const mocha = new Mocha();
  mocha.addFile(__filename);
  mocha.run();
})();
