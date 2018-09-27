const RemovePunctuation = require('remove-punctuation');
const SubTheme = require('../../src/mainTheme/subTheme/subTheme.js');
const SentimentEngin=require('./sentimentEngin/sentimentEngin.js');

module.exports = {
    execute: (jsonData,map) => {
        var counter = 0;
        let comment;
        let arr;
        let catArr;

        themesMap = SubTheme.getThemeMap();

        let themeObj;
        //debugger
        
        for (var i = 0; i < jsonData.length; i++) {
            comment = RemovePunctuation(jsonData[i].Comments);
            let sentiment =SentimentEngin.getSetiment(jsonData[i].Comments);
            arr = comment.split(" ");
            //debugger
            
            for (var j = 0; j < arr.length; j++) {
                catArr = map.get(arr[j]);
                if (catArr) {
                    for (var m = 0; m < catArr.length; m++) {
                        themeObj = themesMap.get(catArr[m]);
                        if (themeObj) {
                            themeObj.hitCount++;
                            if(!themeObj.tempcommentSet.has(jsonData[i].Comments)){
                                themeObj.tempcommentSet.add(jsonData[i].Comments)
                                themeObj.comments.add({"comment":jsonData[i].Comments, "sentiment":sentiment})
                            }
                            
                            
                            themeObj.keyWords.add(arr[j])
                            //posivite and negative here only
                        } else {
                            //console.log("No theme in array")
                        }
                    }
                    //subThemeArr.push([...catArr]);
                }
                counter++;
            }

        } //end for

        return themesMap;

    }
}