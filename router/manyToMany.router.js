var express=require("express");
const { Model } = require("sequelize");
const router=express.Router()
const {mtmInsertPost,mtmDelete,mtmShowGet}=require("../controller/ManyToMany.controller")


router.post("/insertm2m", mtmInsertPost);
router.delete("/deletem2m/:type/:id",mtmDelete)
router.get("/mtmshow/:type",mtmShowGet)

module.exports=router