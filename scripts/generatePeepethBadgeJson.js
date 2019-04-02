var getBadgeImage = require('./getBadgeImage.js')

// export module
module.exports = function (badge, number) {
    return `
  {
    "attributes": [
      {
        "trait_type": "Badge", 
        "value": "${badge.badge}"
      },
      {
        "trait_type": "Era", 
        "value": "CrowdFunding 2018"
      }
    ], 
    "description": "${badge.badge} badge.", 
    "external_url": "https://peepeth.com/a/crowdfunding", 
    "image": "${getBadgeImage(badge.badge)}", 
    "name": "${badge.badge} badge"
  }`
}