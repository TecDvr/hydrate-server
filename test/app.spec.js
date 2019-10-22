const app = require('../src/app');
const knex = require('knex')


//APP
  describe('App', () => {
    it('GET / responds with 200 containing "Welcome to Jurassic Park... Duh DAH duh na NUH"', () => {
      return supertest(app).get('/').expect(200, 'Welcome to Jurassic Park... Duh DAH duh na NUH')
    })
  })

//USER LOGIN 
  describe('User', () => {
    let db

    const userPatch = {
      glasses: 9
    }

    const userPatchText = {
      text_me: false
    }

    function makeAuthHeader(user) {
      const token = Buffer.from(`${user.username}:${user.password}`).toString('base64')
      return `Basic ${token}`
    }

    const user = {
      "username": "test",
        "password": "test",
        "glasses": "8",
        "phone": "9259222554",
        "text_me": "false"
    }

    let testData = [
      {
        username: 'testName',
        password: 'testPassword',
        glasses: 10,
        phone: 9259222554,
        text_me: false
      }
    ]

    before(() => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DATABASE_URL,
      })
      app.set('db', db)
    })

    before(() => {
        return db
          .into('hydrate_users')
          .insert(testData)
    })

    after(() => db.destroy())

//USER
    describe('USER', () => {
      
      it('GET /api/user responds with 200', () => {
        return supertest(app).get('/api/user').expect(200).expect('Content-Type', /json/)
      });
  
      it('POST /api/user responds with 201', () => {
        return supertest(app).post('/api/user').send(user).expect(201)
      })
    })

//LOGIN
    describe('Login', () => {
      it('POST /api/user/login responds with 201', () => {
        return supertest(app).post('/api/user/login').send(user).expect(200 || 201)
      })
    })

//USER PROFILE
    describe('User Profile', () => {
      it('GET /api/user/:id responds with 200', () => {
        return supertest(app).get('/api/user/49').set('Authorization', makeAuthHeader(user)).expect(200).expect('Content-Type', /json/)
      })

      it('PATCH /api/user/:id responds with 204', () => {
        return supertest(app).patch('/api/user/49').set('Authorization', makeAuthHeader(user)).send(userPatch).expect(204)
      })
    })

//WATER WEEKS
    describe('Water weeks', () => {
      it('GET /api/user/water/week/:user_id responds with 200', () => {
        return supertest(app).get('/api/user/water/week/49').set('Authorization', makeAuthHeader(user)).expect(200).expect('Content-Type', /json/)
      })
    })

//TEXT ME
    describe('Text me', () => {
      it('PATCH /api/textme/:id resoinds with 204', () => {
        return supertest(app).patch('/api/textme/49').send(userPatchText).expect(204)
      })
    })

//WATER CONSUMED
    describe('Water consumed', () => {

      const userPatch = {
        amount: 9
      }

      it('GET /api/user/waterconsumed/:user_id responds with 200', () => {
        return supertest(app).get('/api/user/waterconsumed/49').set('Authorization', makeAuthHeader(user)).expect(200).expect('Content-Type', /json/)
      })

      it('PATCH /api/user/waterconsumed/:user_id responds with 204', () => {
        return supertest(app).patch('/api/user/waterconsumed/49').set('Authorization', makeAuthHeader(user)).send(userPatch).expect(204)
      })
    })
})



