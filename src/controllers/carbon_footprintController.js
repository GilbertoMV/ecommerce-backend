export const getCarbonFootprint = async (req, res) => {
    try {
        const userMessage = req.body.message;
    
        // Llama a la API de OpenAI con el mensaje del usuario y el ID de tu modelo personalizado
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "asst_XKJTXDLYqe3cJFgCAs7bRWtt",  // Cambia esto al ID de tu asistente configurado
            messages: [{ role: "user", content: userMessage }]
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
          }
        );
    
        // Obtén la respuesta del asistente
        const assistantResponse = response.data.choices[0].message.content;
        res.json({ response: assistantResponse });
      } catch (error) {
        console.error("Error al obtener respuesta de GPT:", error);
        res.status(500).json({ error: "Hubo un problema al procesar la solicitud." });
      }
}