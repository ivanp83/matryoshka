'use strict';

const { db } = require('../db');
const { checkAuthorization } = require('../tg-auth');
const customers = db('customers');
const carts = db('carts');
const { getHashToken } = require('../utils/crypto');

module.exports = {
  async create({ init_data, ...rest }) {
    const user_info = checkAuthorization(init_data);
    // const user_info = {
    //   id: 1294200727,
    //   first_name: 'Ivan',
    //   last_name: '',
    //   username: 'eachpw',
    //   language_code: 'ru',
    // };

    if (!user_info) return;
    const { id, username, first_name } = user_info;
    try {
      const customer_exists = await customers
        .query('SELECT * FROM customers WHERE  telegram_id=$1', [id])
        .then((res) => res.rows[0]);

      if (customer_exists === undefined) {
        const new_customer = await customers
          .create({
            telegram_id: id,
            username,
            first_name,
            token: getHashToken(id),
          })
          .then((res) => res.rows[0]);
        carts.query(`INSERT INTO "carts" ("customer_id", "cart_items") VALUES
          (${new_customer.telegram_id}, '[]');`);
        return customers.queryRows(
          `SELECT * FROM customers INNER JOIN carts ON carts.customer_id=$1  WHERE telegram_id=$1`,
          [id],
        );
      } else {
        const cart_exists = await carts.queryRows(
          `SELECT * FROM carts WHERE customer_id=$1;`,
          [id],
        );

        if (cart_exists === undefined) {
          carts.query(`INSERT INTO "carts" ("customer_id", "cart_items") VALUES
        (${id}, '[]');`);
        }
        return await customers.queryRows(
          `SELECT * FROM customers INNER JOIN carts ON carts.customer_id=$1  WHERE telegram_id=$1`,
          [id],
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
};
