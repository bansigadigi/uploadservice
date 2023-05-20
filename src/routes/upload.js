import express from "express"
import multer from "multer"
import dotenv from "dotenv"
import AnalyzeDocumentController from "../controllers/uploadController.js"
dotenv.config()

const router = express.Router()

const inMemoryStorage = multer.memoryStorage()
const uploadStrategy = multer({ storage: inMemoryStorage }).single('file')

const analyzeDocClass = new AnalyzeDocumentController()
router.post('/', uploadStrategy, analyzeDocClass.analyzeDocument)
router.get('/:id', analyzeDocClass.fetchAnalyzedResults)

export{ router as upload };