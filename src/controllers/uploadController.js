import AnalyzeDocumentService from "../services/uploadService.js"


export default class AnalyzeDocumentController {
    constructor() {

    }

    async analyzeDocument(req, res) {
        try {
            const result = await new AnalyzeDocumentService().AnalyzeDocument(req)
            console.log('result===============', result)
            res.send({
                status: "success",
                message: result,
                error: ""
            })
        } catch (err) {
            res.send({
                status: "failed",
                message: "document analyzation failed",
                error: err
            })
        }
    }

    async fetchAnalyzedResults(req, res) {
        try {
            const resultId = req?.params?.id
            const result = await new AnalyzeDocumentService().fetchAnalyzedResults(resultId)
            res.send({
                status: "success",
                message: result?.data,
                error: ""
            })
        } catch (err) {
            res.send({
                status: "failed",
                message: "fetching results failed",
                error: err
            })
        }
    }
}
