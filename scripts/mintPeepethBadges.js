var PeepethBadges = artifacts.require("./PeepethBadges.sol");
var badgeRecipients = require('../badgeRecipients.js')

module.exports = async function(callback) {

    let peepethBadgesContract = await PeepethBadges.deployed();
    console.log(`Minting badges address: ${peepethBadgesContract.address}`);

    for (var index = 0; index < badgeRecipients.length; index++) {
        try {
            var badge = badgeRecipients[index];
            var badgeValue = badge.badge.value;
            console.log(`Mint address: ${badge.address} badge: ${badgeValue}`);
            await peepethBadgesContract.mint(badge.address, badgeValue);
        } catch (err) {
            console.error(`Error minting badges: ${err.message}`);    
        }        
    }

    console.log("Minting complete")
    callback();
}