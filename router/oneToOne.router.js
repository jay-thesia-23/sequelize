var express=require("express")

const router=express.Router()

var {insertDataPost}=require("../controller/oneToOne.controller")

router.post("/inserto2m",insertDataPost)

module.exports=router