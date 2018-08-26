const bayes = require('bayes')

const classifier=bayes();

classifier.learn('terrible, shitty thing. Damn. Sucks!!', 'positive')
classifier.learn('amazing', 'negative')


module.exports={



}