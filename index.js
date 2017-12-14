const fs = require("fs");
const Mars = require("./modules/Mars.js");
const Robot = require("./modules/Robot.js");

const file = process.argv.length < 3 ? "input.txt" : process.argv[2];
let input = "";

/* Checks if first line is formatted correctly:
 * Two numbers separted by whitespace     
 * Note: allowing for additional whitespace between and after but not before
 * Returns array of coords as integers
 */
const getMarsGrid = (line = "") => {
  if (line.match(/^[0-9]{1,2}\s+[0-9]{1,2}\s*$/g) !== null) {
    return line
      .split(/\s+/g)
      .filter(coord => coord !== "")
      .map(coord => parseInt(coord));
  } else {
    throw "The format of grid points is incorrect";
  }
};

/* Checks if the rest of the input is formatted correctly:
 * Line 1: Two numbers and a letter (N,E,S or W)
 * Line 2: A string of letters (F,L or R)
 * Line 3: Whitespace
 * Returns array removing whitespace
 */
const getRobots = (array = []) => {
  if (array.length === 0) {
    throw "No robots defined";
  }

  return array
    .map((line, i) => {
      switch (i % 3) {
        case 0:
          if (
            line.match(/^[0-9]{1,2}\s+[0-9]{1,2}\s+[NESW]{1}\s*$/g) === null
          ) {
            throw `Please check line ${i +
              2}, the format of robot's starting coordinates is incorrect`;
          }
          return line
            .split(/\s+/g)
            .filter(el => el !== "")
            .map((el, i) => (i !== 2 ? parseInt(el) : el));
        case 1:
          if (line.match(/^[FRL]+\s*$/g) === null) {
            throw `Please check line ${i +
                2}, the format of robot's instructions is incorrect`
          }
          return line;
        case 2:
          if (line.match(/^\s*$/g) === null) {
            throw "Please allow for whitespace between robots";
          }
          return "";
        default:
          return line;
      }
    })
    .filter(el => el !== "");
};

try {
  input = fs
    .readFileSync(file)
    .toString()
    .split("\n");

  // Sets up Mars grid
  const marsGrid = getMarsGrid(input[0]);
  const MarsInstance = new Mars(marsGrid);

  // Gets the remaining input
  const robotInput = input.filter((el, i) => i !== 0);
  const robotsSplit = getRobots(robotInput);

  // Runs through input generating robots and placing them on Mars
  for (let i = 0; i < robotsSplit.length; i++) {
    if (i % 2 === 0) {
      const [x, y, orientation] = robotsSplit[i];
      const instructions = robotsSplit[i + 1];
      const RobotInstance = new Robot([x, y], orientation, instructions);
      MarsInstance.placeRobotOnMars(RobotInstance);
    }
  }

  // Retrieves results
  const results = MarsInstance.getRobotsLocation().join('\n')

  // Writes those results to output.txt
  fs.writeFile("output.txt", results, 'utf8', e => {
    if (e) throw e;
    console.log("The file has been saved! Please check output.txt in the root");
  });


} catch (e) {
  if (e.code === "ENOENT") {
    console.error(`Error: Unable to retrieve file ${file}`);
  } else {
    console.error("Error: " + e);
  }
}
