const { BN, constants, expectEvent, shouldFail } = require('openzeppelin-test-helpers');
const PeepethBadges = artifacts.require('PeepethBadges')

contract('PeepethBadges', function([minter, anotherAccount]) {
  let horses
  const name = "Peepeth Badges";
  const symbol = "PB";
  const baseTokenUri = "https://abcoathup.github.io/badges/api/badge/";
  const badgeCount = 16

  beforeEach(async function() {
    peepethBadges = await PeepethBadges.new({ from: minter })
  });

  describe('token details', function() {
    it('has details', async function() {
      const _name = await peepethBadges.name();
      assert.equal(name, _name);
      const _symbol = await peepethBadges.symbol();
      assert.equal(symbol, _symbol);
      const _totalSupply = await peepethBadges.totalSupply();
      assert.equal(0, _totalSupply);
    })
  });

  describe('token minting', function() {
    it('mint a token', async function() {
      await peepethBadges.mintWithTokenURI(anotherAccount, 1, 0, `${baseTokenUri}1`);
      const _totalSupply = await peepethBadges.totalSupply();
      assert.equal(1, _totalSupply);
      const minterBalance = await peepethBadges.balanceOf(minter);
      assert.equal(0, minterBalance);
      anotherAccountBalance = await peepethBadges.balanceOf(anotherAccount);
      assert.equal(1, anotherAccountBalance);
      const _owner = await peepethBadges.ownerOf(1);
      assert.equal(anotherAccount, _owner);
      const _tokenUri = await peepethBadges.tokenURI(1);
      assert.equal(`${baseTokenUri}1`, _tokenUri);
      const _tokenbadge = await peepethBadges.tokenBadge(1);
      assert.equal(0, _tokenbadge);
    });

    it('mint multiple tokens', async function() {
      for (var i=0; i < badgeCount; i++) {
        await peepethBadges.mintWithTokenURI(anotherAccount, i + 1, i, `${baseTokenUri}${i + 1}`);
      }
      
      const _totalSupply = await peepethBadges.totalSupply();
      assert.equal(badgeCount, _totalSupply);
      const minterBalance = await peepethBadges.balanceOf(minter);
      assert.equal(0, minterBalance);
      anotherAccountBalance = await peepethBadges.balanceOf(anotherAccount);
      assert.equal(badgeCount, anotherAccountBalance);

      var _owner;
      var _tokenUri;
      var _tokenbadge
      for (var i=0; i < badgeCount; i++) {
        _owner = await peepethBadges.ownerOf(badgeCount);
        assert.equal(anotherAccount, _owner);
        _tokenUri = await peepethBadges.tokenURI(i + 1);
        assert.equal(`${baseTokenUri}${i + 1}`, _tokenUri);
        _tokenbadge = await peepethBadges.tokenBadge(i + 1);
        assert.equal(i, _tokenbadge);
      }
    });
    
    it('non-minter cannot mint a token', async function() {
      await shouldFail.reverting(peepethBadges.mintWithTokenURI(anotherAccount, 1, 0, `${baseTokenUri}1`, { from: anotherAccount }));
    })
  });
})