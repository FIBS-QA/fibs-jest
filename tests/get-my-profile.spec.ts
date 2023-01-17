
const express = require('express');
const request = require('supertest');

const app = express();

describe('Fressnapf webshop', () => {
  it('test my profile endpoint', async() => {      
      try {
        const res = await request(app).get('https://webshop.fressnapf.hu/profilom');
        expect(res).toBe(200);  
      } catch (err) {
        console.log(`${err}`);
      }
    });
});
