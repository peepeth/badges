pragma solidity ^0.5.2;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "openzeppelin-solidity/contracts/access/roles/MinterRole.sol";

contract PeepethBadges is ERC721Full, MinterRole {
  
  enum Badges {
    Peepeth,        // 0
    WellWisher,     // 1
    Authenticity,   // 2
    Upholder,       // 3
    Creativity,     // 4
    Freedom,        // 5
    Peace,          // 6
    Transcendence,  // 7
    Honor,          // 8
    Sponsor,        // 9
    MegaSponsor,    // 10
    Penguin,        // 11
    GentooPenguin,  // 12
    KingPenguin,    // 13
    EmperorPenguin, // 14
    LittlePenguin   // 15
  }

  // Mapping from token ID to badge
  mapping (uint256 => Badges) private _tokenBadges;
 
  constructor() ERC721Full("Peepeth Badges", "PB") public {
  }

  /**
   * @dev Function to mint tokens
   * @param to The address that will receive the minted tokens.
   * @param tokenId The token id to mint.
   * @param badge The token badge of the minted token.
   * @param tokenURI The token URI of the minted token.
   * @return A boolean that indicates if the operation was successful.
   */
  function mintWithTokenURI(address to, uint256 tokenId, Badges badge, string memory tokenURI) public onlyMinter returns (bool) {
    _mint(to, tokenId);
    _setTokenURI(tokenId, tokenURI);
    _setTokenBadge(tokenId, badge);
    return true;
  }

  /**
   * @dev Gets the token badge
   * @param tokenId uint256 ID of the token to get its badge
   * @return uint representing badge
   */
  function tokenBadge(uint256 tokenId) public view returns (Badges) {
    return _tokenBadges[tokenId];
  }

  /**
   * @dev Internal function to set the token badge for a given token
   * Reverts if the token ID does not exist
   * @param tokenId uint256 ID of the token to set its badge
   * @param badge badge to assign
   */
  function _setTokenBadge(uint256 tokenId, Badges badge) internal {
    require(_exists(tokenId));
    _tokenBadges[tokenId] = badge;
  }
}