var express=require("express")

const router=express.Router()

<<<<<<< HEAD
var {insertDataPost, deleteData, showDataGet, updateData}=require("../controller/oneToOne.controller")

router.post("/inserto2o",insertDataPost)
router.delete("/deleteo2o/:id",deleteData)
router.get("/datao2o",showDataGet)
router.put("/updateo2o/:id",updateData)
=======
var {insertDataPost,deleteDataPost,updateDataUser}=require("../controller/oneToOne.controller")

router.post("/inserto2o",insertDataPost)
router.delete("/deleteo2o/:userId",deleteDataPost)
router.put("/updateo2o/:userId",updateDataUser)
>>>>>>> 48264e7decfb39ecf8c74621cd3778a38394b5f6

module.exports=router