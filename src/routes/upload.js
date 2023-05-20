import express from "express"
import multer from "multer"
import { BlockBlobClient } from "@azure/storage-blob"
import intoStream from "into-stream"
import dotenv from "dotenv"
dotenv.config()

const router = express.Router()

const inMemoryStorage = multer.memoryStorage()
const uploadStrategy = multer({ storage: inMemoryStorage }).single('file')


router.post('/', uploadStrategy, async(req, res) => {
try{
const blobName = req.file.originalname
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME
const blobService = new BlockBlobClient(process.env.AZURE_STORAGE_CONNECTION_STRING,containerName,blobName)
const stream = intoStream(req.file.buffer)
const streamLength = req.file.buffer.length
await blobService.uploadStream(stream, streamLength)
res.status(200).json({
    status:"success",
    message: "file upload succesful",
    err:""
})
} catch(err){
    console.log("err=====================",err)
    res.status(500).json({
        status: "failure",
        message: "file Upload failed",
        err: err
    })
}
});

export{ router as upload };