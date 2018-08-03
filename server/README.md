[Kirandeep:] Sample server app to echo .xlsx file in json.

Prerequisite:
-Node.js should be installed.

clone repository and follow below steps:
1) Open terminal and go to folder name 'server' and execute command  'npm install'
2) Execute command 'node app.js'
3) Login to localhost:3000/form
4) upload xlsx file and press upload.



API : /getCommits

clone repository and follow below steps:
1) Open terminal and go to folder name 'server' and execute command  'npm install'
2) Execute command 'node app.js'
3) paste API url in browser and press enter.

detail:
Return List Commits from given Repository.
URL: http://localhost:3000/getCommits?repoName=${repo name}&autherName=${repo auther name}
Method: GET
it accept two parameters:
repoName=Demo1-SIT764 //Name of repository.
autherName=rana-kirandeep1 //auther of repository