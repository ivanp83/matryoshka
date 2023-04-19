({
  Entity: {},
  small: { type: 'string' },
  big: { type: 'string' },
  productId: { type: 'number' },
  categoryId: { type: 'number' },
  createdAt: { type: 'date' },
});

// product_id INT,
// page_id INT,
// small varchar(255) NOT NULL,
// big varchar(255) NOT NULL,
// FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
// FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE
