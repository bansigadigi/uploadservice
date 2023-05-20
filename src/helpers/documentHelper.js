import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

const endpoint = process.env.ENDPOINT
const modelId = process.env.MODELID

export default class DocumentHelper {
    constructor() {

    }

    async analyzeDocWithFormRecognizer(req, fileExt, fileContent) {
        const analyzeUrl = `https://${endpoint}/formrecognizer/documentModels/${modelId}:analyze?2023-02-28-preview&stringIndexType=utf16CodeUnit`
        const url = 'https://shanmukhadocrecognizer.cognitiveservices.azure.com/formrecognizer/documentModels/prebuilt-document:analyze?api-version=2023-02-28-preview&stringIndexType=utf16CodeUnit'
        try {
            /*console.log('data=======================',{
                method: "post",
                url: url,
                data: fileContent,
                headers: {
                    "Content-Type": 'application/octet-stream',
                    "Ocp-Apim-Subscription-Key": process.env.APIM_KEY
                }
            })*/
            const response = await axios({
                method: "post",
                url: url,
                data: fileContent,
                headers: {
                    "Content-Type": fileExt,
                    "Ocp-Apim-Subscription-Key": process.env.APIM_KEY
                }
            });
            return response
        } catch (err) {
            console.log('err================================', err)
            throw err
        }
    }

    async fetchAnalyzedResult(resultId) {
        try {
            //const url = `https://${endpoint}/formrecognizer/documentModels/${modelId}/analyzeResults/${resultId}?api-version=2023-02-28-preview`
            const url = `https://shanmukhadocrecognizer.cognitiveservices.azure.com/formrecognizer/documentModels/prebuilt-document/analyzeResults/${resultId}?api-version=2023-02-28-preview`
            const response = await axios({
                method: "get",
                url: url,
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.APIM_KEY
                }
            })
            return response
        } catch (err) {
            throw err
        }
    }

}
