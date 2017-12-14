const Mars = require("./Mars");
const Robot = require("./Robot");

describe("Mars", () => {
  test("mars x coord maxs at 50", () => {
    const MarsIns = new Mars([100, 0]);
    expect(MarsIns.maxCoords[0]).toEqual(50);
  });
  test("mars y coord maxs at 50", () => {
    const MarsIns = new Mars([0, 100]);
    expect(MarsIns.maxCoords[1]).toEqual(50);
  });
  test("robots are stored", () => {
    const MarsIns = new Mars([10, 10]);
    const RobotIns = new Robot([5, 5], "N", "F");
    MarsIns.placeRobotOnMars(RobotIns);
    expect(MarsIns.robots).toHaveLength(1);
  });
  test("scents are stored of lost robots", () => {
    const MarsIns = new Mars([10, 10]);
    const RobotIns = new Robot([10, 10], "N", "F");
    MarsIns.placeRobotOnMars(RobotIns);
    const lostRobots = MarsIns.lostRobotScents;
    expect(lostRobots).toHaveLength(1);
    expect(lostRobots[0]).toMatch("1010N");
  });
  test("robot's final destination supplied", () => {
    const MarsIns = new Mars([10, 10]);
    const RobotIns = new Robot([5, 5], "N", "F");
    MarsIns.placeRobotOnMars(RobotIns);
    const robotsLocation = MarsIns.getRobotsLocation();
    expect(robotsLocation).toHaveLength(1);
    expect(robotsLocation[0]).toMatch("5 6 N");
  });
});
