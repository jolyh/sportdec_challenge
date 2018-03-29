const request = require('supertest');
const app = require('../app')

describe('404', () => {
    it("Say that this page doesn't exist", (done) => {
        request(app)
            .get('/test/test')
            .expect(404, done)
    })
})

describe('/', () => {
    it("Football research", () => {
        request(app)
            .get('/')
            .expect('Content-Type', '/json')
            .expect(200)
            .end((err, res) => {
                if (!res || !res[0])
                    throw Error("There should be a result")
                else if (err)
                    throw err
            })
    })
})

describe('/[subject]', () => {
    it("Any research - test with test", () => {
        request(app)
            .get('/test')
            .expect('Content-Type', '/json')
            .expect(200)
            .end((err, res) => {
                if (!res || !res[0])
                    throw Error("There should be a result")
                else if (err)
                    throw err
            })
    })
})