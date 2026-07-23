const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
});

const analyzeBug = async (title, description) => {

    const prompt = `
You are an experienced Senior Software Engineer and Bug Analyst.

Analyze the following bug report.

Title:
${title}

Description:
${description}

Respond ONLY in this format:

Severity:
(Low / Medium / High / Critical)

Category:
(UI / Backend / Database / Authentication / API / Performance / Security / Validation / Other)

Possible Cause:
(Explain the most likely reason for this bug.)

Developer Solution Recommendation:
(Give 3-5 practical debugging or fixing suggestions.)

Estimated Complexity:
(Easy / Medium / Hard)

Estimated Fix Time:
(Approximate time)

Do not use markdown.
Do not use code blocks.
Keep the response concise and professional.
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
};

module.exports = {
    analyzeBug,
};