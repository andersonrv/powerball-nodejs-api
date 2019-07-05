// Show results on GET '/results'

var request = require('request');

function getResult(aDate) {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://data.ny.gov/resource/d6yy-54nr.json',
            qs: { "draw_date" : aDate },
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode === 200 && body.length !== 0) {
                resolve(body);
            } else if (!error && response.statusCode === 200 && body.length === 0) {
                resolve(body);
            }
            else {
                console.log('error: ', error);
                console.log('statusCode: ', response && response.statusCode);
                console.log('body: ', body);
                resolve(error);
            }
        })
    })
}

function isBodyEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports = {
    getResult
}