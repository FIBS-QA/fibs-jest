
const express = require('express');
const request = require('supertest');

const app = express();

describe('Fressnapf webshop', () => {
  it('test my profile endpoint', async() => {
    request(app)
      .get('https://webshop.fressnapf.hu/profilom')       
      .end((err, res) =>{
        expect(res.ok()).toBe(200);
        });
    });
});