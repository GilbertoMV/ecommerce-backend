import axios from 'axios';

export const getCarbonFootprint = async (req, res) => {
  try {
    const userMessage = req.body.message;
    
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "asst_ilgVLDJP6uWasX4uRvXfp5Zw",  // ID de tu asistente personalizado
        messages: [
          { role: "user", content: userMessage }  // Solo el mensaje del usuario
        ],
        temperature: 0.1,
        max_tokens: 20,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        timeout: 10000  // Límite de tiempo de 10 segundos
      }
    );

    const assistantResponse = response.data.choices[0].message.content;
    
    res.json({ message: assistantResponse });
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Ocurrió un error al procesar la solicitud" });
  }
};
