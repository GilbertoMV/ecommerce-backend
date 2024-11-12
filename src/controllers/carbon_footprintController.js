import axios from 'axios';

export const postProductData = async (req, res) => {
  try {
    const userMessage = req.body.message;
    const threadId = process.env.THREAD_ID;

    const response = await axios.post(
      `https://api.openai.com/v1/threads/${threadId}/messages`,
      {
        role: 'assistant',
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

    // Devuelve el ID del mensaje
    const messageId = response.data;  // Esto depende de la estructura real de la respuesta
    return res.status(200).json({ messageId });
  } catch (error) {
    console.error("Error en el envío de mensaje a GPT:", error.response ? error.response.data : error.message);
    res.status(500).send("Hubo un error al enviar el mensaje al asistente.");
  }
};

export const getCarbonFootprint = async (req, res) => {
  try {
    const messageId = req.params.id;
    const threadId = process.env.THREAD_ID;

    const response = await axios.get(
      `https://api.openai.com/v1/threads/${threadId}/messages/${messageId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v2'
        },
      }
    );

    const assistantResponse = response.data.content;  // Ajusta según la estructura de la respuesta
    return res.status(200).json({ respuesta: assistantResponse });
  } catch (error) {
    console.error("Error al obtener la respuesta del mensaje:", error.response ? error.response.data : error.message);
    res.status(500).send("Hubo un error al obtener la respuesta del asistente.");
  }
};


