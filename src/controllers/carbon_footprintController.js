import axios from 'axios';

export const getCarbonFootprint = async (req, res) => {
  try {
    const userMessage = req.body.message;
    const threadId = process.env.THREAD_ID;

    // Envía el mensaje al asistente
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

    // Verifica si hay un mensaje de respuesta del asistente en la data
    if (response.data && response.data.choices && response.data.choices.length > 0) {
      const assistantResponse = response.data.choices[0].message.content;
      return res.status(200).send(assistantResponse);
    } else {
      // Si no hay respuesta, intenta obtenerla de nuevo
      const threadResponse = await axios.get(
        `https://api.openai.com/v1/threads/${threadId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'OpenAI-Beta': 'assistants=v2'
          }
        }
      );

      // Encuentra el último mensaje de respuesta del asistente en el hilo
      const messages = threadResponse.data.messages;
      const assistantMessage = messages.find(msg => msg.role === 'assistant');

      if (assistantMessage) {
        return res.status(200).send(assistantMessage.content);
      } else {
        return res.status(500).send("No se recibió respuesta del asistente.");
      }
    }
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    res.status(500).send("Hubo un error en la respuesta del asistente.");
  }
};
