var express=require("express")

const router=express.Router()
var {polyInsert, polyDeleteComment,polyDelete,polyInsertComment,polyRecoverPost}=require("../controller/oneToManyPoly.controller")

router.post("/polyinsert/:type",polyInsert)
router.delete("/polydelete/:type/:id",polyDelete)
router.post("/polyinsert/:type/:contentid",polyInsertComment)
router.delete("/polydeleteComment/:type/:id",polyDeleteComment)
router.put("/recover",polyRecoverPost)

module.exports=router