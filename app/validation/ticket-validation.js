// Show results on POST '/results'

const dateValidation = require('./date-validation');
const pickValidation = require('./pick-validation');
const check = require('../controllers/match-numbers');
const powerballConnection = require('../controllers/results');
const showResults = require('../view/display-results');
const pick = require('../classes/pick');

function ticketValidation(req, res) {
    // Adjusting the date
    var ticketDate = dateValidation.sliceUTCtoISO(req.body.date);

    // Validating ticket requested
    var isValidDate = dateValidation.validation(ticketDate);
    var isValidPick = pickValidation.validation(req.body.picks, ticketDate);

    if(!isValidDate) {
        console.log('Invalid date format (yyyy-mm-dd).');
        sendMessageToUser(res, 'Invalid date format (yyyy-mm-dd).');
    } else if (!isValidPick){
        console.log("Ticket has an invalid pick.");
        sendMessageToUser(res, 'Ticket has an invalid pick.');
    } else if (isValidDate && isValidPick) {
        var ticket = new pick.Pick(ticketDate, req.body.picks);

        powerballConnection.getResult(ticketDate)
            .then(promisedValues => handlingPowerballResponse(ticket.date, promisedValues, ticket.picks))
            .then(result => sendMessageToUser(res, result))
            .catch(err => console.log('Error: ', err.message));
    }
}

// checking if informed date had a drawing
function handlingPowerballResponse(ticketDate, promisedResult, ticketPicks) {
    if (promisedResult.length !== 0) {
        var prize = check.matchNumbers(ticketDate, promisedResult, ticketPicks);
        showResults.onConsole(prize);
        return showResults.forUser(prize);
    } else {
        console.log("There is no drawing for the required date.")
        return "There is no drawing for the required date.";
    }
}

function sendMessageToUser(response, message) {
    return response.status(200).send(message);
}

module.exports = {
    ticketValidation, handlingPowerballResponse, sendMessageToUser
}