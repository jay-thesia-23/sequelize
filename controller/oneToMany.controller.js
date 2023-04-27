const team = require("../models/team");
const player = require("../models/player");

//show player
app.get("/showplayer", async (req, res) => {
  try {
    let teamPlayer = await team.findAll({
      include: [{ model: player }],
    });

    return res.status(200).json({
      success: true,
      message: "Data Fetched Successfully!!!",
      data: teamPlayer,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/team", async (req, res) => {
  try {
    console.log("inside team");
    await team.bulkCreate([
      {
        teamName: "Channai Super Kings",
        shortName: "CSK",
        city: "Channai",
      },
      {
        teamName: "Mumbai Indians",
        shortName: "MI",
        city: "Mumbai",
      },
    ]);
  } catch (error) {
    console.log(error, "error");
  }

  try {
    await player.bulkCreate([
      {
        firstName: "MS",
        lastName: "Dhoni",
        teamId: 1,
      },
      {
        firstName: "Raviandra",
        lastName: "Jadeja",
        teamId: 1,
      },
      {
        firstName: "Rohit",
        lastName: "Sharma",
        teamId: 2,
      },
    ]);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "fail",
      message: error + "Error in onetomany",
    });
  }

  res.end();
});
