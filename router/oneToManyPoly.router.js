var express=require("express")

const router=express.Router()
var {polyInsert, polyDeleteComment,polyDelete,polyInsertComment}=require("../controller/oneToManyPoly.controller")

router.post("/polyinsert/:type",polyInsert)
router.delete("/polydelete/:type/:id",polyDeleteComment)
router.post("/polyinsert/:type/:contentid",polyInsertComment)
router.delete("/polydeleteimage/:id",polyDelete)

module.exports=router