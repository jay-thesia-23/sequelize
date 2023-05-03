var express=require("express")

const router=express.Router()

var {insertDataPost,deleteDataPost,updateDataUser}=require("../controller/oneToOne.controller")

router.post("/inserto2o",insertDataPost)
router.delete("/deleteo2o/:userId",deleteDataPost)
router.put("/updateo2o/:userId",updateDataUser)

module.exports=router