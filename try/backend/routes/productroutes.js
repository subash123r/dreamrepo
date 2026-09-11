const express = require ("express")
const {createproduct,getproduct,fineoneed,deleteone,getProductById}=require("../controller/productcontroller.js")

const router = express.Router()

router.get("/", getproduct)
router.post("/", createproduct)
router.put("/:id", fineoneed)
router.delete("/:id",deleteone)
router.get("/:id",getProductById)

module.exports= router