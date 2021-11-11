const MinimalERC721 = artifacts.require('MinimalERC721')

contract('ERC721 with royalty', accounts => {
  const [deployerAddress, tokenAddr1] = accounts

  it('should work the minting', async () => {
    let token = await MinimalERC721.deployed()
    await token.mint(tokenAddr1)
  })

  it('should set the royalties', async () => {
    let token = await MinimalERC721.deployed()
    await token.setRoyalties(0, deployerAddress, 1000)
    let royalties = await token.getRaribleV2Royalties(0)
    assert.equal(royalties[0].value, '1000')
    assert.equal(royalties[0].account, deployerAddress)
  })

  it('works with ERC2981 royalties', async () => {
    let token = await MinimalERC721.deployed()
    let royalties = await token.royaltyInfo(0, 500)
    assert.equal(royalties.royaltyAmount.toString(), '50')
    assert.equal(royalties.receiver, deployerAddress)
  })
})
