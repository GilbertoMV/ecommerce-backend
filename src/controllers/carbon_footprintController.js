import axios from 'axios'; // Agrega esta línea

export const getCarbonFootprint = async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await axios.post("https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4-turbo", // Usar gpt-4
        messages: [
          { role: "system", 
            content: `Eres un asistente especializado en el cálculo de huella de carbono de productos usando la metodología PAS 2050. Calcula la huella de carbono en kg CO₂e con base en los datos de ecoinvent. Sigue los siguientes principios y supuestos:
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
                    - Porcentaje de reciclabilidad (%): Aqui se te proporcionara un porcentaje de reciclabilidad general de los materiales de fabricacion, por tanto es un porcentaje de reciclabilidad del producto.

                    Ejemplo de entrada:
                    - Tipo de material: Acero reciclado
                    - Cantidad (en kg): 500
                    - Tipo de energía: Energía eólica
                    - Cantidad (en Kwh): 120
                    - Distancia en avión (en km): 500
                    - Distancia en camión (en km): 100
                    - Distancia en barco (en km): 0
                    - Porcentaje de reciclabilidad (%): 80` },  // Mensaje de sistema (para configurar el tono o el contexto)
          { role: "user", content: userMessage }  // Mensaje del usuario
        ],
        temperature: 0.1,  // Controla la creatividad de las respuestas (0-1)
        max_tokens: 20,  // Número máximo de tokens para la respuesta
        top_p: 1,  // Controla la diversidad (1 significa que considera todas las opciones)
        frequency_penalty: 0.0,  // Penalty para evitar repeticiones (de -2 a 2)
        presence_penalty: 0.0,  // Penalty para evitar respuestas fuera de contexto (de -2 a 2)
        stop: null  // Secuencias de parada personalizadas (si las necesitas)
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Tu clave API
        },
      }
    );

    const assistantResponse = response.data.choices[0].message.content; // Obtener la respuesta del asistente
    res.json({ message: assistantResponse });
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    throw error;
  }
}