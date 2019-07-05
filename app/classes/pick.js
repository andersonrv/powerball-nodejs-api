class Pick {
    constructor(date, picks, multiplier, matches, powerball, prize) {
        var noPrize = 0;
        var lowestPrize = 4;
        var lowPrize = 7;
        var mediumPrize = 100;
        var highPrize = 50000;
        var highestPrize = 1000000;
        var grandPrize = 10000000;

        this.date = date;

        this.picks = picks;

        if(typeof multiplier !== 'undefined') {
            this.multiplier = multiplier;
        } else {
            this.multiplier = 1;
        }

        if(typeof matches !== 'undefined') {
            this.matches = matches;
        } else {
            this.matches = 0;
        }

        if(typeof powerball !== 'undefined') {
            this.powerball = powerball;
        } else {
            this.powerball = false;
        }

        if(typeof prize !== 'undefined') {
            this.prize = prize;
        } else {
            this.prize = 0;
        }
    
        if(this.powerball === true) {
            switch (this.matches) {
                case 0:
                    this.prize = lowestPrize;
                    break;
                case 1:
                    this.prize = lowestPrize;
                    break;
                case 2:
                    this.prize = lowPrize;
                    break;
                case 3:
                    this.prize = mediumPrize;
                    break;
                case 4:
                    this.prize = highPrize;
                    break;
                case 5:
                    this.prize = grandPrize;
                    break;
                default:
                    break;
            }
        } else if (this.powerball === false) {
            switch (this.matches) {
                case 3:
                    this.prize = lowPrize;
                    break;
                case 4:
                    this.prize = mediumPrize;
                    break;
                case 5:
                    this.prize = highestPrize;
                    break;
                default:
                    this.prize = noPrize;
                    break;
            }
        }
    }
}

module.exports = {
    Pick
}