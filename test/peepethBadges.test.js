const { BN, constants, expectEvent, shouldFail } = require('openzeppelin-test-helpers');
const PeepethBadges = artifacts.require('PeepethBadges')

contract('PeepethBadges', function([owner, anotherAccount, thirdAccount]) {
  const name = "Peepeth Badges";
  const symbol = "PB";
  const baseTokenURI = "https://peepeth.com/b/";
  const badgeCount = 8

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
      const _baseTokenURI = await peepethBadges.baseTokenURI();
      assert.equal(baseTokenURI, _baseTokenURI);
    })
  });

  describe('token minting', function() {
    it('mint a token', async function() {
      await peepethBadges.mint(anotherAccount, new BN(0));
      const _totalSupply = await peepethBadges.totalSupply();
      assert.equal(1, _totalSupply);
      const minterBalance = await peepethBadges.balanceOf(owner);
      assert.equal(0, minterBalance);
      anotherAccountBalance = await peepethBadges.balanceOf(anotherAccount);
      assert.equal(1, anotherAccountBalance);
      const _owner = await peepethBadges.ownerOf(new BN(1));
      assert.equal(anotherAccount, _owner);
      const _tokenURI = await peepethBadges.tokenURI(new BN(1));
      assert.equal(`${baseTokenURI}1`, _tokenURI);
      const _tokenbadge = await peepethBadges.tokenBadge(new BN(1));
      _tokenbadge.should.be.bignumber.equal(new BN(0));
    });

    it('mint multiple tokens', async function() {
      for (var i=0; i < badgeCount; i++) {
        await peepethBadges.mint(anotherAccount, new BN(i + 1));
      }
      
      const _totalSupply = await peepethBadges.totalSupply();
      assert.equal(badgeCount, _totalSupply);
      const minterBalance = await peepethBadges.balanceOf(owner);
      assert.equal(0, minterBalance);
      anotherAccountBalance = await peepethBadges.balanceOf(anotherAccount);
      assert.equal(badgeCount, anotherAccountBalance);

      var _owner;
      var _tokenURI;
      var _tokenbadge;
      var _tokenId;
      for (var i=0; i < badgeCount; i++) {
        _tokenId = new BN(i + 1);
        _owner = await peepethBadges.ownerOf(_tokenId);
        assert.equal(anotherAccount, _owner);
        _tokenURI = await peepethBadges.tokenURI(_tokenId);
        assert.equal(`${baseTokenURI}${i + 1}`, _tokenURI);
        _tokenbadge = await peepethBadges.tokenBadge(_tokenId);
        _tokenbadge.should.be.bignumber.equal(new BN(i + 1));
      }
    });

    it('change baseTokenURI', async function() {
      const _baseTokenURI = await peepethBadges.baseTokenURI();
      assert.equal(baseTokenURI, _baseTokenURI);
      const newBaseTokenURI = "https://peepeth.com/b2/";
      peepethBadges.setBaseTokenURI(newBaseTokenURI);
      const _newBaseTokenURI = await peepethBadges.baseTokenURI();
      assert.equal(newBaseTokenURI, _newBaseTokenURI);
    })

    it('add minter', async function() {
      var isMinter = await peepethBadges.isMinter(anotherAccount);
      assert.equal(false, isMinter);
      await peepethBadges.addMinter(anotherAccount);
      isMinter = await peepethBadges.isMinter(anotherAccount);
      assert.equal(true, isMinter);

      await peepethBadges.mint(anotherAccount, new BN(0), { from: anotherAccount });
      const _totalSupply = await peepethBadges.totalSupply();
      assert.equal(1, _totalSupply);      
    })

    it('renounce minter role', async function() {
      await peepethBadges.methods['renounceMinter()']();

      var isMinter = await peepethBadges.isMinter(owner);
      assert.equal(false, isMinter);
    })

    it('owner renounce another accounts minter role', async function() {
      await peepethBadges.addMinter(anotherAccount);
      await peepethBadges.methods['renounceMinter(address)'](anotherAccount);

      var isMinter = await peepethBadges.isMinter(anotherAccount);
      assert.equal(false, isMinter);
    })

    it('non-minter cannot mint a token', async function() {
      await shouldFail.reverting(peepethBadges.mint(anotherAccount, new BN(0), { from: anotherAccount }));
    })
    
    it('non-owner cannot change baseTokenURI', async function() {
      const newBaseTokenURI = "https://peepeth.com/b2/";
      await shouldFail.reverting(peepethBadges.setBaseTokenURI(newBaseTokenURI, { from: anotherAccount }));
      const _baseTokenURI = await peepethBadges.baseTokenURI();
      assert.equal(baseTokenURI, _baseTokenURI);
    })
    
    it('non-owner minter cannot add minter', async function() {
      await peepethBadges.addMinter(anotherAccount);
      await shouldFail.reverting(peepethBadges.addMinter(thirdAccount, { from: anotherAccount }));
      var isMinter = await peepethBadges.isMinter(thirdAccount);
      assert.equal(false, isMinter);
    })

    it('non-owner cannot renounce another account minter role', async function() {
      await peepethBadges.addMinter(anotherAccount);
      await peepethBadges.addMinter(thirdAccount);
      await shouldFail.reverting(peepethBadges.methods['renounceMinter(address)'](anotherAccount, { from: thirdAccount }));

      var isMinter = await peepethBadges.isMinter(thirdAccount);
      assert.equal(true, isMinter);
    })

  });
})