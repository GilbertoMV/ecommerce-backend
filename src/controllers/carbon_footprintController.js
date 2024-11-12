import axios from 'axios';

export const getCarbonFootprint = async (req, res) => {
  try {
    const userMessage = req.body.message;
    const threadId = process.env.THREAD_ID; // Asegúrate de tener un threadId válido

    if (!threadId) {
      return res.status(400).send("El ID del hilo (threadId) es requerido.");
    }

    const response = await axios.post(
      `https://api.openai.com/v1/threads/${threadId}/messages`,
      {
        // Ahora solo pasamos el texto como un string directamente
        role: 'user',
        content: userMessage,  // Se pasa directamente el mensaje como un string
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // API Key para autorización
          'OpenAI-Beta': 'assistants=v2', // Asegúrate de que esta cabecera sea necesaria según la versión de la API que estás usando
        },
      }
    );

    // Verificar si la respuesta tiene el formato esperado
    const assistantResponse = parseAssistantResponse(response.data);

    return res.status(200).send(assistantResponse); // Enviar la respuesta procesada
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    res.status(500).send("Hubo un error en la respuesta del asistente.");
  }
};

// Función para parsear la respuesta del asistente
const parseAssistantResponse = (data) => {
  if (!data || !data.choices || data.choices.length === 0) {
    return 'No se obtuvo respuesta del asistente.';
  }

  // Se asume que 'choices' contiene la respuesta del asistente
  const assistantMessage = data.choices[0].message?.content;

  if (assistantMessage) {
    return assistantMessage;
  } else {
    return 'No se encontró contenido en la respuesta del asistente.';
  }
};
