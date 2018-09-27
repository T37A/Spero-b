const response = require('../mainTheme/mainTheme.js');

module.exports = {

    generateResponse: (themesMap) => {

        response.forEach((mainTheme) => {

            mainTheme.subThemes.forEach((subTheme) => {

                subTheme['data'] = themesMap.get(subTheme.name) ?
                    themesMap.get(subTheme.name).unMarshal() : {};
            })

        })

        return response;

    }
}