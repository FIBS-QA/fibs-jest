
const exp = require('express');
const req = require('supertest');

const appSearch = exp();

describe('Search in Fressnapf webshop', () => {
    it('test search endpoint', async() => {
      try {
        const searchItem= 'nyakörv';
        const res = await req(appSearch).post(`https://webshop.fressnapf.hu/?woof_text=${searchItem}&post_type=product&swoof=1`);
        expect(res).toBe(200);
      } catch (err) {
        console.log(`Error ${err}`);
      }
    });
});
