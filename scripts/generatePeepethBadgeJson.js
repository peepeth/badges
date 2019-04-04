// export module
module.exports = function (badge, number) {
    return `
  {
    "attributes": [
      {
        "trait_type": "Badge", 
        "value": "${badge.badge.displayName}"
      },
      {
        "trait_type": "Era", 
        "value": "CrowdFunding 2018"
      }
    ], 
    "description": "${badge.badge.displayName} badge.", 
    "external_url": "https://peepeth.com/a/crowdfunding", 
    "image": "${badge.badge.image}", 
    "name": "${badge.badge.displayName} badge"
  }`
}