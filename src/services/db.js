// SOLVIX Production Database Engine (Zero-Fake-Data Policy)
// Records real user submissions with Delete & status management: New, Contacted, Completed.

const STORAGE_KEYS = {
  CONSULTATIONS: 'solvix_prod_consultations',
  QUOTES: 'solvix_prod_quotes',
  INVOICES: 'solvix_prod_invoices',
  PAYMENTS: 'solvix_prod_payments',
  CLIENTS: 'solvix_prod_clients',
  PROJECTS: 'solvix_prod_projects',
  MESSAGES: 'solvix_prod_messages',
  CAREERS: 'solvix_prod_careers',
  SUBSCRIBERS: 'solvix_prod_subscribers',
};

function getStorage(key) {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify([]));
      return [];
    }
    return JSON.parse(item);
  } catch (e) {
    return [];
  }
}

function setStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('LocalStorage write error', e);
  }
}

export const dbService = {
  // Consultations
  getConsultations: () => getStorage(STORAGE_KEYS.CONSULTATIONS),
  addConsultation: (booking) => {
    const list = dbService.getConsultations();
    const newReq = {
      id: `CNS-${Date.now().toString().slice(-6)}`,
      status: 'New',
      isRead: false,
      createdAt: new Date().toLocaleString(),
      ...booking,
    };
    list.unshift(newReq);
    setStorage(STORAGE_KEYS.CONSULTATIONS, list);
    return newReq;
  },
  updateConsultationStatus: (id, newStatus) => {
    const list = dbService.getConsultations();
    const item = list.find((c) => c.id === id);
    if (item) {
      item.status = newStatus;
      setStorage(STORAGE_KEYS.CONSULTATIONS, list);
    }
  },
  deleteConsultation: (id) => {
    const list = dbService.getConsultations().filter((c) => c.id !== id);
    setStorage(STORAGE_KEYS.CONSULTATIONS, list);
  },

  // Quotes
  getQuotes: () => getStorage(STORAGE_KEYS.QUOTES),
  addQuote: (quoteData) => {
    const list = dbService.getQuotes();
    const newQuote = {
      id: `QTE-${Date.now().toString().slice(-6)}`,
      status: 'New',
      isRead: false,
      createdAt: new Date().toLocaleString(),
      ...quoteData,
    };
    list.unshift(newQuote);
    setStorage(STORAGE_KEYS.QUOTES, list);
    return newQuote;
  },
  updateQuoteStatus: (id, newStatus) => {
    const list = dbService.getQuotes();
    const item = list.find((q) => q.id === id);
    if (item) {
      item.status = newStatus;
      setStorage(STORAGE_KEYS.QUOTES, list);
    }
  },
  deleteQuote: (id) => {
    const list = dbService.getQuotes().filter((q) => q.id !== id);
    setStorage(STORAGE_KEYS.QUOTES, list);
  },

  // Contact Messages
  getMessages: () => getStorage(STORAGE_KEYS.MESSAGES),
  addMessage: (msg) => {
    const list = dbService.getMessages();
    const newMsg = {
      id: `MSG-${Date.now().toString().slice(-6)}`,
      status: 'New',
      isRead: false,
      createdAt: new Date().toLocaleString(),
      ...msg,
    };
    list.unshift(newMsg);
    setStorage(STORAGE_KEYS.MESSAGES, list);
    return newMsg;
  },
  updateMessageStatus: (id, newStatus) => {
    const list = dbService.getMessages();
    const item = list.find((m) => m.id === id);
    if (item) {
      item.status = newStatus;
      setStorage(STORAGE_KEYS.MESSAGES, list);
    }
  },
  deleteMessage: (id) => {
    const list = dbService.getMessages().filter((m) => m.id !== id);
    setStorage(STORAGE_KEYS.MESSAGES, list);
  },

  // Subscribers
  getSubscribers: () => getStorage(STORAGE_KEYS.SUBSCRIBERS),
  addSubscriber: (email) => {
    const list = dbService.getSubscribers();
    if (!list.some((s) => s.email === email)) {
      list.unshift({ email, date: new Date().toISOString().split('T')[0] });
      setStorage(STORAGE_KEYS.SUBSCRIBERS, list);
    }
  },
  deleteSubscriber: (email) => {
    const list = dbService.getSubscribers().filter((s) => s.email !== email);
    setStorage(STORAGE_KEYS.SUBSCRIBERS, list);
  },

  // Helper: Export dataset to CSV
  exportToCSV: (filename, dataArray) => {
    if (!dataArray || !dataArray.length) {
      alert('No data available to export.');
      return;
    }
    const headers = Object.keys(dataArray[0]);
    const csvRows = [];
    csvRows.push(headers.join(','));

    for (const row of dataArray) {
      const values = headers.map((header) => {
        let val = row[header];
        if (typeof val === 'object') val = JSON.stringify(val);
        const escaped = ('' + (val ?? '')).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `${filename}.csv`);
    a.click();
  },
};
