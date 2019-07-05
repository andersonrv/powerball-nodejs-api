const dateValidation = require('../validation/date-validation');
const validator = require('validator');

describe('isLeapYear', () => {
    it('should be true for leap years.', () => {
        const result = dateValidation.isLeapYear(2000);
        expect(result).toBe(true);
    });
    
    it('should be false for normal years.', () => {
        const result = dateValidation.isLeapYear(2001);
        expect(result).toBe(false);
    });
})

describe('validation', () => {
    it('should return true if date is in the right format and limit.', () => {
        const result = dateValidation.validation('2017-10-28')
        expect(result).toBe(true);
    })

    it('should return false if date is not in ISO8601 format.', () => {
        const result = dateValidation.validation('200dsda91232451')
        expect(result).toBe(false);
    });

    it('should return false if date out of date range.', () => {
        const result = dateValidation.validation('2012-10-32')
        expect(result).toBe(false);
    });
})

describe('isValidDate', () => {
    it('should be false for year > 2100.', () => {
        const result = dateValidation.isValidDate(2101, 1, 1);
        expect(result).toBe(false);
    });

    it('should be false for year < 1900.', () => {
        const result = dateValidation.isValidDate(1899, 1, 1);
        expect(result).toBe(false);
    });

    it('should be false for month > 12.', () => {
        const result = dateValidation.isValidDate(2100, 13, 1);
        expect(result).toBe(false);
    });

    it('should be false for month < 1.', () => {
        const result = dateValidation.isValidDate(1900, 0, 1);
        expect(result).toBe(false);
    });

    it('should be false for day > 31.', () => {
        const result = dateValidation.isValidDate(2100, 12, 32);
        expect(result).toBe(false);
    });

    it('should be false for day < 1.', () => {
        const result = dateValidation.isValidDate(1900, 12, 0);
        expect(result).toBe(false);
    });

    it('should be false if is not a leap year and month has 29 days.', () => {
        const result = dateValidation.isValidDate(2003, 2, 29);
        expect(result).toBe(false);
    });

    it('should be true if is a leap year and month has 29 days.', () => {
        const result = dateValidation.isValidDate(2004, 2, 29);
        expect(result).toBe(true);
    });
    
    it('should be false for month 4 if day is 31.', () => {
        const result = dateValidation.isValidDate(2019, 4, 31);
        expect(result).toBe(false);
    });

    it('should be false for month 6 if day is 31.', () => {
        const result = dateValidation.isValidDate(2019, 6, 31);
        expect(result).toBe(false);
    });

    it('should be false for month 9 if day is 31.', () => {
        const result = dateValidation.isValidDate(2019, 9, 31);
        expect(result).toBe(false);
    });

    it('should be false for month 11 if day is 31.', () => {
        const result = dateValidation.isValidDate(2019, 11, 31);
        expect(result).toBe(false);
    });

    it('should be true for a regular date (2012-08-13).', () => {
        const result = dateValidation.isValidDate(2012, 8, 31);
        expect(result).toBe(true);
    });
})

describe('sliceUTCtoISO', () => {
    it('should return the first 10 elements of the string if its length is > 10.', () => {
        const result = dateValidation.sliceUTCtoISO('randomStringJustToTest');
        expect(result).toMatch(/randomStri/);
    });
    
    it('it should return the string itself if its length <= 10', () => {
        const result = dateValidation.sliceUTCtoISO('random');
        expect(result).toMatch(/random/);
    });
})

describe('convertStringToDate', () => {
    it('should return a Date object from a valid string with format yyyy-mm-dd.', () => {
        const result = dateValidation.convertStringToDate('2009-11-01');
        expect(result).toMatchObject(new Date(2009, 11, 1));
    });
})