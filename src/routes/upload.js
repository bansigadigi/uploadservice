import express from "express"
import multer from "multer"
import dotenv from "dotenv"
import AnalyzeDocumentController from "../controllers/uploadController.js"
dotenv.config()

const router = express.Router()

const inMemoryStorage = multer.memoryStorage()
const uploadStrategy = multer({ storage: inMemoryStorage }).single('file')


router.post('/', uploadStrategy, new AnalyzeDocumentController().analyzeDocument)

export{ router as upload };