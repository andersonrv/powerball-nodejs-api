// display results to user

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

function onConsole(ticket) {
    var totalPrize = 0;

    for(var i = 0; i < ticket.length; i++) {
        totalPrize += ticket[i].prize;
        console.log('Pick number ' + (i + 1) + ': ' + ticket[i].picks + '.');
        console.log('Regular Matches: ' + ticket[i].matches + '.');
        if(ticket[i].powerball == true) {
            console.log('Powerball: scored!');
        } else {
            console.log('Powerball: missed...');
        }
        console.log('Prize for this pick: ' + formatter.format(ticket[i].prize) + '.');
        console.log('- - - - - - - - - -');
    }

    console.log('TICKET TOTAL PRIZE = ' + formatter.format(totalPrize) + '.');

    return ticket;
}

function forUser(ticket) {
    var message = "";
    var totalPrize = 0;

    for(var i = 0; i < ticket.length; i++) {
        totalPrize += ticket[i].prize;
        message += 'Pick number ' + (i + 1) + ': ' + ticket[i].picks + '.\r\n';
        message += 'Regular Matches: ' + ticket[i].matches + '.\r\n';
        if(ticket[i].powerball == true) {
            message += 'Powerball: scored!\r\n';
        } else {
            message += 'Powerball: missed...\r\n';
        }
        message += 'Prize for this pick: ' + formatter.format(ticket[i].prize) + '.\r\n';
        message += '- - - - - - - - - -\r\n';
    }

    message += 'TICKET TOTAL PRIZE = ' + formatter.format(totalPrize) + '.\r\n';

    return message;
}

module.exports = {
    onConsole, forUser
}