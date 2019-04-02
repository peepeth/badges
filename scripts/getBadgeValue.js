// export module
module.exports = function (badgeName) {
  var value = 0;
  switch (badgeName) {
    case "Peepeth":
      value = 0;
      break;
    case "WellWisher":
      value = 1;       
      break; 
    case "Authenticity":
      value = 2;
      break; 
    case "Upholder":
      value = 3;
      break; 
    case "Creativity":        
      value = 4;
      break; 
    case "Freedom":
      value = 5;
      break; 
    case "Peace":
      value = 6;
      break; 
    case "Transcendence":
      value = 7;
      break; 
    case "Honor":
      value = 8;
      break; 
    case "Sponsor":
      value = 9;
      break; 
    case "MegaSponsor":
      value = 10;
      break; 
    case "Penguin":
      value = 11;       
      break; 
    case "GentooPenguin":        
      value = 12;       
      break; 
    case "KingPenguin":        
      value = 13;       
      break; 
    case "EmperorPenguin":        
      value = 14;       
      break; 
    case "LittlePenguin":        
      value = 15;
      break;
  }

  return value;
}

