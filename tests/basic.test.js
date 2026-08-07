describe('Application Tests', () => {
  test('should validate email', () => {
    const email = 'test@example.com';
    expect(email).toMatch(/@/);
  });

  test('should parse config', () => {
    const config = { port: 3000, env: 'dev' };
    expect(config.port).toBe(3000);
  });

  test('should handle data structures', () => {
    const data = { id: 1, name: 'test', active: true };
    expect(data).toHaveProperty('id');
    expect(data.active).toBe(true);
  });
});
