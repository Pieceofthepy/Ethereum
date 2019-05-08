var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Waitlist = artifacts.require("./waitlist.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Waitlist);
};
