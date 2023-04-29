const team = require("../models").team;
const player = require("../models").player;

let showPlayerGet = async(req, res) => {
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

let teamAddPost = async(req, res) => {
    let { teamName, shortName, city } = await req.body;

    console.log(teamName, shortName, "lfksfdf");

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

    res.end();
};

module.exports = { showPlayerGet, teamAddPost };