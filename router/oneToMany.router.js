var express = require("express")

const router = express.Router()
var { showplayerGet, teamAddPost } = require("../controller/oneToMany.controller")

router.get("/showplayer", showplayerGet);

router.post("/team", teamAddPost)

module.exports = router