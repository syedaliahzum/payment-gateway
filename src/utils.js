function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parseEnv(env) {
  return {
    port: parseInt(env.PORT) || 3000,
    environment: env.NODE_ENV || 'development',
    apiKey: env.API_KEY || null,
    debug: env.DEBUG === 'true'
  };
}

function logRequest(method, path, statusCode) {
  console.log(`[${new Date().toISOString()}] ${method} ${path} ${statusCode}`);
}

function formatError(code, message) {
  return { error: { code, message, timestamp: new Date().toISOString() } };
}

module.exports = { validateEmail, parseEnv, logRequest, formatError };
