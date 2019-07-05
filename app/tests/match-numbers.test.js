const check = require('../controllers/match-numbers');
const Pick = require('../classes/pick');

describe('matchNumbers', () => {
    var date = '2009-06-05';
    var mockedResult = [{"draw_date":"2019-06-05T00:00:00.000","winning_numbers":"17 23 28 34 38 08","multiplier":"3"}];

    it('should return and array of Pick objects.', () => {
        let picks = ["17 23 28 34 38 08", "09 13 35 41 60 18", "08 11 23 28 38 08"];
        const result = check.matchNumbers(date, mockedResult, picks);
        expect(result[0].matches).toBe(5);
        expect(result[0].powerball).toBe(true);
        expect(result[0].prize).toBe(10000000);
        expect(result[1].matches).toBe(0);
        expect(result[1].powerball).toBe(false);
        expect(result[1].prize).toBe(0);
        expect(result[2].matches).toBe(3);
        expect(result[2].powerball).toBe(true);
        expect(result[2].prize).toBe(100);
    });
})