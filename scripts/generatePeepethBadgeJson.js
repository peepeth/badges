// export module
module.exports = function (badge, number) {
    return `
  {
    "attributes": [
      {
        "trait_type": "Badge", 
        "value": "Authenticity"
      },
      {
        "trait_type": "Era", 
        "value": "CrowdFunding 2018"
      }
    ], 
    "description": "Authenticity badge.\n📜 Legacy message (your name, link, and message on blockchain)\n🔖 Bookmark peeps\n🔗 Including a link doesn't count towards the 280-char limit", 
    "external_url": "https://peepeth.com/a/crowdfunding", 
    "image": "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/mozilla/36/gem-stone_1f48e.png", 
    "name": "Authenticity badge"
  }`
}