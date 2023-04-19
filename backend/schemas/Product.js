({
  Entity: {},
  name: { type: 'string', length: { min: 1, max: 64 }, unique: true },
  description: { type: 'string' },
  price: { type: 'number' },
  categoryId: { type: 'number' },
  image: { many: 'Image' },
  createdAt: { type: 'string' },
});
// id INT generated always as identity PRIMARY KEY,
// name VARCHAR(100) NOT NULL,
// description text NOT NULL,
// price INT NOT NULL,
// category_id INT NOT NULL,
// FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
