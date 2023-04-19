'use strict';

const { db } = require('../db');
const categories = db('category_with_products');

module.exports = {
  async read(id, isAdmin, fields = ['*']) {
    console.log('entity');
    const names = fields.join(', ');
    const sql = `SELECT ${names} FROM categories`;
    if (!id) return await categories.queryRows(sql);

    return await categories.queryRows(
      `${sql} INNER JOIN products ON products.category_id=categories.id INNER JOIN images ON products.id=images.product_id  WHERE categories.id = $1`,
      [id],
    );
  },
};
