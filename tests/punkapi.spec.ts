import * as utils from "../helpers/utils";

const request = require('supertest');
const fs = require('fs');
const baseUrl = 'https://api.punkapi.com/v2';

var beer : any;
var response: any;
var queryParam: string;

describe(`Random endpoint`, () => {
    queryParam = '/beers/random';

    beforeEach(async() => {
        response = await request(baseUrl).get(queryParam);
        beer = response.body[0];
    });

    it('returns only 1 beer with 21 keys', () => {
        expect(beer, "One beer should return").toHaveLength(1);
		expect(Object.keys(beer), "Returned beer should have 21 keys").toHaveLength(21);
    });

    it('returns 9 property value with Number type', () => {
        expect(utils.countElementsWithMatchingTypes(beer, "number"), "Should be 9 property with Number type").toEqual(9);
    });

    it('returns 6 or 7 property value with String type', () => {
        expect(utils.countElementsWithMatchingTypes(beer, "string"), "Should be 6 or 7 property with String type").toBeGreaterThanOrEqual(6);
        expect(utils.countElementsWithMatchingTypes(beer, "string"), "Should be 6 or 7 property with String type").toBeLessThanOrEqual(7);
    })

    it('returns 5 property value with Object type', () => {
        expect(utils.countElementsWithMatchingTypes(beer, "object"), "Should be 5 property with Object type").toEqual(5);
    })

    it('returns the expected types', () => {
        expect(typeof beer.id, "id's content should be a Number").toBe("number");
        expect(typeof beer.name, "name's content should be an String").toBe("string");
        expect(typeof beer.tagline, "tagline's content should be an String").toBe("string");
        expect(typeof beer.first_brewed, "first_brewed's content should be an String").toBe("string");
        expect(typeof beer.description, "description's content should be an String").toBe("string");
        expect(typeof beer.image_url, "image_url's content should be an String").toBe("string");
        expect(typeof beer.abv, "abv's content should be a Number").toBe("number");
        expect(typeof beer.ibu, "ibu's content should be a Number").toBe("number");
        expect(typeof beer.target_fg, "target_fg's content should be a Number").toBe("number");
        expect(typeof beer.target_og, "target_og's content should be a Number").toBe("number");
        expect(typeof beer.ebc, "ebc's content should be a Number").toBe("number");
        expect(typeof beer.srm, "srm's content should be a Number").toBe("number");
        expect(typeof beer.ph, "ph's content should be a Number").toBe("number");
        expect(typeof beer.attenuation_level, "attenuation_level's content should be a Number").toBe("number");
        expect(typeof beer.volume, "volume's content should be an Object").toBe("object");
        expect(typeof beer.boil_volume, "boil_volume's content should be an Object").toBe("object");
        expect(typeof beer.method, "method's content should be an Object").toBe("object");
        expect(typeof beer.ingredients, "ingredients's content should be an Object").toBe("object");
        expect(typeof beer.food_pairing, "food_pairing's content should be an Object").toBe("object");
        expect(typeof beer.brewers_tips, "brewers_tips's content should be an String").toBe("string");
        expect(typeof beer.contributed_by, "contributed_by's content should be an String").toBe("string");
    })

    it('first_brewed is in MM/YYYY format (regex)', () => {
        expect(beer.first_brewed, "First_brewed is not in the right date format").toMatch(/((0[1-9])|(1[0-2]))\/(\d{4})/);
    })

    it('volume related properties are correct', () => {
        expect(beer.volume.value, "Volume value should be at least 0").toBeGreaterThanOrEqual(0);
        expect(beer.volume.value, "Volume value should be maximum 100").toBeGreaterThanOrEqual(100);

        expect(beer.boil_volume.value, "Boil_volume value should be at least 0").toBeGreaterThanOrEqual(0);
        expect(beer.boil_volume.value, "Boil_volume value should be maximum 100").toBeGreaterThanOrEqual(100);
    })

    it('method contains the right properties', () => {
        expect(beer.method.hasOwnProperty("mash_temp"), "Beers's method obj contains mash_temp").toBe(true);
        expect(beer.method.hasOwnProperty("fermentation"), "Beers's method obj contains fermentation").toBe(true);
        expect(beer.method.hasOwnProperty("twist"), "Beers's method obj contains twist").toBe(true);
    })

    it('ingredients contains the right properties', () => {    
        expect(beer.ingredients.hasOwnProperty("malt"), "Beers's ingredients obj contains malt").toBe(true);
        expect(beer.ingredients.hasOwnProperty("hops"), "Beers's ingredients obj contains hops").toBe(true);
        expect(beer.ingredients.hasOwnProperty("yeast"), "Beers's ingredients obj contains yeast").toBe(true);

        expect(beer.ingredients.malt.length, "Beer's malt ingredient should contain more item than 3").toBeGreaterThanOrEqual(3);
        expect(beer.ingredients.hops.length, "Beer's hops ingredient should contain more item than 3").toBeGreaterThanOrEqual(3);
    })

    it('food_pairing contains strings and brewers_tips are longer than 3 words', () => {
        expect(utils.CheckIfObjectContainsStringArray(beer.food_pairing)).toBe(true);
        expect(beer.brewers_tips.split(" ").length, "Beer's brewer tips should contain more words than 3").toBeGreaterThanOrEqual(3);
    })

    it('sum the needed amount of ingredients', () => {
        expect(utils.SumIngredients(beer.ingredients.malt), "Sum of the malt ingrdients should be 1 at least").toBeGreaterThanOrEqual(1);
        expect(utils.SumIngredients(beer.ingredients.hops), "Sum of the hops ingrdients should be 1 at least").toBeGreaterThanOrEqual(1);
    })
});

