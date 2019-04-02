var PeepethBadges = artifacts.require("./PeepethBadges.sol");

module.exports = async function(callback) {

    console.log(`Minting badges`);
    try {
        let peepethBadges = await PeepethBadges.deployed();

        console.log(`Badges address: ${peepethBadges.address}`);

        const baseTokenUri = "https://abcoathup.github.io/badges/apiSampleData/badge/";
        const badgeCount = 16;
        var badge = 0;
        var tokenId = 1;
        var tokenUri = "";
        for (var i=0; i < badgeCount; i++) {
            badge = i;
            tokenId = i+1;
            tokenUri = `${baseTokenUri}${i + 1}`; 
            
            console.log(`Mint tokenId: ${tokenId} badge: ${badge} tokenUri: ${tokenUri}`);
            await peepethBadges.mintWithTokenURI('0x13ebd3443fa5575f0eb173e323d8419f7452cfb1', tokenId, badge, tokenUri);
        }          

    } catch (err) {
        console.error(`Error minting badges: ${err.message}`);    
    }
    
    callback();
}