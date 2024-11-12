import axios from 'axios';

export const getCarbonFootprint = async (req, res) => {
  try {
    const userMessage = req.body.message;
    const threadId = process.env.THREAD_ID;

    const response = await axios.post(
      `https://api.openai.com/v1/threads/${threadId}/messages`,
      {
        content: userMessage,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v2'
        },
      }
    );

    const assistantResponse = response.data.choices[0].message.content;
    return res.status(200).send(assistantResponse);
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    res.status(500).send("Hubo un error en la respuesta del asistente.");
  }
};
