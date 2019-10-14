require('dotenv').config()
const { expect } = require('chai')
const supertest = require('supertest')

process.env.TEST_DB_URL = process.env.TEST_DB_URL
  || "postgresql://zachgw@localhost/hydrate-test"

global.expect = expect;
global.supertest = supertest;