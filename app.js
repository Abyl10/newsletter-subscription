const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get('/', function (req, res) {
	res.sendFile(__dirname + "/signup.html");
});

app.post ('/',function(req, res){
	const fname = req.body.fname; 
	const lname = req.body.lname;
	const mail = req.body.mail;

	var data = {
		members : [
			{
				email_address: mail, 
				status: "subscribed", 
				merge_fields: {
					FNAME: fname, 
					LNAME: lname
				}
			}
		]
	}

	var jsonData = JSON.stringify(data);

	const url = "https://us6.api.mailchimp.com/3.0/lists/eb046497a9";

	const options = {
		method: "POST",
		auth: "abyl:d248ba55378c751ff611c8c774e3465b-us6"
	}

	const request = https.request(url, options, function(response){
		console.log(response.statusCode);
		if (response.statusCode === 200) {
			res.sendFile(__dirname + "/success.html");
		}
		else {
			res.sendFile(__dirname + "/failure.html");
		}
		/*response.on("data", function(data){
			console.log(JSON.parse(data));
		});*/
	});

	request.write(jsonData);
	request.end();
});


app.post("/failure", function(req, res) {
	res.redirect("/");
})


app.listen(process.env.PORT || port, function(){
	console.log("the server is running on port: " + port);
});

//API KEY
//d248ba55378c751ff611c8c774e3465b-us6

//unique id 
//eb046497a9

