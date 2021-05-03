const axios = require("axios");

class PaymentService {
  constructor() {
    this.tokensMercadoPago = {
      prod: {},
      test: {
        access_token:
          "APP_USR-2572771298846850-120119-a50dbddca35ac9b7e15118d47b111b5a-681067803"
      }
    };
    this.mercadoPagoUrl = "https://api.mercadopago.com/checkout";
  }

  async createPaymentMercadoPago(name, price, unit, img) {
    const url = `${this.mercadoPagoUrl}/preferences?access_token=${this.tokensMercadoPago.test.access_token}`;
    img= 'https://dianaespc-mp-commerce-nodejs.herokuapp.com'+img.substring(1);
    const items = [
      {
        id: 1234,
        title: name,
        description: "Dispositivo móvil de Tienda e-commerce",
        picture_url: img,
        quantity: parseInt(unit),
        unit_price: parseFloat(price)
      }
    ];

    const preferences = {
      items,
      external_reference: "dpaolac@gmail.com",
      payer: {
        name: "Lalo",
        surname: "Landa",
        email: "test_user_83958037@testuser.com",
        phone: {
          area_code: "52",
          number: "5549737300"
        },
        address: {
          zip_code: "03940",
          street_name: "Insurgentes Sur",
          street_number: "1602"
        }
      },
      payment_methods: {
        excluded_payment_methods: [
          {
            id: "amex"
          }
        ],
        excluded_payment_types: [{ id: "atm" }],
        installments: 6,
        // default_installments: 6
      },
      back_urls: {
        success: "https://dianaespc-mp-commerce-nodejs.herokuapp.com/success",
        pending: "https://dianaespc-mp-commerce-nodejs.herokuapp.com/pending",
        failure: "https://dianaespc-mp-commerce-nodejs.herokuapp.com/error"
      },
      notification_url: "https://dianaespc-mp-commerce-nodejs.herokuapp.com/webhook",
      auto_return: "approved"
    };

    try {
      const request = await axios.post(url, preferences, {
        headers: {
          "Content-Type": "application/json",
          "x-integrator-id": "dev_24c65fb163bf11ea96500242ac130004"
        }
      });
      return request.data;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = PaymentService;