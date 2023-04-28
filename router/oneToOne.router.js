var express=require("express")

const router=express.Router()

var {insertDataPost,deleteDataPost,updateDataUser}=require("../controller/oneToOne.controller")

router.post("/inserto2m",insertDataPost)
router.delete("/deleteo2m/:userId",deleteDataPost)
router.put("/updateo2m",updateDataUser)

module.exports=router