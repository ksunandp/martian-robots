const fs = require("fs");

const solveProblem = data => {
  let minCoords = [0, 0];
  let maxCoords = data[0].split(/\s+/).map(coord => parseInt(coord) < 50 ? coord : 50);
  let cleanData = data.filter((line, i) => i !== 0 && line !== "");
  let lostRobots = [];
  let finishedRobots = [];

  // checks no robots got lost proceeding
  const noLostRobots = coords => {
    return lostRobots.indexOf(coords.join()) === -1;
  };

  // checks robot stays within grid
  // if not returns previous coords with 'LOST' indicator
  const validateCoords = (oldCoords, newCoords) => {
    if (
      newCoords[0] > maxCoords[0] ||
      newCoords[0] < 0 ||
      newCoords[1] > maxCoords[1] ||
      newCoords[1] < 0
    ) {
      lostRobots.push(oldCoords.join());
      return [...oldCoords, "LOST"];
    } else {
      return newCoords;
    }
  };

  // moves robot to appropriate grid coord
  // checks if robot is safe
  const moveForward = ([x, y, orientation]) => {
    let newCoords = [];
    let oldCoords = [x, y, orientation];
    switch (orientation) {
      case "N":
        newCoords = [x, y + 1, orientation];
        break;
      case "E":
        newCoords = [x + 1, y, orientation];
        break;
      case "S":
        newCoords = [x, y - 1, orientation];
        break;
      case "W":
        newCoords = [x - 1, y, orientation];
        break;
      default:
        newCoords = [x, y, orientation];
        break;
    }
    return validateCoords(oldCoords, newCoords);
  };

  // turns robot to required orientation
  const turnRobot = ([x, y, orientation], movement) => {
    let compass = ["N", "E", "S", "W"];
    let currentOrientation = compass.indexOf(orientation);
    switch (movement) {
      case "L":
        currentOrientation =
          currentOrientation === 0 ? 3 : currentOrientation - 1;
        break;
      case "R":
        currentOrientation =
          currentOrientation === 3 ? 0 : currentOrientation + 1;
        break;
      default:
        break;
    }
    return [x, y, compass[currentOrientation]];
  };

  // follows instructions set out for robot
  // either moving forward or turning on axis
  const moveRobot = (startCoords, instructions) => {
    let coords = startCoords;
    instructions.forEach(movement => {
      if (coords.length === 3) {
        if (movement === "F") {
          if (noLostRobots(coords)) {
            coords = moveForward(coords);
          }
        } else {
          coords = turnRobot(coords, movement);
        }
      }
    });
    return coords;
  };

  // takes every two lines (starting coords of robot and instructions)
  // then proceeds to move robot
  for (let i = 0; i < cleanData.length; i++) {
    if (i % 2 === 0) {
      let [x, y, orientation] = cleanData[i].split(/\s+/);
      let startCoords = [parseInt(x), parseInt(y), orientation];
      let instructions = cleanData[i + 1].split("");
      let finalCoords = moveRobot(startCoords, instructions);
      finishedRobots.push(finalCoords.join(" "));
    }
  }

  // return string to output to output.txt
  return finishedRobots.join("\n");
};

try {
  // reads input file and splits into lines
  lines = fs
    .readFileSync("input.txt")
    .toString()
    .split("\n");

  // if no errors, proceed
  if (lines.length > 0) {
    let results = solveProblem(lines);
    fs.writeFile("output.txt", results, 'utf8', e => {
      if (e) throw e;
      console.log("The file has been saved!");
    });
  }
} catch (e) {
  console.log("Error: " + e);
}
