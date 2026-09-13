// SOLVIX REST API Client Service

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

const getAdminToken = () => {
  return sessionStorage.getItem('solvix_admin_token') || '';
};

const getHeaders = (includeAuth = false) => {
  const headers = { 'Content-Type': 'application/json' };
  if (includeAuth) {
    headers['Authorization'] = `Bearer ${getAdminToken()}`;
  }
  return headers;
};

async function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  let data = {};
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    const text = await response.text();
    data = { error: text, message: text };
  }

  if (!response.ok) {
    const err = new Error(data.error || data.message || `Server returned status ${response.status}`);
    err.code = data.code || `HTTP_${response.status}`;
    err.status = response.status;
    throw err;
  }

  return data;
}

export const api = {
  // 1. Submit Contact Form (POST /api/contact)
  submitContact: async (payload) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify(payload),
      });
      return await handleResponse(response);
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to SOLVIX backend server (http://localhost:5000). Please check that your Express server is running.');
      }
      throw error;
    }
  },

  // 2. Submit Quote Request (POST /api/quote)
  submitQuote: async (payload) => {
    try {
      const response = await fetch(`${API_BASE_URL}/quote`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify(payload),
      });
      return await handleResponse(response);
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to SOLVIX backend server (http://localhost:5000). Please check that your Express server is running.');
      }
      throw error;
    }
  },

  // 3. Submit Consultation Request (POST /api/consultation)
  submitConsultation: async (payload) => {
    try {
      const response = await fetch(`${API_BASE_URL}/consultation`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify(payload),
      });
      return await handleResponse(response);
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to SOLVIX backend server (http://localhost:5000). Please check that your Express server is running.');
      }
      throw error;
    }
  },

  // 4. Subscribe Newsletter (POST /api/newsletter)
  subscribeNewsletter: async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ email }),
      });
      return await handleResponse(response);
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to SOLVIX backend server.');
      }
      throw error;
    }
  },

  // 5. Admin Login (POST /api/admin/login)
  adminLogin: async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ username, password }),
      });
      const data = await handleResponse(response);
      if (data.token) {
        sessionStorage.setItem('solvix_admin_token', data.token);
      }
      return data;
    } catch (error) {
      throw error;
    }
  },

  // 6. API Health Check (GET /api/health)
  getHealth: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  // 7. GET Admin Enquiries Overview (GET /api/admin/enquiries)
  getAdminEnquiries: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/enquiries`, {
        headers: getHeaders(true),
      });
      return await handleResponse(response);
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to SOLVIX backend server (http://localhost:5000). Please ensure your Express backend is running.');
      }
      throw error;
    }
  },

  // 8. Dedicated Admin GET Endpoints
  getAdminContacts: async (search = '', status = 'All') => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/contacts?search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}`, {
        headers: getHeaders(true),
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  getAdminQuotes: async (search = '', status = 'All') => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/quotes?search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}`, {
        headers: getHeaders(true),
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  getAdminConsultations: async (search = '', status = 'All') => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/consultations?search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}`, {
        headers: getHeaders(true),
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  getAdminSubscribers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/subscribers`, {
        headers: getHeaders(true),
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  // 9. Update Status (PATCH /api/admin/enquiries/:type/:id)
  updateStatus: async (type, id, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/enquiries/${type}/${id}`, {
        method: 'PATCH',
        headers: getHeaders(true),
        body: JSON.stringify({ status }),
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  // 10. Delete Record (DELETE /api/admin/enquiries/:type/:id)
  deleteEnquiry: async (type, id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/enquiries/${type}/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true),
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  // 10b. Get Audit Logs (GET /api/admin/logs)
  getAuditLogs: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/logs`, {
        headers: getHeaders(true),
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  // 10c. Get Email System Status (GET /api/admin/email-status)
  getEmailStatus: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/email-status`, {
        headers: getHeaders(true),
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  // 11. AI Chatbot Message (POST /api/chat)
  sendChatMessage: async (message, conversation = [], context = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ message, conversation, context }),
      });
      return await handleResponse(response);
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        const netErr = new Error('Unable to connect to SOLVIX AI Backend server. Please verify your server is running on http://localhost:5000.');
        netErr.code = 'NETWORK_ERROR';
        throw netErr;
      }
      throw error;
    }
  },

  // 12. AI Chatbot Estimate (POST /api/chat/estimate)
  getChatbotEstimate: async (payload) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/estimate`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify(payload),
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  // 13. AI Chatbot Enquiry (POST /api/chat/enquiry)
  submitChatbotEnquiry: async (payload) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/enquiry`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify(payload),
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },
};
