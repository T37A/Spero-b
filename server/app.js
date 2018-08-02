const XLSX = require('xlsx');
const express = require('express')
var multer  = require('multer')
var fs = require('fs');
const app = express()

//var bodyParser = require('body-parser');
//app.use(bodyParser.json());

 var upload = multer({ //multer settings
                    dest: 'uploads/'
                })




app.post('/upload', upload.single('file'),function(req, res) {

	

const workbook = XLSX.readFile(req.file.path);
const sheet_name_list = workbook.SheetNames;

jsonData=XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);


try {
    fs.unlinkSync(req.file.path);
} catch(e) {
    //error deleting the file
}


res.send(jsonData);
	
})//end upload




app.get('/form',(req,res)=>{
	res.sendFile(__dirname + "/static/index.html");
})

app.get('/', (req, res) => {

let jsonData;

try {






} catch(e) {
	// statements
	console.log("error:"+e);
}
	

	res.send(jsonData)
	


	})//end get





app.listen(3000, () => console.log('Example app listening on port 3000!'))
