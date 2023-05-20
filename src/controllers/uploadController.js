import AnalyzeDocumentService from "../services/uploadService.js"


export default class AnalyzeDocumentController {
    constructor() {

    }

    async analyzeDocument(req, res) {
        try {
            const result = await new AnalyzeDocumentService().AnalyzeDocument(req)
            res.send({
                status: "success",
                message: resultId?.data,
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
}
