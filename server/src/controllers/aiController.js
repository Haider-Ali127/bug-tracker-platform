const { analyzeBug } = require("../services/geminiService");
const analyzeIssue = async (req, res) => {

    try {

        const { title, description } = req.body;

        const response = await analyzeBug(title, description);

        res.json({
            success: true,
            analysis: response,
        });

    } catch (err) {

        console.error("Gemini Error:", err);

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};

module.exports = {
    analyzeIssue,
};