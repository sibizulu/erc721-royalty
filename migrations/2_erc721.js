const NFT721 = artifacts.require('NFT721')

module.exports = function (deployer) {
  deployer.deploy(NFT721)
}
