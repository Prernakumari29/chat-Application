const express = require("express");
const upload = require("../config/multer");
const apiError = require("../utils/apiError");
const apiResponse = require("../utils/apiResponse");
const sendToImage = require("../service/storage.service");

const router = express.Router();

router.post("/get-Image" , upload.single("image") , async(req,res) =>{

    let data = req.file

    if(!data){
        throw new apiError(404 , "file not found")
    }

    let uploadImage = await sendToImage(data.buffer , data.originalname)

    return res
    .status(201)
    .json(new apiResponse("image uploaded succesfully" ,  {
        url: uploadImage.url,
        fileId: uploadImage.fileId
      }))

})


module.exports = router;