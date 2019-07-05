const express = require('express')
const { root } = require('../controllers/root')
const { getResults } = require('../controllers/results')
const { ticketValidation } = require('../validation/ticket-validation')
const { notFound } = require('../controllers/notfound')

const router = express.Router()

// Routes
router.get('/', root)

router.post('/results', ticketValidation)

// Requests should be sent using post and it must send on
// its body a JSON object with the following structure:
//      {
// 	        "date": "2019-06-05",
// 	        "picks": ["01 16 24 31 55 19", "09 13 34 48 69 22", "02 16 23 44 52 11"]
//      }

// Fall Through Route
router.use(notFound)

module.exports = router