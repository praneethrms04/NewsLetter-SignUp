// jsHint esversion: 6
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request');
const http = require('http')


const app = express();
const port = 3050;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post('/', (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    // console.log(fullName, lastName, email);
    const data = {
        members: [
            {
                email_address: email,
                status: subscribed,
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = 'https://us13.api.mailchimp.com/3.0/list/b2bc088d0a';
    const options = {
        method: 'POST',
        auth: "praneeth : af9dc9fec4bb4ddbfe4df08b29926173-us13"
    }


    const request = http.request(url, options, function (response) {
        response.on('data', function (data) {
            console.log(JSON.parse(data));

        })
    })
    request.write(jsonData);
    request.end();

})
// api key: 6ce7df87315991a8d6f66270d6af87e4-us13
// af9dc9fec4bb4ddbfe4df08b29926173-us13
//list id:  b2bc088d0a    b2bc088d0a

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})