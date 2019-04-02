var PeepethBadges = artifacts.require("./PeepethBadges.sol");

module.exports = function(deployer) {
  deployer.deploy(PeepethBadges);
};