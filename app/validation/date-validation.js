// validator just validates the format yyyy-mm-dd but not 30 and 31 day check neither leap year check
// isValidDate and isLeapYear included to validate it properly

var validator = require('validator');

function validation(mDate) {
    let year = mDate.slice(0, 4);
    let month = mDate.slice(5, 7);
    let date = mDate.slice(8, 10);

    if(validator.isISO8601(mDate) == false) {
        console.log('Invalid date format (yyyy-mm-dd).');
        return false;
    } else {
        if(!isValidDate(year, month, date)) {
            console.log('Invalid date limit.');
            return false;
        } else {
            return true;
        }
    }
}

function isValidDate(year, month, day)
{
    let maxYear = 2100;
    let minYear = 1900;

    // Check year, month and day within range limits
    if (year > maxYear || year < minYear)
        return false;
    if (month < 1 || month > 12)
        return false;
    if (day < 1 || day > 31)
        return false;

    // February month within leap year
    if (month == 2){
        if (isLeapYear(year))
            return (day <= 29);
        else
            return (day <= 28);
    }

    // April, June, Sept and Nov have 30 days max.
    if (month == 4 || month == 6 || month == 9 || month == 11)
        return (day <= 30);

    return true;
}

function isLeapYear(year)
{
    // Returning true if the year is multiple of 4 and not multiple of 100 OR year is multiple of 400.
    return (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0));
}

function sliceUTCtoISO(date) {
    // handling utc date and converting it to ISO8601 if necessary
    if(date.length > 10) {
        var adjustedDate = date.slice(0, 10);
        return adjustedDate;
    } else {
        return date;
    }
}

function convertStringToDate(mString) {
    // converts format ISO (yyyy-mm-dd) to object Date
    var components = mString.split("-").map(Number);
    return mDate = new Date(components[0], components[1], components[2]);
}

module.exports = {
    validation, isValidDate, isLeapYear, sliceUTCtoISO, convertStringToDate
}