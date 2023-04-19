'use strict';

const { db } = require('../db');
const path = require('node:path');
const fs = require('node:fs');
const { convertImage } = require('../utils/helpers');
const categories = db('categories');

module.exports = {
  async read(id, isAdmin, fields = ['*']) {
    const names = fields.join(', ');
    const sql = `SELECT ${names} FROM categories`;
    if (!id) return await categories.queryRows(sql);

    return await categories.queryRows(`${sql}  WHERE categories.id = $1`, [id]);
  },

  async create(data, isAdmin) {
    try {
      // if (!isAdmin) return 'Forbidden!';
      const folder = new Date().getTime().toString();
      const { name, description, image } = data;
      const p1 = await convertImage(image, folder, 370);
      const p2 = await convertImage(image, folder, 800);

      return await categories.create({
        name,
        description,
        image: p1,
        image_big: p2,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async update({ id: category_id, name, description, base64Data }, isAdmin) {
    if (!isAdmin) return 'Forbidden';
    try {
      await categories.update(category_id, {
        name,
        description,
      });

      if (base64Data) {
        const folder = new Date().getTime().toString();
        const sql = `SELECT * FROM categories WHERE categories.id=$1;`;
        const res = await categories.queryRows(sql, [category_id]);
        const folder_to_remove = res[0].image.split('/');
        const folderPath = path.join(
          process.cwd(),
          'public',
          folder_to_remove[0],
          folder_to_remove[1],
        );
        if (fs.existsSync(folderPath)) {
          fs.rmSync(folderPath, {
            recursive: true,
            force: true,
          });
        }
        const image_path = await convertImage(base64Data, folder, 600);

        await categories.query(
          `UPDATE categories SET image='${image_path}' WHERE categories.id=$1;`,
          [category_id],
        );
      }

      const sql = `SELECT * FROM categories`;
      return categories.query(`${sql} WHERE categories.id = $1`, [category_id]);
    } catch (error) {
      console.log(error);
    }
  },

  async delete(id, isAdmin) {
    // if (!isAdmin) return 'Forbidden';
    try {
      const sql = `SELECT * FROM categories WHERE id=$1`;
      const res = await categories.queryRows(sql, [id]);

      const toRemove1 = res[0].image.split('/');
      const toRemove2 = res[0].image_big.split('/');
      const folderPath1 = path.join(
        process.cwd(),
        'public',
        toRemove1[0],
        toRemove1[1],
      );
      const folderPath2 = path.join(
        process.cwd(),
        'public',
        toRemove2[0],
        toRemove2[1],
      );

      if (fs.existsSync(folderPath1)) {
        fs.rmSync(folderPath1, {
          recursive: true,
          force: true,
        });
      }
      if (fs.existsSync(folderPath2)) {
        fs.rmSync(folderPath2, {
          recursive: true,
          force: true,
        });
      }
      categories.delete(id);
      return { status: '200' };
    } catch (error) {
      console.log(error);
    }
  },
};
