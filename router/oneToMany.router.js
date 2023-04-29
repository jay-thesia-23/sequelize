var express = require("express")

const router = express.Router()
var { showPlayerGet, teamAddPost } = require("../controller/oneToMany.controller")

router.get("/showplayer", showPlayerGet)
router.post("/teamadd", teamAddPost)


module.exports = router