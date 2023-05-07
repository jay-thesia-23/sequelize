const team = require("../models").team;
const player = require("../models").player;

let showPlayerGet = async (req, res) => {
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
};

//Pass the value in the array for in postman json
let teamAddPost = async (req, res) => {
  let { teamName, shortName, city } = await req.body;
  let type = req.params.type;
  let { firstName, lastName, teamId } = req.body;

  console.log(teamName, shortName, "lfksfdf");

  if (type == "team") {
    try {
      for (let i = 0; i < teamName.length; i++) {
        await team.create({
          teamName: teamName[i],
          shortName: shortName[i],
          city: city[i],
        });
      }
    } catch (error) {
      console.log(error, "error");
      res.json({
        message: "error" + error,
      });
    }
  }

  if (type == "player") {
    try {
      for (let i = 0; i < firstName.length; i++) {
        await player.create({
          firstName: firstName[i],
          lastName: lastName[i],
          teamId: teamId[i],
        });
      }
    } catch (error) {
      console.log(error, "error");
      res.json({
        message: "error" + error,
      });
    }
  }

  res.end();
};

let deleteTeam = async (req, res) => {
  try {
    let  teamId  = req.params.id;
    let answerDelete = await team.destroy({
      where: {
        id: teamId,
      },
    },{
        include:[{model:player}]
    });

    return res.json(answerDelete);
  } catch (error) {
    return res.status(400).json({
      message: error + "Error",
    });
  }
};

module.exports = { showPlayerGet, teamAddPost ,deleteTeam};
