var PeepethBadges = artifacts.require("./PeepethBadges.sol");
var badgeRecipients = require('../badgeRecipients.json')
var getBadgeValue = require('./getBadgeValue.js')

const baseTokenUri = "https://abcoathup.github.io/badges/apiSampleData/badge/";

module.exports = async function(callback) {

    let peepethBadgesContract = await PeepethBadges.deployed();
    console.log(`Minting badges address: ${peepethBadgesContract.address}`);

    //await badgeRecipients.forEach(mint)
    for (var index = 0; index < badgeRecipients.length; index++) {
        try {
            var badge = badgeRecipients[index];
            var tokenId = index;
            var tokenUri = `${baseTokenUri}${index}`; 
            var badgeValue = getBadgeValue(badge.badge);
            console.log(`Mint address: ${badge.address} tokenId: ${tokenId} badge: ${badgeValue} tokenUri: ${tokenUri}`);
            await peepethBadgesContract.mintWithTokenURI(badge.address, tokenId, badgeValue, tokenUri);
        } catch (err) {
            console.error(`Error minting badges: ${err.message}`);    
        }        
    }

    console.log("Minting complete")
    callback();
}