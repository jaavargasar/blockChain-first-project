const Certifier = artifacts.require("./Certifier.sol")

module.exports = function(deployer) {
  deployer.deploy(Certifier)
  // Use deployer to state migration tasks.
};
