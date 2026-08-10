describe('Tests', () => {
  test('email validation', () => expect('test@example.com').toMatch(/@/));
  test('data structure', () => {
    const d = {id: 1, name: 'test', active: true};
    expect(d).toHaveProperty('id');
    expect(d.active).toBe(true);
  });
  test('hash', () => {
    const crypto = require('crypto');
    const h = crypto.createHash('sha256').update('password').digest('hex');
    expect(h).toHaveLength(64);
  });
});
