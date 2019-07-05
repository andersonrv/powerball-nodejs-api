const pickValidation = require('../validation/pick-validation');

describe('anyDuplicates', () => {
    it('should be true for the first 5 numbers of the pick.', () => {
        var arrayOfPicks = [[1, 2, 3, 4, 1, 6], [9, 10, 11, 12, 13, 14]];
        var numberOfRegularDraws = 5;
        const result = pickValidation.anyDuplicates(arrayOfPicks, numberOfRegularDraws);
        expect(result).toBe(true);
    });

    it('should be false for the last number in the pick.', () => {
        var arrayOfPicks = [[1, 2, 3, 4, 5, 6], [9, 10, 11, 12, 13, 9]];
        var numberOfRegularDraws = 5;
        const result = pickValidation.anyDuplicates(arrayOfPicks, numberOfRegularDraws);
        expect(result).toBe(false);
    });
})

describe('convertPicksFromStringToArray', () => {
    it('should return picks in the format of array of arrays.', () => {
        var mArray = ["01 02 03 04 05 06", "07 08 09 10 11 12", "13 14 15 16 17 18"];
        const result = pickValidation.convertPicksFromStringToArray(mArray);
        for(let i = 0; i < result.length; i ++) {
            expect((result[i]).length).toBe(6);
        } 
    });
})

describe('isPickFormatValid', () => {
    var pickStringLength = 17;
    
    it('should be false for formats different than "66 55 44 33 22 11".', () => {
        var arrayOfPicks = ["66 55 44 33 22 11", "55 44 33 22 11"];
        const result = pickValidation.isPickFormatValid(arrayOfPicks, pickStringLength);
        expect(result).toBe(false);
    });

    it('should be true for formats different than "66 55 44 33 22 11".', () => {
        var arrayOfPicks = ["66 55 44 33 22 11", "99 55 44 33 22 11"];
        const result = pickValidation.isPickFormatValid(arrayOfPicks, pickStringLength);
        expect(result).toBe(true);
    });
})

describe('isIntegerValid', () => {
    var minRange = 1;
    var maxRange = 69;
    it('should return false if input is not a Number.', () => {
        const result = pickValidation.isIntegerValid('9', minRange, maxRange);
        expect(result).toBe(false);
    });

    it('should return true if input between minRange and maxRange.', () => {
        const result = pickValidation.isIntegerValid(28, minRange, maxRange);
        expect(result).toBe(true);
    });

    it('should return false if input is lower than minRange.', () => {
        const result = pickValidation.isIntegerValid(0, minRange, maxRange);
        expect(result).toBe(false);
    });

    it('should return false if input is greater than maxRange.', () => {
        const result = pickValidation.isIntegerValid(70, minRange, maxRange);
        expect(result).toBe(false);
    });
})

describe('validation', () => {
    it('should return false if any of the picks is not valid.', () => {
        var ticketDate = "2019-06-08";

        var arrayOfPicks1 = ["66 55 44 33 22 11", "ff aa 44 33 22 11"];
        const result1 = pickValidation.validation(arrayOfPicks1, ticketDate);
        expect(result1).toBe(false);

        var arrayOfPicks2 = ["44 33 22 11", "66 55 44 33 22 11"];
        const result2 = pickValidation.validation(arrayOfPicks2, ticketDate);
        expect(result2).toBe(false);

        var arrayOfPicks3 = [];
        const result3 = pickValidation.validation(arrayOfPicks3, ticketDate);
        expect(result3).toBe(false);

        var arrayOfPicks4 = null;
        const result4 = pickValidation.validation(arrayOfPicks4, ticketDate);
        expect(result4).toBe(false);
    });

    it('should return false if any of the numbers in the picks are duplicated is not valid.', () => {
        var ticketDate = "2019-06-08";

        var arrayOfPicks5 = [[66, 66, 44, 33, 22, 11], [66, 55, 44, 33, 22, 11]];
        const result5 = pickValidation.validation(arrayOfPicks5, ticketDate);
        expect(result5).toBe(false);

        var arrayOfPicks6 = [[66, 66, 44, 33, 22, 11], [66, 55, 1, 1, 22, 11]];
        const result6 = pickValidation.validation(arrayOfPicks6, ticketDate);
        expect(result6).toBe(false);
    });

    it('should return false if any of the numbers are out of range', () => {
        var ticketDate = "2019-06-08";

        var arrayOfPicks7 = [[70, 66, 44, 33, 22, 11], [66, 55, 44, 33, 22, 11]];
        const result7 = pickValidation.validation(arrayOfPicks7, ticketDate);
        expect(result7).toBe(false);

        var arrayOfPicks8 = [[66, 66, 44, 33, 22, 11], [66, 55, 1, 1, 22, 27]];
        const result8 = pickValidation.validation(arrayOfPicks8, ticketDate);
        expect(result8).toBe(false);
    });

    it('should return true if nothing goes wrong.', () => {
        var ticketDate = "2019-06-08";

        var arrayOfPicks9 = ["66 55 44 33 22 11", "11 22 33 44 55 22"];
        const result9 = pickValidation.validation(arrayOfPicks9, ticketDate);
        expect(result9).toBe(true);
    });
})