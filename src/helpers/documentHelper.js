import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

const endpoint = process.env.ENDPOINT
const modelId = process.env.MODELID

export default class DocumentHelper {
    constructor() {

    }

    async analyzeDocWithFormRecognizer(fileExt, fileContent) {
        const analyzeUrl = `https://${endpoint}/formrecognizer/documentModels/${modelId}:analyze?2023-02-28-preview&stringIndexType=utf16CodeUnit`
        try {
            const response = await axios({
                method: "post",
                url: analyzeUrl,
                data: fileContent,
                headers: {
                    "Content-Type": fileExt,
                    "Ocp-Apim-Subscription-Key": process.env.APIM_KEY
                }
            });
            return response
        } catch (err) {
            throw err
        }
    }

    async fetchAnalyzedResult(resultId) {
      try{
         console.log('result id==========================',resultId)
         const url = `https://${endpoint}/formrecognizer/documentModels/${modelId}/analyzeResults/${resultId}?api-version=2023-02-28-preview`
         const response = await axios({
            method: "get",
            url: url,
            headers: {
                "Ocp-Apim-Subscription-Key": process.env.APIM_KEY
            }
         })
         return response
      } catch(err){
        throw err
      }
    }

}
