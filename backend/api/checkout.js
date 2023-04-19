'use strict';

const { db } = require('../db');
const orders = db('orders');
const products = db('products');
const customers = db('customers');
const { bot } = require('../telegraf/bot.service');

module.exports = {
  async create({ shippingAddress, orderProducts }) {
    console.log({ shippingAddress, orderProducts });
    // Validate Incoming Products
    const ids = [...orderProducts.map((p) => p.id)];
    const productInDb = await products.queryRows(
      `SELECT * FROM products WHERE id IN($1, $2) LIMIT 2;`,
      [...ids],
    );
    const map = new Map();

    for (let prod of productInDb) {
      const { quantity } = orderProducts.find((p) => {
        if (p.id == prod.id) return p.quantity;
      });
      map.set(prod.id, { ...prod, quantity });
    }
    const orderTotal = [...map.values()].reduce(
      (acc, val) => acc + val.quantity * val.price,
      0,
    );
    let customer;
    customer = await customers.queryRows(
      `SELECT * FROM customers WHERE customers.phone =$1`,
      [shippingAddress.phone],
    );

    if (!customer.length) {
      customer = await customers.queryRows(
        `INSERT INTO customers ("first_name", "last_name", "phone", "token") VALUES ('${shippingAddress.first_name}','${shippingAddress.last_name}','${shippingAddress.phone}', '${shippingAddress.first_name}');`,
      );
    }

    const newOrder = await orders.queryRows(
      `INSERT INTO orders ("customer_id") VALUES($1) RETURNING id;`,
      [customer[0].id],
    );

    // Yookassa Request
    const payload = {
      amount: {
        value: orderTotal,
        currency: 'RUB',
      },

      payment_method_data: {
        type: 'bank_card',
      },

      confirmation: {
        type: 'redirect',
        return_url: `${
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/order/${newOrder[0].id}'
            : 'https://matreshka39.ru'
        }/order/${newOrder[0].id}`,
      },

      capture: true,
      description: `Заказ ${JSON.stringify(map.values(), null, 2)}`,
    };

    const myHeaders = new Headers();
    myHeaders.append('Idempotence-Key', `${new Date().getTime()}`);
    myHeaders.set(
      'Authorization',
      'Basic ' +
        Buffer.from(
          process.env.YOOKASSA_SHOPID + ':' + process.env.YOOKASSA_TOKEN,
        ).toString('base64'),
    );

    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
    };
    const yookassaResponse = await fetch(
      process.env.YOOKASSA_URI,
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => result);

    await orders.queryRows(
      `UPDATE orders
 SET yookassa_id = $2, amount = $3, currency=$4, order_status=$5, shipping_address=$6, order_items=$7  WHERE orders.id= $1;`,
      [
        newOrder[0].id,
        yookassaResponse.id,
        Number(yookassaResponse.amount.value),
        yookassaResponse.amount.currency,
        yookassaResponse.status,
        JSON.stringify(
          {
            city: shippingAddress.city,
            zip: shippingAddress.zip,
            address: shippingAddress.address,
          },
          null,
          2,
        ),
        JSON.stringify(orderProducts, null, 2),
      ],
    );

    // const order = await orders.queryRows(
    //   `SELECT * FROM orders WHERE orders.id= $1 INSERT INTO orders ( "yookassa_id", "amount", "currency", "order_status", "shipping_address", "order_items")
    //     VALUES ('${yookassaResponse.id}', '${Number(
    //     yookassaResponse.amount.value,
    //   )}', '${yookassaResponse.amount.currency}', '${
    //     yookassaResponse.status
    //   }', '${JSON.stringify(
    //     {
    //       city: shippingAddress.city,
    //       zip: shippingAddress.zip,
    //       address: shippingAddress.address,
    //     },
    //     null,
    //     2,
    //   )}', '${JSON.stringify(orderProducts, null, 2)}')`,
    //   [newOrder[0].id],
    // );

    return {
      status: yookassaResponse.status,
      returnUrl: yookassaResponse.confirmation.return_url,
      confirmationUrl: yookassaResponse.confirmation.confirmation_url,
    };
  },
};
