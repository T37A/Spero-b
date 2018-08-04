const XLSX = require('xlsx');
const express = require('express')
var multer = require('multer')
var fs = require('fs');
var Client = require('node-rest-client').Client;



const app = express()

//var bodyParser = require('body-parser');
//app.use(bodyParser.json());

var upload = multer({ //multer settings
    dest: 'uploads/'
})


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


/*

Method upload xlsx file and return converted json object with file data

*/
app.post('/upload', upload.single('file'), function(req, res) {



    const workbook = XLSX.readFile(req.file.path);
    const sheet_name_list = workbook.SheetNames;

    jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);


    try {
        fs.unlinkSync(req.file.path);
    } catch (e) {
        //error deleting the file
    }


    res.send(jsonData);

}) //end upload




app.get('/form', (req, res) => {
    res.sendFile(__dirname + "/static/index.html");
})

/*
default method returning hello world
*/
app.get('/', (req, res) => {

 res.send('hello world');


}) //end get

/*
API get list of commits from GIThub Repository.

*/
app.get('/getCommits', (req, res) => {

    let autherName = req.query.autherName;
    let repoName = req.query.repoName;
    console.log(autherName + ":" + repoName);

    var client = new Client();

    let url = `https://api.github.com/repos/${autherName}/${repoName}/commits`;

    var args = {
        headers: {
            "Content-Type": "application/json",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36"
        }
    };

    client.get(url, args, function(data, response) {
        res.send(data)
    });


}) //end getCommits


app.listen(3000, () => console.log('Example app listening on port 3000!'))