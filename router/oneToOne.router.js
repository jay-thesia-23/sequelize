var express=require("express")

const router=express.Router()

var {insertDataPost, deleteData, showDataGet, updateData}=require("../controller/oneToOne.controller")

router.post("/inserto2o",insertDataPost)
router.delete("/deleteo2o/:id",deleteData)
router.get("/datao2o",showDataGet)
router.put("/updateo2o/:id",updateData)

module.exports=router