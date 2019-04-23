var Strings = artifacts.require("./Strings.sol");
var PeepethBadges = artifacts.require("./PeepethBadges.sol");

module.exports = function(deployer) {
  deployer.deploy(Strings);
  deployer.link(Strings, PeepethBadges);
  deployer.deploy(PeepethBadges);
};