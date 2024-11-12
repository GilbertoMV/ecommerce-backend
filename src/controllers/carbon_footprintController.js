import axios from 'axios';

export const postProductData = async (req, res) => {
  try {
    const userMessage = req.body.message;
    const threadId = process.env.THREAD_ID;

    // 1. Enviar el mensaje del usuario al asistente
    const responseMessage = await axios.post(
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

    // Obtener el ID del mensaje
    const messageId = responseMessage.data.id;

    // 2. Crear un `run` después de enviar el mensaje
    const responseRun = await axios.post(
      `https://api.openai.com/v1/threads/${threadId}/runs`,
      {
        assistant_id: process.env.ASSISTANT_ID, // Asegúrate de que está configurado
        additional_instructions: `Procesar el mensaje con ID: ${messageId}`
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v2'
        },
      }
    );

    // Obtener el ID del run
    const runId = responseRun.data.id;

    return res.status(200).json({ messageId, runId });
  } catch (error) {
    console.error("Error al enviar el mensaje y crear el run:", error.response ? error.response.data : error.message);
    res.status(500).send("Hubo un error al enviar el mensaje y crear el run.");
  }
};

export const getCarbonFootprint = async (req, res) => {
  const runId = req.params.id;
  const threadId = process.env.THREAD_ID;

  try {
    // Consulta los mensajes del hilo específico
    const response = await axios.get(
      `https://api.openai.com/v1/threads/${threadId}/messages`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v2'
        },
      }
    );

    // Revisa si hay mensajes con el mismo `runId`
    const assistantMessage = response.data.data.find(
      (message) => message.role === 'assistant' && message.run_id === runId
    );

    if (assistantMessage && assistantMessage.content) {
      // Si el mensaje existe, devuelve su contenido
      return res.status(200).json({ respuesta: assistantMessage.content.map(c => c.text.value).join('\n') });
    } else {
      // Mensaje no encontrado en la respuesta de OpenAI
      res.status(404).send("No se encontró una respuesta para ese run.");
    }
  } catch (error) {
    console.error("Error al obtener la respuesta del mensaje:", error.response ? error.response.data : error.message);
    res.status(500).send("Hubo un error al obtener la respuesta del asistente.");
  }
};

