pragma solidity 0.5.2;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "openzeppelin-solidity/contracts/access/roles/MinterRole.sol";

contract PeepethBadges is ERC721Full, MinterRole {
  
  // Mapping from token ID to badge
  mapping (uint256 => uint256) private _tokenBadges;
 
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
  function mintWithTokenURI(address to, uint256 tokenId, uint256 badge, string memory tokenURI) public onlyMinter returns (bool) {
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
  function tokenBadge(uint256 tokenId) public view returns (uint256) {
    return _tokenBadges[tokenId];
  }

  /**
   * @dev Internal function to set the token badge for a given token
   * Reverts if the token ID does not exist
   * @param tokenId uint256 ID of the token to set its badge
   * @param badge badge to assign
   */
  function _setTokenBadge(uint256 tokenId, uint256 badge) internal {
    require(_exists(tokenId));
    _tokenBadges[tokenId] = badge;
  }
}