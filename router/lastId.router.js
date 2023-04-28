var express = require("express")
const { lastIdGet } = require("../controller/lastId.controller")

var router = express.Router()



router.get("/lastId", lastIdGet)


module.exports = router