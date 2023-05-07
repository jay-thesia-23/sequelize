var express = require("express")

const router = express.Router()
var { showPlayerGet, teamAddPost,deleteTeam } = require("../controller/oneToMany.controller")

router.get("/showplayer", showPlayerGet)
router.post("/teamadd/:type", teamAddPost)
router.delete("/deleteteam/:id",deleteTeam);


module.exports = router