const Mars = require("./Mars");
const Robot = require("./Robot");

describe("Robot", () => {
  test("robot turns right", () => {
    const RobotIns = new Robot();
    RobotIns.turnRight();
    expect(RobotIns.orientation).toEqual(1);
  });
  test("robot turns right", () => {
    const RobotIns = new Robot();
    RobotIns.turnLeft();
    expect(RobotIns.orientation).toEqual(3);
  });
  test("robot goes forward if available", () => {
    const RobotIns = new Robot();
    const MarsIns = new Mars([10, 10]);
    MarsIns.placeRobotOnMars(RobotIns);
    RobotIns.moveForward();
    expect(RobotIns.coords).toEqual([0, 1]);
  });
  test("robot gets lost", () => {
    const RobotIns = new Robot();
    RobotIns.moveForward();
    expect(RobotIns.isLost()).toBeTruthy();
  });
  test("robot ignores forward if scent present", () => {
    const RobotIns = new Robot([2, 5], "N", "F");
    const MarsIns = new Mars([5, 5]);
    MarsIns.lostRobotScents.push("25N");
    MarsIns.placeRobotOnMars(RobotIns);
    expect(RobotIns.coords).toEqual([2, 5]);
  });
  test("supplies final coords in correct format if not lost", () => {
    const RobotIns = new Robot();
    const coords = RobotIns.getCoords();
    expect(coords).toMatch(/^[0-9]{1,2}\s[0-9]{1,2}\s[NESW]{1}$/g);
  });
  test("supplies final coords in correct format if lost", () => {
    const RobotIns = new Robot();
    RobotIns.moveForward();
    const coords = RobotIns.getCoords();
    expect(coords).toMatch(/^[0-9]{1,2}\s[0-9]{1,2}\s[NESW]{1}\sLOST$/g);
  });
});
