const S3 = require('aws-sdk/clients/s3');
const fs =require('fs');

const bucketName = process.env.AWS_BUCKET_NAME
const region = 'ap-south-1'
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})
//function uploads a file to s3
exports.uploadFile=(file)=>{
    const fileStream  = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket:bucketName,
        Body:fileStream,
        Key:file.filename,
        // ACL: 'public-read'
    }
    // console.log("uploadParams",uploadParams);
    // return new Promise((resolve,reject)=>{
    //     s3.upload(uploadParams,(err,data)=>{
    //         if(err){
    //             console.log("err",err);
    //             reject(err)
    //         }
    //         console.log("data",data);
    //         console.log(`File Uploaded Successfully, ${data.Location}`);
    //         resolve(data.Location)
    //     })
    // })
     
   return s3.upload(uploadParams).promise();
}

//function downloads a file from s3
exports.getFilyByKey = (fileKey)=>{
const downloadParams ={
    Key:fileKey,
    Bucket:bucketName
}
return s3.getObject(downloadParams).createReadStream();
}
//function delete a file from s3
exports.deleteFilyByKey = (fileKey,res)=>{
const deleteParams ={
    Key:fileKey,
    Bucket:bucketName
}
 s3.deleteObject(deleteParams,(err,data)=>{
     if(err)return res.json({status:false,error:err})
     return res.json({status:true,data})
 });

}

