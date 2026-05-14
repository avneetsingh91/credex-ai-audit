const axios = require("axios");

const generateSummary = async (auditData) => {
  try {
    const prompt = `
You are an AI SaaS cost consultant.
Analyze this company's AI tool expenses.

Data:
${JSON.stringify(auditData)}

Write a concise 100-word summary:
- overspending areas
- best optimization
- annual savings
- practical recommendation
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    return "Your current stack has optimization opportunities. Consolidating overlapping subscriptions could reduce monthly AI infrastructure cost significantly.";
  }
};

module.exports = generateSummary;