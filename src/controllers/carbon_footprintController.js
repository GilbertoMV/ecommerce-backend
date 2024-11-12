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
  try {
    const runId = req.params.runId;
    const threadId = process.env.THREAD_ID;

    // 3. Obtener la respuesta del asistente asociada al run
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

    // Filtrar y obtener el mensaje del asistente asociado con el runId
    const assistantResponse = response.data.data.find(
      (message) => message.role === 'assistant' && message.run_id === runId
    );

    if (assistantResponse) {
      return res.status(200).json({ respuesta: assistantResponse.content.map(content => content.text.value).join(' ') });
    } else {
      return res.status(404).send("No se encontró la respuesta del asistente para este run.");
    }
  } catch (error) {
    console.error("Error al obtener la respuesta del asistente:", error.response ? error.response.data : error.message);
    res.status(500).send("Hubo un error al obtener la respuesta del asistente.");
  }
};
