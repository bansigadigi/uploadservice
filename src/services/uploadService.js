import DocumentHelper from "../helpers/documentHelper.js"
import path from 'path'

export default class AnalyzeDocumentService{
    constructor(){

    }

    async AnalyzeDocument(req) {
        try{
          const docHelper = new DocumentHelper()
          const fileExtention = req.file.mimetype
          const fileContent = req.file.buffer
          const res = await docHelper.analyzeDocWithFormRecognizer(fileExtention,fileContent)
          //resultId is required for fetching analyzed result
          const resultId = res?.headers['apim-request-id']
          const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
          await delay(2000) /// waiting 2 second.
          const result = await docHelper.fetchAnalyzedResult(resultId)
          return result
        } catch(err){
            throw err
        }
    }
}