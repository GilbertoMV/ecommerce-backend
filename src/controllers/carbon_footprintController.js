import axios from 'axios';

// Mensaje del sistema (solo se envía una vez al crear el hilo)
const systemMessage = `Eres un asistente especializado en calcular la huella de carbono de productos siguiendo la metodología PAS 2050.
  Calcula la huella de carbono en kg CO₂e con base en los datos de ecoinvent. Sigue los siguientes principios y supuestos:
  1. **Materiales**: Para cada tipo de material, usa factores de emisión aproximados de acuerdo con base de datos ecoinvent, considerando la cantidad en kg y cualquier ajuste relacionado con el porcentaje de reciclabilidad.
  2. **Energía**: Para cada tipo de energía y cantidad en Kwh, aplica factores de emisión de la base de datos ecoinvent, considerando la fuente (ej. energía renovable o fósil).
  3. **Transporte**: Calcula la huella de carbono en función de las distancias de transporte (avión, camión, barco) usando factores de emisión estándar por km para cada modo de transporte basado en los factores de la base de datos ecoinvent.
  4. **Metodología PAS 2050**

  Deberas cumplir con los siguientes parametros:
  1.- Reutilizaras los factores de emision. Esto significa que si tienes que utilizar el factor de emision de la madera por ejemplo que es 1.2 (valor de ejemplo no realista), la siguiente vez que se te solicite calcular con la madera utilizaras ese mismo valor. Lo pasado con la intención de mantener la consistencia en los resultados.
  2. En caso de que se te proporcione un dato del cual no puedas encontrar su factor de emision dentro de la base de datos, deberas relacionarlo con algun factor de emision cercano a su material.

  **Tu respuesta debe ser solo el valor numérico en kg CO₂e de la huella de carbono total**, sin ninguna explicación adicional.

  Explicacion de  la entrada:
  - Tipo de material: Aqui se te proporcionara el material que el producto contiene.
  - Cantidad (en kg): Aqui se te proporcionara la cantidad en kg de material que el producto contiene.
  - Tipo de energía: Aqui se te proporcionara el tipo de energia que el producto utilizo en produccion.
  - Cantidad (en Kwh): Aquí se te proporcionara la cantidad del tipo de energía utilizada.
  - Distancia en avión (en km): Aqui se te proporcionara la distancia total recorrida en avion por el o los materiales de fabricacion del producto
  - Distancia en camión (en km): Aqui se te proporcionara la distancia total recorrida en camion por el o los materiales de fabricacion del producto
  - Distancia en barco (en km): Aqui se te proporcionara la distancia total recorrida en barco por el o los materiales de fabricacion del producto
  - Porcentaje de reciclabilidad (%): Aqui se te proporcionara un porcentaje de reciclabilidad general de los materiales de fabricacion, por tanto es un porcentaje de reciclabilidad del producto.`;

// Función para crear un nuevo hilo
const createThread = async () => {
  try {
    const threadResponse = await axios.post(
      'https://api.openai.com/v1/threads',
      {
        description: "Este hilo está destinado a calcular la huella de carbono de productos usando PAS 2050.",
        messages: [
          { role: "system", content: systemMessage }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v2',
        },
      }
    );
    return threadResponse.data.id;
  } catch (error) {
    console.error("Error al crear el hilo:", error.response ? error.response.data : error.message);
    throw new Error('No se pudo crear el hilo.');
  }
};

// Función para enviar un mensaje al hilo
const sendMessageToThread = async (threadId, userMessage) => {
  try {
    const response = await axios.post(
      `https://api.openai.com/v1/threads/${threadId}/messages`,
      {
        messages: [
          { role: "user", content: userMessage }
        ],
        temperature: 0.1,  // Controla la creatividad de las respuestas (0-1)
        max_tokens: 20,  // Número máximo de tokens para la respuesta
        top_p: 1,  // Controla la diversidad (1 significa que considera todas las opciones)
        frequency_penalty: 0.0,  // Penalty para evitar repeticiones
        presence_penalty: 0.0,  // Penalty para evitar respuestas fuera de contexto
        stop: null  // Secuencias de parada personalizadas
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v2',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al enviar mensaje al hilo:", error.response ? error.response.data : error.message);
    throw new Error('No se pudo enviar el mensaje al hilo.');
  }
};

// Endpoint para interactuar con el asistente
export const getCarbonFootprint = async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Crear el hilo si no existe o si es necesario crear uno nuevo
    let threadId = req.body.threadId;
    if (!threadId) {
      threadId = await createThread();  // Crear un nuevo hilo si no se proporciona uno
    }

    // Validar que el threadId sea válido
    if (!threadId) {
      return res.status(400).send("El ID del hilo (threadId) es requerido.");
    }

    // Enviar mensaje al hilo con el mensaje del usuario
    const response = await sendMessageToThread(threadId, userMessage);

    // Procesar y enviar la respuesta
    const assistantResponse = parseAssistantResponse(response);
    return res.status(200).send(assistantResponse);  // Enviar la respuesta procesada

  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).send("Hubo un error en la respuesta del asistente.");
  }
};

// Función para parsear la respuesta del asistente
const parseAssistantResponse = (data) => {
  if (!data || !data.choices || data.choices.length === 0) {
    return 'No se obtuvo respuesta del asistente.';
  }

  const assistantMessage = data.choices[0].message?.content;

  if (assistantMessage) {
    return assistantMessage;
  } else {
    return 'No se encontró contenido en la respuesta del asistente.';
  }
};
