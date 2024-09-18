import {MercadoPagoConfig, Preference} from 'mercadopago';

//Creamos el cliete el cual nos mandara lo que debera pagar, el accestoken es de la tienda
const cliente = new MercadoPagoConfig({
  access_token: process.env.MPTOKEN
});

//Creamos una ruta donde mandaremos los parametros y variables que nos dan en el front
export const createPreferences = async (req, res) => {
    try {
        const body = {
            items:[{
            title: req.body.title,
            quantity: Number(req.body.quantity),
            unit_price: Number(req.body.unit_price),
            currency_id: "MXN"
        }],
            back_urls: {
                //Rutas de donde lo dejaran si damos con exito, error o pendiente el pago, esto no se que hacer
                success: "http://localhost:3000/success", 
                failure: "http://localhost:3000/failure",
                pending: "http://localhost:3000/pending"
            },
            auto_return: "approved",
        };

        res.status(201).json({id:response.body.id})
    } catch (error) {
        res.status(500).json({error: 'Error creando la orden de pago'})
    }
};