/* Class Mars:
 * Sets up the grid on which robots can be placed
*/

class Mars {
  constructor(maxCoords) {
    this.minCoords = [0, 0];
    this.maxCoords = this.validateMaxCoords(maxCoords);
    this.robots = [];
    this.lostRobotScents = [];
  }

  // Validate supplied coordinates
  validateMaxCoords(coords) {
    return coords.map((coord, i) => {
      if (coord > 50) {
        let axis = i === 0 ? "x" : "y";
        console.warn(`Value for ${axis} is too high, maxed at 50`);
        return 50;
      } else {
        return coord;
      }
    });
  }

  // Adds a requested robot to the grid and sends back its parameters to the robot
  placeRobotOnMars(robot) {
    robot.land([this.minCoords, this.maxCoords], this.lostRobotScents);
    if (robot.isLost()) {
      this.lostRobotScents.push(robot.getScent());
    }
    this.robots.push(robot);
  }

  // Returns an array of all the robots currently on the grid and their location
  getRobotsLocation() {
    return this.robots.map(robot => robot.getCoords());
  }
}

module.exports = Mars;
