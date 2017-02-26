module.exports = function (type) {
  switch(type) {
    case "BB": return "Battleship";
    case "CV": return "Aircraft Carrier";
    case "CVS": return "Antisubmarine Aircraft Carrier";
    case "SS": return "Submarine";
    case "SC": return "Subchaser";
    case "TB": return "Torpedo Boat";
    case "GB": return "Gunboat";
    case "ES": return "Escort";
    case "DE": return "Destroyer Escort";
    case "CVE": return "Escort Carrier";
    case "CA": return "Cruiser";
    case "CL": return "Light Cruiser";
    case "DD": return "Destroyer";
    case "FF": return "Frigate";
    case "ML": return "Minelayer";
    case "MS": return "Minesweeper";
    case "AS": return "Repair Ship";
    default:
      console.log("Warning: Unknown Type", type);
      return type;
  }
}
