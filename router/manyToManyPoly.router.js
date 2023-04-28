var express=require("express")

const router=express.Router()
const { polyAddTagPost }=require("../controller/manyToManyPoly.controller")

router.post("/mtmpolyinsert/:type",polyAddTagPost)



module.exports=router