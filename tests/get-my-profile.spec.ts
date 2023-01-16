
const express = require('express');
const request = require('supertest');
// const expect = require('chai').expect;

const app = express();

describe('Fressnapf webshop', () => {
  it('tests /profilom get request', async() => {
    request(app)
      .get('https://webshop.fressnapf.hu/profilom')       
      .end((err, res) =>{
        expect(res.ok()).toBe(200);
        });
    });
});