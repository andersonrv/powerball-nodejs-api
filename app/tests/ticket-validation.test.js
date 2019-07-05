const ticketValidation = require('../validation/ticket-validation');
const powerballConnection = require('../controllers/results');

// mocking results using jest not to rely on external connections
describe('handlingPowerballResponse', () => {
    it('should be send a message to the user informing the results and his prize.', () => {
        powerballConnection.getResult = jest.fn().mockReturnValue([{"draw_date":"2019-06-08T00:00:00.000","winning_numbers":"09 13 42 48 60 18","multiplier":"2"}]);
        var ticketDate = '2019-06-08';
        var ticketPicks = ["04 15 40 44 69 21", "01 23 36 46 50 10", "09 13 42 48 60 18"];
        const result = ticketValidation.handlingPowerballResponse(ticketDate, powerballConnection.getResult(), ticketPicks);
        expect(result).toMatch(/10,000,000.00/);
    });
})

//
// Integration test to be fully implemented.
// 

// describe('ticketValidation', () => {
//     var req = {
//         body: {"date": "2019",
//         "picks": ["04 15 40 44 69 21", "01 23 36 46 50 10", "09 13 42 48 60 18"]}
        
//     };
    

//     var res = {
//         date: '2019-06-08',
//         url: '/results',
//         method: 'POST',
//         body: { date: '2019-06-08', picks: ["08 13 42 48 60 18", "09 13 34 41 60 18", "02 16 23 44 52 11"] }
//     }

//     it('should send response to user pointing invalid date.', () => {
//         powerballConnection.getResult = jest.fn().mockReturnValue([{"draw_date":"2019-06-08T00:00:00.000","winning_numbers":"09 13 42 48 60 18","multiplier":"2"}]);
//         ticketValidation.sendMessageToUser = jest.fn().mockReturnValue('Invalid date format (yyyy-mm-dd).');

//         var ticketDate = '2019-06-08';
//         const result = ticketValidation.ticketValidation(req, res);
//         expect(mockResponse).toHaveBeenCalled();
//     });
// })