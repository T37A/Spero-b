const HashMap = require('hashmap');
const SubThemeResponse = require('../../response/SubThemeResponse.js');



const themesName = ["career", "Knowledge & Skills",
    "Interpersonal", "Personal", "Further Learning", "outcomeHeader", "Intellectual",
    "Accessibility and responsiveness", "Teaching skills", "Practical experience (current)",
    "Quality and attitude", "Practical-theory links", "Relevance (to work/life/discipline)",
    "Flexibility/ responsiveness", "Methods of learning and teaching",
    "Structure and expectations", "Relevance", "Marking", "Expectations",
    "Feedback/ return", "Standards", "Library", "Leanring resources",
    "Infrastructure/ environment", "Student administration", "Student services",
    "Social affinity/ support"
]


module.exports = {

    getThemeMap: () => {

        let themeMap = themesName.reduce((themeMap, element) => {
            return themeMap.set(element, new SubThemeResponse())
        }, new HashMap())
        return themeMap;
    }

}