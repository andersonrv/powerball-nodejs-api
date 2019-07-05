In order to user the API, the user should send a post to '/results'. The user must include a Javascript object encoded as JSON in the body of the POST request following the example below:

    {
    	"date": "2019-06-08",
    	"picks": ["08 13 42 48 60 18", "09 13 34 41 60 18"]
    }

If the object is successfully validated, the user should receive a response 200 though http protocol with details of the prize.
The same information will be displayed in the console on the server side of the API.
Code was tested using Postman. Jest was used to unit tests and integration tests.
Any question may be submitted to anderson.resende@gmail.com.