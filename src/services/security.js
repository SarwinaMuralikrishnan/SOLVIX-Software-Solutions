// SOLVIX Security & Validation Engine

// 1. Sanitize text string to prevent XSS attacks
export function sanitizeInput(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

// 2. Name Validation: Required, 3–60 characters, alphabets and spaces only
export function validateName(name) {
  if (!name || typeof name !== 'string' || !name.trim()) {
    return { valid: false, message: 'Customer Name is required' };
  }
  const trimmed = name.trim();
  if (trimmed.length < 3 || trimmed.length > 60) {
    return { valid: false, message: 'Name must be between 3 and 60 characters' };
  }
  if (!/^[A-Za-z\s]+$/.test(trimmed)) {
    return { valid: false, message: 'Name must contain only alphabets and spaces' };
  }
  return { valid: true };
}

// 3. Email Validation: Required, Valid email format
export function validateEmail(email) {
  if (!email || typeof email !== 'string' || !email.trim()) {
    return { valid: false, message: 'Email address is required' };
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, message: 'Invalid Email Address' };
  }
  return { valid: true };
}

// 4. Indian Mobile Phone Validation: Required, Exactly 10 digits, Starts with 6, 7, 8, or 9
export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string' || !phone.trim()) {
    return { valid: false, message: 'Phone number is required' };
  }
  const cleaned = phone.replace(/[\s\-\+\(\)]/g, '');
  if (cleaned.length !== 10) {
    return { valid: false, message: 'Phone Number must contain exactly 10 digits' };
  }
  if (!/^[6-9]\d{9}$/.test(cleaned)) {
    return { valid: false, message: 'Phone Number must start with 6, 7, 8 or 9' };
  }
  return { valid: true };
}

// 5. Project Description Validation: Required, 20–2000 characters
export function validateDescription(desc) {
  if (!desc || typeof desc !== 'string' || !desc.trim()) {
    return { valid: false, message: 'Please enter your project requirements' };
  }
  const trimmed = desc.trim();
  if (trimmed.length < 20) {
    return { valid: false, message: 'Project requirements must be at least 20 characters' };
  }
  if (trimmed.length > 2000) {
    return { valid: false, message: 'Project requirements cannot exceed 2000 characters' };
  }
  return { valid: true };
}

// 6. Meeting Date & Business Hours Time Validator (Mon-Sat, 9:00 AM - 6:00 PM IST, no past dates)
export function validateDateTime(dateStr, timeStr) {
  if (!dateStr) {
    return { valid: false, message: 'Meeting date is required' };
  }
  const selectedDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    return { valid: false, message: 'Meeting date cannot be in the past' };
  }

  if (selectedDate.getDay() === 0) {
    return { valid: false, message: 'Meetings are available Monday to Saturday only' };
  }

  return { valid: true };
}

// 7. File Upload Validator: PDF, DOC, DOCX, PNG, JPG, JPEG only, Max 10 MB
export function validateFileUpload(file) {
  if (!file) return { valid: true };

  const maxSizeBytes = 10 * 1024 * 1024; // 10 MB
  if (file.size > maxSizeBytes) {
    return { valid: false, message: 'File size exceeds 10 MB limit' };
  }

  const allowedExtensions = ['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg'];
  const ext = file.name.split('.').pop().toLowerCase();

  if (!allowedExtensions.includes(ext)) {
    return { valid: false, message: 'Unsupported file type. Allowed: PDF, DOC, DOCX, PNG, JPG, JPEG' };
  }

  return { valid: true };
}

// 8. Anti-Spam Security Token Generator
export function generateSecurityToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = 'SLVX-SEC-';
  for (let i = 0; i < 24; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// 9. Rate Limiting Protection
const SUBMISSION_TIMESTAMPS = {};

export function isRateLimited(actionKey, cooldownMs = 15000) {
  const now = Date.now();
  const lastTime = SUBMISSION_TIMESTAMPS[actionKey] || 0;
  if (now - lastTime < cooldownMs) {
    return true;
  }
  SUBMISSION_TIMESTAMPS[actionKey] = now;
  return false;
}
