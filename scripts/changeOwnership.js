var PeepethBadges = artifacts.require("./PeepethBadges.sol");

module.exports = async function(callback) {

    let peepethBadgesContract = await PeepethBadges.deployed();
    console.log(`Contract address: ${peepethBadgesContract.address}`);

    await peepethBadgesContract.renounceMinter();
    await peepethBadgesContract.addMinter("0x60e8134A4096b44718ec8D8dA6CC66dB339c2A62");
    await peepethBadgesContract.transferOwnership("0x60e8134A4096b44718ec8D8dA6CC66dB339c2A62")

    console.log("Complete")
    callback();
}