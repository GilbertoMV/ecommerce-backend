import axios from 'axios';

export const getCarbonFootprint = async (req, res) => {
  try {
    const userMessage = req.body.message;
    const threadId = process.env.THREAD_ID;

    const response = await axios.post(
      `https://api.openai.com/v1/threads/${threadId}/messages`,
      {
        role: 'user',
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

    // Extraemos el mensaje de respuesta del asistente
    const assistantResponse = response.data.content;
    
    return res.status(200).json({ respuesta: assistantResponse });
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    res.status(500).send("Hubo un error en la respuesta del asistente.");
  }
};
