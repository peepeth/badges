var badgeRecipients = require('../badgeRecipients.js')
var generatePeepethBadgeJSON = require('./generatePeepethBadgeJson.js')

var fs = require('fs');

badgeRecipients.forEach(generateJSON)


function generateJSON(item, index) {
    var data = generatePeepethBadgeJSON(item, index + 1);

    fs.writeFile(`./apiSampleData/badge/${index}`, data, function(err, data){
        if (err) console.log(err);
        console.log(`Generated JSON ${index}`);
    });
}