describe(`Default endpoint`, () => {
    queryParam = '/beers';
    let beers : Object[];

    beforeEach(async() => {
        response = await request(baseUrl).get(queryParam);
        beers = response.body;
    });

    it('default beers returned as expected', () => {
        expect(beers, "25 beers should return").toHaveLength(25);
        expect(utils.IsAscendingById(beers), "Beer ids are not ascending ordered").toBe(true);
    })
});

describe('Get special beers', () => {
    queryParam = '/beers?yeast=Wyeast_3522_-_Belgian_Ardennes&hops=Tomahawk';

    beforeEach(async() => {
        response = await request(baseUrl).get(queryParam);
        beer = response.body[0];
    })

    it('returns beer(s) with Wyeast 3522 - Belgian Ardennes yeast and Tomahawk hops', () => {
        expect(beer, "Should return at least 1 beer").toHaveLength(1);
        console.log(beer);
    })

    it('Beers w/ Wyeast 3522 - Belgian Ardennes yeast + Tomahawk hops should contain double 12.5g Magnum hops', () => {
        const result = beer.ingredients.hops
            .filter(({ name, amount }: any) =>
            name === 'Magnum' && amount.value === 12.5 && amount.unit === 'grams');

        expect(result, "Should return two type of hops").toHaveLength(2)
    })

    it('IBU content is number for the selected beer(s)', () => {
        expect(typeof beer.ibu, "IBU content is number").toBe("number");
    })

    it('Description is not empty for the selected beer(s)', () => {
        expect(beer.description.length, "Description should return").toBeGreaterThan(0);
    })
});

describe('Response can be saved into file and can be used as a fixture', () => {
    const file = "artifacts/response.json";

    beforeEach(async() => {
        queryParam = "/beers/9";
        response = await request(baseUrl).get(queryParam);
        beer = response.body[0];
        fs.writeFileSync(file, JSON.stringify(beer));
    })
    
    it('Validate beer in the created file', ()=>{
        const jsonString = fs.readFileSync(file);
        const beerFromFile = JSON.parse(jsonString);

        expect(beer.name, "Beer is not saved into file").toEqual(beerFromFile.name);
   });
});
