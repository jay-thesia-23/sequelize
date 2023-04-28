var express=require("express")


const router=express.Router()
var {selectDataGet,insertDatePost,deleteDataDelete,updateDataPut,restoreSoftGet,orderGroupGet}=require("../controller/basicCRUD.controller")

router.get("/select",selectDataGet)
// router.post("/addtable",addTablePost)
router.post("/insert", insertDatePost)
router.delete("/delete",deleteDataDelete)
router.put("/update",updateDataPut)
router.post("/nosoft",restoreSoftGet)
router.get("/orderngroup",orderGroupGet);

module.exports=router