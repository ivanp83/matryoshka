({
  Entity: {},
  telegramId: { type: 'number', length: { min: 1, max: 64 }, unique: true },
  username: { type: 'string', length: { min: 1, max: 64 }, unique: true },
  firstName: { type: 'string', length: { min: 1, max: 64 } },
  lastName: { type: 'string', length: { min: 1, max: 64 } },
  token: { type: 'string', note: 'Token hash' },
  createdAt: { type: 'string' },
});
