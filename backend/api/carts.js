'use strict';

const { db } = require('../db');
const carts = db('carts');
const customers = db('customers');

module.exports = {
  read(id, fields = ['*']) {
    const names = fields.join(', ');
    const sql = `SELECT ${names} FROM carts`;
    if (!id) return customers.query(sql);
    return customers.query(`${sql} WHERE id = $1`, [id]);
  },
  async create({ customer, products = [] }) {
    const sql = `INSERT INTO "carts" ("customer_id","cart_items") VALUES
    (1, ${JSON.stringify(products)});`;

    return carts.queryRows(`${sql} WHERE customer_id = $1`, [customer.id]);
  },

  async update({ customer, products }) {
    const sql = `SELECT cart_items FROM carts WHERE carts.customer_id=$1 `;
    let cart_prod = await carts.queryRows(sql, [customer]);

    return await carts.queryRows(
      `UPDATE carts SET cart_items='${JSON.stringify(
        products,
      )}' WHERE customer_id=$1 RETURNING cart_items;`,
      [customer],
    );
  },
  async delete({ customer_id, product_id }) {
    const sql = `SELECT cart_items FROM carts WHERE carts.customer_id=$1 `;
    let cart_prod = await carts.queryRows(sql, [customer_id]);

    const exists = cart_prod.cart_items.find(
      (item) => item.product_id === product_id,
    );

    if (exists) {
      if (exists.quantity == 1) {
        cart_prod = cart_prod.cart_items.filter(
          (product) => product.product_id !== product_id,
        );
      } else {
        cart_prod = cart_prod.cart_items.map((item) => {
          if (item.product_id === product_id) {
            return { ...exists, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    }

    return await carts.query(
      `UPDATE carts SET cart_items='${JSON.stringify(
        cart_prod,
        null,
        2,
      )}' WHERE id=1  RETURNING cart_items;`,
    );
  },
};
