// Utility Helper Functions for SOLVIX Server

function formatResponse(success, message, data = null) {
  return {
    success,
    message,
    ...(data ? { data } : {}),
    timestamp: new Date().toISOString()
  };
}

function sanitizeString(str) {
  if (typeof str !== 'string') return str;
  return str.trim();
}

module.exports = {
  formatResponse,
  sanitizeString
};
