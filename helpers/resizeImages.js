// import sharp from "sharp";
const s3Client = require('../library/awsS3')
const AWS3 = require('@aws-sdk/client-s3')
var randomstring = require("randomstring");

const resizeImage = (file) => {
    new Promise (async() => {
        /* await sharp(`${file.path}`)
                .resize(200,200)
                .jpeg({ mozjpeg: true })
                .toFile(`${file.destination}/thum_${file.name}`)
                .then( data => { 
                  return resolve()
                })
               .catch( err => {
                reject(err) 
                }); */
                const params = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: `${path}${newFilename}`,
                    Body: file.buffer,
                    ContentType: file.mimetype
                  };
          
                  const command = new AWS3.PutObjectCommand(params)
                  await s3Client.send(command)
                  .then(res => {
                    if (res.$metadata.httpStatusCode === 200)  return resolve(newFilename)
                    return reject(res.$metadata)
                  })
                  .catch(err => {
                    reject(err)
                  })
    })
}

export default {
    resizeImage
}