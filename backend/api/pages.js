'use strict';

const { db } = require('../db');
const pages = db('pages');

module.exports = {
  read(name, fields = ['*']) {
    const names = fields.join(', ');
    const sql = `SELECT ${names} FROM pages INNER JOIN images ON pages.id=images.page_id`;
    if (!name) return pages.query(sql);

    return products.query(`${sql} WHERE pages.name = $1`, [name]);
  },
};
