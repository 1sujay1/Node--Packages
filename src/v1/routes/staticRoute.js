const express = require('express');

const router = express.Router();
const path =require('path')
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink)

const multer  = require('multer');
const {uploadFile,getFilyByKey}  = require('./../controllers/awsController');
//Set Storage Engine
const storage = multer.diskStorage({
    destination:'./public/uploads',
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})

//Init Upload
const upload  =multer({
    storage:storage,
    limits:{fileSize:1000000},
    // fileFilter:function(req,file,cb){
    //     checkFileType(file,cb);
    // }
}).single('image');


function checkFileType(file,cb){
    //Allowed Extension
    const fileTypes =/jpeg|jpg|png|gif/
    //Check extension
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    //check mimetype
    const mimeType = fileTypes.test(file.mimetype)

    if(extname && mimeType){
        return cb(null,true)
    }else{
         cb('Error, Images only')
    }
}

router.post('/profile',(req,res)=>{
    upload(req,res,async(err)=>{
        console.log(req.file);
     
        if(err){
            res.render('index',{
                msg:err
            })
        }else{
            if(req.file==undefined){
                res.render('index',{
                    msg:"Error No file selected"
                }) 
            }else{
                const result =await uploadFile(req.file);
                console.log("result",result);
                await unlinkFile(req.file.path)
                // res.render('index',{
                //     msg:"File uploaded successfully",
                //     file:`/uploads/${req.file.filename}`
                // })
                res.json({
                    status:true,
                    key:`/profile/${result.Key}`
                })
            }
        }
    })
})
router.get('/profile/:key',(req,res)=>{
    const {key }=req.params;
 const readStreamData =   getFilyByKey(key);
 readStreamData.pipe(res)
})

module.exports =router;