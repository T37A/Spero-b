module.exports = function SubThemeResponse() {

    this.hitCount = 0;
    this.keyWords = new Set();
    this.comments = new Set();
   this.tempcommentSet=new Set();

    this.unMarshal = ()=> {
        return {
            hitCount: this.hitCount,
            keyWords: [...this.keyWords],
            comments: [...this.comments]
        }

    };

}