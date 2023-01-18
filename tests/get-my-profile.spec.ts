
const express = require('express');
const request = require('supertest')('https://webshop.fressnapf.hu');

const app = express();

describe('Fressnapf webshop', () => {
  it('test my profile endpoint', async() => {      
      try {
        const res = await request(app).get('/profilom');
        expect(res).toBe(200);  
      } catch (err) {
        console.log(`${err}`);
      }
    });
});
