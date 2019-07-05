const pickValidation = require('../validation/pick-validation');
const pick = require('../classes/pick');

function matchNumbers(date, result, picks) {
    var matchCounter = 0;
    var powerball = false;
    var defaultMultiplier = 1;
    var defaultPrize = 0;
    var arrayOfResult = [];

    // extracting numbers from text input
    var arrayOfPicks = pickValidation.convertPicksFromStringToArray(picks);

    // mapping result into array of numbers
    arrayOfResult.push(result[0].winning_numbers.split(" ").map(Number));
    var winningPicks = [];

    // display result (TO DO: move it to view)
    console.log('Winning Numbers: ' + arrayOfResult + '.');
    console.log('- - - - - - - - - -');

    // iterating over each pick in the ticket
    for(var i = 0; i < arrayOfPicks.length; i++) {
        // checking matches for the 5 first numbers of the pick (picks[i].length - 1)
        for(var j = 0; j < arrayOfPicks[i].length - 1 ; j++) {
            var rCounter = 0;
            while(rCounter < 5) {
                if(arrayOfPicks[i][j] == arrayOfResult[0][rCounter]) {
                    matchCounter++;
                }
                rCounter++;
            }
        }
        // checking powerball of the pick
        if(arrayOfPicks[i][arrayOfPicks[i].length - 1] == arrayOfResult[0][arrayOfResult[0].length - 1]) {
            powerball = true;
        }

        // push results for a pick into an array
        var mPick = new pick.Pick(date, arrayOfPicks[i], defaultMultiplier, matchCounter, powerball, defaultPrize);
        winningPicks.push(mPick);
        
        // reseting counters
        var matchCounter = 0;
        var powerball = false;
    }
    
    return winningPicks;
}

module.exports = {
    matchNumbers
}


