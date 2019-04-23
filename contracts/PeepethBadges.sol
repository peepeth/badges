pragma solidity 0.5.7;

import "./Strings.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Enumerable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Metadata.sol";
import "openzeppelin-solidity/contracts/access/roles/MinterRole.sol";
import "openzeppelin-solidity/contracts/introspection/ERC165.sol";

/**
 * @title Peepeth Badges ERC721 Token
 * This implementation includes all the required and some optional functionality of the ERC721 standard
 * Moreover, it includes approve all functionality using operator terminology
 * @dev see https://github.c/ethereum/EIPs/blob/master/EIPS/eip-721.md
 */
contract PeepethBadges is ERC165, ERC721, ERC721Enumerable, IERC721Metadata, MinterRole {

  // Mapping from token ID to badge
  mapping (uint256 => uint256) private _tokenBadges;
  
  // Token name
  string private _name;

  // Token symbol
  string private _symbol;

  bytes4 private constant _INTERFACE_ID_ERC721_METADATA = 0x5b5e139f;
  /*
   * 0x5b5e139f ===
   *     bytes4(keccak256('name()')) ^
   *     bytes4(keccak256('symbol()')) ^
   *     bytes4(keccak256('tokenURI(uint256)'))
   */

  /**
   * @dev Constructor function
   */
  constructor () public {
    _name = "Peepeth Badges";
    _symbol = "PB";

    // register the supported interfaces to conform to ERC721 via ERC165
    _registerInterface(_INTERFACE_ID_ERC721_METADATA);
  }

  /**
   * @dev Gets the token name
   * @return string representing the token name
   */
  function name() external view returns (string memory) {
    return _name;
  }

  /**
   * @dev Gets the token symbol
   * @return string representing the token symbol
   */
  function symbol() external view returns (string memory) {
    return _symbol;
  }

  /**
   * @dev Returns an URI for a given token ID
   * Throws if the token ID does not exist. May return an empty string.
   * @param tokenId uint256 ID of the token to query
   */
  function tokenURI(uint256 tokenId) external view returns (string memory) {
    require(_exists(tokenId));
    return Strings.Concatenate(
      baseTokenURI(),
      Strings.UintToString(tokenId)
    );
  }
    
  /**
   * @dev Gets the base token URI
   * @return string representing the base token URI
   */
  function baseTokenURI() public pure returns (string memory) {
    return "https://peepeth.com/badges/api/badge/";
  }

  /**
   * @dev Function to mint tokens
   * @param to The address that will receive the minted tokens.
   * @param badge The token badge of the minted token.
   * @return A boolean that indicates if the operation was successful.
   */
  function mint(address to, uint256 badge) public onlyMinter returns (bool) {
    uint256 tokenId = _getNextTokenId();
    _mint(to, tokenId);
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

  /**
   * @dev Gets the next Token ID (sequential)
   * @return next Token ID
   */
  function _getNextTokenId() private view returns (uint256) {
    return totalSupply().add(1);
  }
}