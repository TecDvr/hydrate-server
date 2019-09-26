const app = require('../src/app')

describe('App', () => {
  it('GET / responds with 200 containing "Welcome to Jurassic Park... Duh DAH duh na NUH"', () => {
    return supertest(app).get('/').expect(200, 'Welcome to Jurassic Park... Duh DAH duh na NUH')
  })
})