import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ 
    accessToken:process.env.MPTOKEN
})

export const createPreferences = async (req, res) => {
  try {
    const body = {
      items: [
        {
        title: req.body.title,
        quantity: Number(req.body.quantity),
        unit_price: Number(req.body.unit_price),
        currency_id: "MXN"
      }
    ],
      back_urls: {
        success: "https://youtu.be/TGJY1w88s2Q?si=PY-Y0zRBks_u9HW3",
        failure: "https://youtu.be/I0ZrvmvIg58?si=bxfcf8R-QZMY_82e",
        pending: "https://youtu.be/bUmy7Nvsh4s?si=VjipOEgkMxJkFlZZ"
      },
      auto_return: "approved"
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    const link = `https://www.mercadopago.com.mx/checkout/v1/redirect?pref_id=${result.id}`;

    // Envía el enlace de pago al cliente
    res.status(201).json({ id: result.id, link });
  } catch (error) {
    console.error('Error creando la orden de pago:', error);
    res.status(500).json({ error: 'Error creando la orden de pago' });
  }
};
