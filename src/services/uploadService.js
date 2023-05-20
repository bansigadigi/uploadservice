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
          const res = await docHelper.analyzeDocWithFormRecognizer(req,fileExtention,fileContent)
          //resultId is required for fetching analyzed result
          const resultId = res?.headers['apim-request-id']
          return resultId
        } catch(err){
            throw err
        }
    }

    async fetchAnalyzedResults(resultId) {
        try{
         const docHelper = new DocumentHelper()
         const res = docHelper.fetchAnalyzedResult(resultId)
         //console.log("result================================",result)
         return res
        } catch(error){
            throw err
        }
    }
}