const bayes = require('bayes')
const PositiveWords=require('./sentiments/positiveData/positiveData.js');

const NagativeWords=require('./sentiments/negativeData/negativeData.js');

const natural = require('natural');
/*const Analyzer = require('natural').SentimentAnalyzer;
const stemmer = require('natural').PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");
*/

/*const Analyzer1 = require('natural').SentimentAnalyzer;
const stemmer1 = require('natural').PorterStemmer;
const analyzer1 = new Analyzer("English", stemmer1, "senticon");*/


/*const classifier=bayes();

classifier.learn(NagativeWords.getData(), 'anegative') 
classifier.learn(PositiveWords.getData(), 'positive')*/

const nclassifier = new natural.BayesClassifier();
nclassifier.addDocument(PositiveWords.getData(), 'positive');
nclassifier.addDocument(NagativeWords.getData(), 'negative');
nclassifier.train();


// const Sentiment = require('sentiment');
// const sentiment = new Sentiment();



module.exports={

getSetiment:(comment)=>{

	//let a=classifier.categorize(comment);
	
	//let c=analyzer.getSentiment(comment.split(" "));
	//let d=analyzer1.getSentiment(comment.split(" "));

	//var r = sentiment.analyze(comment);
	//debugger
	//console.log("*******");
	//console.log(comment);
	//console.log("bay :"+a+" Natural:"+b+" analyzer:"+c+" analyzer1:"+d+" sentiment:"+r.comparative);
	//console.log("--------------");
	return nclassifier.classify(comment)

},





}