const removePunctuation = require('remove-punctuation');
const SubTheme = require('../../src/mainTheme/subTheme/subTheme.js');

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
            comment = removePunctuation(jsonData[i].Comments);
            arr = comment.split(" ");
            for (var j = 0; j < arr.length; j++) {
                catArr = map.get(arr[j]);
                if (catArr) {
                    for (var m = 0; m < catArr.length; m++) {
                        themeObj = themesMap.get(catArr[m]);
                        if (themeObj) {
                            themeObj.hitCount++;
                            themeObj.comments.add(jsonData[i].Comments)
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