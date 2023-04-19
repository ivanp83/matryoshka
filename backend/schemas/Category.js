({
  Entity: {},
  name: { type: 'string', length: { min: 1, max: 64 }, unique: true },
  description: { type: 'string' },
  image: 'Image',
  createdAt: { type: 'date' },
});
