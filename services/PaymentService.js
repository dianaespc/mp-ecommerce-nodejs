const axios = require("axios");

class PaymentService {
  constructor() {
    this.tokensMercadoPago = {
      prod: {},
      test: {
        access_token:
          "APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398"
      }
    };
    this.mercadoPagoUrl = "https://api.mercadopago.com/checkout";
  }

  async createPaymentMercadoPago(name, price, unit, img) {
    const url = `${this.mercadoPagoUrl}/preferences?access_token=${this.tokensMercadoPago.test.access_token}`;
    img= 'https://mapache-mp-commerce-nodejs.herokuapp.com'+img.substring(1);
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
        email: "test_user_63274575@testuser.com",
        phone: {
          area_code: "11",
          number: "22223333"
        },
        address: {
          zip_code: "1111",
          street_name: "False",
          street_number: "123"
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
        success: "https://mapache-mp-commerce-nodejs.herokuapp.com/success",
        pending: "https://mapache-mp-commerce-nodejs.herokuapp.com/pending",
        failure: "https://mapache-mp-commerce-nodejs.herokuapp.com/error"
      },
      notification_url: "https://mapache-mp-commerce-nodejs.herokuapp.com/webhook",
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