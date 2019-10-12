const app = require('../src/app');

describe('App', () => {
  it('GET / responds with 200 containing "Welcome to Jurassic Park... Duh DAH duh na NUH"', () => {
    return supertest(app).get('/').expect(200, 'Welcome to Jurassic Park... Duh DAH duh na NUH')
  })
})

describe('User', () => {
  it('GET /api/user responds with 200', () => {
    return supertest(app).get('/api/user').expect(200)
  })
})

describe('Login', () => {
  it('GET /api/user/login responds with 200', () => {
    return supertest(app).get('/api/user/login').expect(200)
  })
})