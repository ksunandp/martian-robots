/* Class Robot:
 * Deals with all robots movements respective of the grid it is supplied
*/
class Robot {
  constructor(startCoords = [0, 0], orientation = "N", instructions = "") {
    this.compass = ["N", "E", "S", "W"];
    this.directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    this.coords = startCoords;
    this.orientation = this.compass.indexOf(orientation);
    this.instructions = instructions.split("");
    this.lost = false;

    this.workArea = [[0, 0], [0, 0]];
    this.warnings = [];
    this.errors = [];
  }

  // Beings robots movements after setting its parameters
  land(grid = this.workArea, scents = this.warnings) {
    this.workArea = grid;
    this.warnings = scents;
    this.followInstructions();
  }

  // Checks no lost robots have left a scent
  noWarnings() {
    const positionString = `${this.coords[0]}${this.coords[1]}${
      this.compass[this.orientation]
    }`;
    return this.warnings.indexOf(positionString) === -1;
  }

  // Checks if robot will be lost upon taking the new instruction
  willBeLost([moveX, moveY]) {
    const [newX, newY] = [this.coords[0] + moveX, this.coords[1] + moveY];
    const [minX, minY] = this.workArea[0];
    const [maxX, maxY] = this.workArea[1];
    return newX < minX || newX > maxX || newY < minY || newY > maxY;
  }

  // Turns robot right (clockwise)
  turnRight() {
    this.orientation = this.orientation === 3 ? 0 : this.orientation + 1;
  }

  // Turns robot left (anti-clockwise)
  turnLeft() {
    this.orientation = this.orientation === 0 ? 3 : this.orientation - 1;
  }

  // Move robot forward one step
  moveForward() {
    const [moveX, moveY] = this.directions[this.orientation];
    if (this.willBeLost([moveX, moveY])) {
      this.lost = true;
    } else {
      this.coords = [this.coords[0] + moveX, this.coords[1] + moveY];
    }
  }

  // Follows instruction given to robot until finsihed or lost
  followInstructions() {
    if (this.instructions === "") {
      console.warn("Robot was not given any instructions");
    } else {
      this.instructions.some((instruction, i) => {
        if (this.lost) return true;
        switch (instruction) {
          case "R":
            this.turnRight();
            break;
          case "L":
            this.turnLeft();
            break;
          case "F":
            if (this.noWarnings()) {
              this.moveForward();
            }
            break;
          default:
            console.warn(
              `At position ${i}, unrecognised instruction ${instruction} submitted`
            );
            break;
        }
      });
    }
  }

  // Returns boolean true if robot is lost
  isLost() {
    return this.lost;
  }

  // Returns the scent identifier if robot is lost
  getScent() {
    return this.lost
      ? `${this.coords[0]}${this.coords[1]}${this.compass[this.orientation]}`
      : "";
  }

  // Returns string as expected for final results of robots location
  getCoords() {
    return `${this.coords[0]} ${this.coords[1]} ${
      this.compass[this.orientation]
    }${this.lost ? " LOST" : ""}`;
  }
}

module.exports = Robot;
