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
         const res = await docHelper.fetchAnalyzedResult(resultId)
         //extract aadhar number
         if(res?.data?.status === "succeeded" && res?.data?.analyzeResult?.paragraphs?.length>0){
            const {paragraphs} = res?.data?.analyzeResult
            const result = paragraphs.filter((para)=>{
                const regex = "^[0-9]{4}\\s[0-9]{4}\\s[0-9]{4}$"
                console.log("para.content======================",para.content,para.content.match(regex))
                return para.content.match(regex)
            })
            return result && result.length>0 ? result[0].content : "no addhar number extracted"
         } else {
            throw new Error('failure in transforming response')
         }
        } catch(error){
            throw error
        }
    }
}