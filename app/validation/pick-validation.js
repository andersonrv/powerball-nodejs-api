// it validates that picks is a string with length 17 and each element is within its value range

const dateValidation = require('./date-validation');

function validation(mPicks, ticketDate) {
    var pickSize = 6;
    var numberOfRegularDraws = 5;
    var regularLowerLimit = 1;
    var powerballLowerLimit = 1;
    var regularHigherLimit = 0;
    var powerballHigherLimit = 0;
    var arrayOfPicks = [];
    var pickStringLength = 17;
    var drawDate = dateValidation.convertStringToDate(ticketDate);

    // powerball had some changes in its pick limits throughout its history
    // Date                 Pick 5 of   Pick 1 of
    // January 7, 2009	    59	        39	
    // January 15, 2012	    59	        35	
    // January 19, 2014	    59	        35	
    // October 7, 2015 	    69	        26	
    
    // drawing limits according to draw date
    var drawLimit2009 = new Date(2009, 1, 7);
    if (drawDate >= drawLimit2009) {
        var regularHigherLimit = 59;
        var powerballHigherLimit = 39;
    }

    var drawLimit2012 = new Date(2015, 1, 15);
    if (drawDate >= drawLimit2012) {
        var regularHigherLimit = 59;
        var powerballHigherLimit = 35;
    }

    var drawLimit2015 = new Date(2015, 10, 7);
    if (drawDate >= drawLimit2015) {
        var regularHigherLimit = 69;
        var powerballHigherLimit = 26;
    }

    if(!Array.isArray(mPicks) || !mPicks.length) {
        return false;
    }

    // checking if each pick has the right length
    if(isPickFormatValid(mPicks, pickStringLength)) {
        arrayOfPicks = convertPicksFromStringToArray(mPicks);
    } else {
        return false;
    }

    // checking for duplicate numbers
    if (anyDuplicates(arrayOfPicks, numberOfRegularDraws) == true) {
        return false;
    }

    // checking if every number in the pick its within the game limit
    for(var i = 0; i < arrayOfPicks.length; i++) {
        for(var j = 0; j < arrayOfPicks[i].length; j++) {
            if(j < numberOfRegularDraws) {
                if(!isIntegerValid(arrayOfPicks[i][j], regularLowerLimit, regularHigherLimit)){
                    console.log(arrayOfPicks[i][j]);
                    console.log('Number is out of regular range.');
                    return false;
                }
            } else {
                if(!isIntegerValid(arrayOfPicks[i][j], powerballLowerLimit, powerballHigherLimit)){
                    console.log(arrayOfPicks[i][j]);
                    console.log('Number is out of powerball range.');
                    return false;
                }
            }
        }
    }

    return true;
}

function isIntegerValid(mNumber, minRange, maxRange) {
    if(!Number.isInteger(mNumber)) {
        return false;
    }
    if((mNumber >= minRange) && (mNumber <= maxRange)) {
        return true;
    } else {
        return false;
    }
}

function isPickFormatValid(mPicks, pickStringLength) {
    for(let i = 0; i < mPicks.length; i++) {
        if(mPicks[i].length !== pickStringLength) {
            console.log(mPicks[i]);
            console.log("Pick does not have the right format '66 55 44 33 22 11'.");
            return false;
        }
    }
    return true;
}

function convertPicksFromStringToArray(mPicks) {
    arrayOfPicks = [];
    for(let i = 0; i < mPicks.length; i++) {
        arrayOfPicks.push(mPicks[i].split(" ").map(Number));
    }
    return arrayOfPicks;
}

function anyDuplicates(arrayOfPicks, numberOfRegularDraws) {
    for(var i = 0; i < arrayOfPicks.length; i++) {
        // getting the 5 regular draw to check if there is any duplicated value
        slicedArray = arrayOfPicks[i].slice(0, numberOfRegularDraws);
        
        // double checking if the numbers are in an ascending order
        sortedArray = slicedArray.sort((x, y) => x - y);

        // checking if the pick has any duplicates
        for(var j = 0; j < sortedArray.length; j++) {
            if(sortedArray[j + 1] === sortedArray[j]) {
                console.log('The number ' + sortedArray[j + 1] + ' is duplicated.')
                return true;
            }
        }
    }
    return false;
}

module.exports = {
    validation, isIntegerValid, isPickFormatValid, convertPicksFromStringToArray, anyDuplicates
}