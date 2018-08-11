const XLSX = require('xlsx');
const express = require('express')
var multer = require('multer')
var fs = require('fs');
var bayes = require('bayes')
var Client = require('node-rest-client').Client;
let jsonData = require('./data/student.json');
const removePunctuation =require('remove-punctuation');

const HashMap = require('hashmap');

const map = new HashMap();

const app = express()

app.use(express.static('static'))

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


app.post('/login',(req,res)=>{
    return null;
})


/*
default method returning hello world
*/
app.get('/h', (req, res) => {

var classifier = bayes()

// teach it positive phrases

//classifier.learn('amazing, awesome movie!! Yeah!! Oh boy.', 'positive')



//classifier.learn('Sweet, this is incredibly, amazing, perfect, great!!', 'positive')

// teach it a negative phrase

classifier.learn('terrible, shitty thing. Damn. Sucks!!', 'positive')
classifier.learn('amazing', 'negative')

// now ask it to categorize a document it has never seen before

//let a=classifier.categorize('awesome, cool, amazing!! Yay. it is terrible, shitty thing.')
let a=classifier.categorize('damn')

console.log(a+"hehehe");
var stateJson = classifier.toJson()

//console.log(stateJson);
// => 'positive'
    

 res.send('hello world:'+stateJson);
 //res.send('hello world:'+a);

}) //end get


/*

Method upload xlsx file and return converted json object with file data

*/
app.post('/upload', upload.single('file'), function(req, res) {
    const workbook = XLSX.readFile(req.file.path);
    const sheet_name_list = workbook.SheetNames;
    //TODO[KD] assert: xlsx is always be of correct type
    let jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    var counter=0;
    let comment;
    let arr;
    let catArr;
    let subThemeArr=[];
    let subThemeCount= new HashMap();
    subThemeCount.set('outcomeHeader',0);
    subThemeCount.set('Intellectual',0);
    subThemeCount.set('Further Learning',0);
    subThemeCount.set('Personal',0);
    subThemeCount.set('Interpersonal',0);
    subThemeCount.set('Knowledge & Skills',0);
    subThemeCount.set('career',0);



    themesMap=getThemeMap();

    let themeObj;

    for (var i = 0; i < jsonData.length; i++) {
         comment=removePunctuation(jsonData[i].Comments);
         arr=comment.split(" ");
        for (var j = 0; j < arr.length; j++) {
              catArr=map.get(arr[j]);
            if(catArr){
                for (var m = 0; m < catArr.length; m++) {
                    themeObj=themesMap.get(catArr[m]);
                    if(themeObj){
                        themeObj.hitCount++;
                        themeObj.comments.add(jsonData[i].Comments)
                        themeObj.keyWords.add(arr[j])
                    }else{
                        console.log("no teme in array")
                    }
                }
                //subThemeArr.push([...catArr]);
            }
           counter++;
        }

    } //end for

    //console.log(themesMap);

    //console.log('counter:'+subThemeArr);

    try {
        fs.unlinkSync(req.file.path);
    } catch (e) {
        //error deleting the file
    }

    // res.send(jsonData);
    let outPut={maindomain1:[],maindomain2:[]};

    themesMap.forEach(function(value, key){
       outPut.maindomain1.push({
            name:key,
            hitCount:value.hitCount,
            keyWords:[...value.keyWords],
            comments:[...value.comments]
        }) 
    })
    themesMap.forEach(function(value, key){
       outPut.maindomain2.push({
            name:key,
            hitCount:value.hitCount,
            keyWords:[...value.keyWords],
            comments:[...value.comments]
        }) 
    })
    res.send(JSON.stringify(outPut));

}) //end upload

function getThemeMap(){
    let themeMap= new HashMap();

    themeMap.set('outcomeHeader',{hitCount:0,keyWords:new Set(),comments:new Set()});
    themeMap.set('Intellectual',{hitCount:0,keyWords:new Set(),comments:new Set()});
    themeMap.set('Further Learning',{hitCount:0,keyWords:new Set(),comments:new Set()});
    themeMap.set('Personal',{hitCount:0,keyWords:new Set(),comments:new Set()});
    themeMap.set('Interpersonal',{hitCount:0,keyWords:new Set(),comments:new Set()});
    themeMap.set('Knowledge & Skills',{hitCount:0,keyWords:new Set(),comments:new Set()});
    themeMap.set('career',{hitCount:0,keyWords:new Set(),comments:new Set()});
    
    return themeMap;
}



app.get('/form', (req, res) => {
    console.log("inside form");
    res.sendFile(__dirname + "/static/index.html");
})

app.get('/f', (req, res) => {
    console.log("inside form");
    res.sendFile(__dirname + "/static/index.html");
})




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


app.get('/go',(req,res)=>{

   console.log(map.size);
   res.send(''+map.size);
    
})

app.listen(4000, () => {
    
    for (var i = 0; i < jsonData.length; i++) {
            let temp=map.get(jsonData[i].value);
            if(!temp){
            map.set(jsonData[i].value, [jsonData[i].key]);         
            }else{
                temp.push(jsonData[i].key);
            }
            }
     console.log('Example app listening on port 4000!')



})