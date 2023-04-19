'use strict';

const { db } = require('../db');
const images = db('images ');
const path = require('path');

module.exports = {
  read(id, fields = ['*']) {
    const names = fields.join(', ');
    const sql = `SELECT ${names} FROM products INNER JOIN images ON products.id=images.product_id`;
    if (!id) return produts.query(sql);

    return produts.query(`${sql} WHERE products.id = $1`, [id]);
  },

  async update(product_id, { small, big }, isAdmin) {
    if (!isAdmin) return 'Forbidden';
    try {
      await images.query(
        `UPDATE images SET small=${small} big=${big} WHERE  images.product_id=$1 RETURNING *;`,
        [product_id],
      );
      await images.query(sql, [product_id]);
    } catch (error) {
      console.log(error);
    }
  },

  delete(id, isAdmin) {
    if (!isAdmin) return 'Forbidden';
    return produts.delete(id);
  },
};
