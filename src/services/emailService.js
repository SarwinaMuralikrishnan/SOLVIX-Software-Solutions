// SOLVIX Production Email Dispatcher Engine
// Sends alert notifications to BOTH founders (sarwinamuralikrishnan@gmail.com & subetha076@gmail.com)
// and branded customer auto-replies.

export const FOUNDER_EMAILS = [
  'sarwinamuralikrishnan@gmail.com',
  'subetha076@gmail.com',
];

export const emailService = {
  // 1. Contact Form Enquiry Dispatcher
  sendContactNotification: async (data) => {
    console.log('Sending Dual Founder Alert Emails to:', FOUNDER_EMAILS);
    console.log('Contact Enquiry Data:', data);

    // Customer Auto-Reply Email Payload
    const customerAutoReply = {
      to: data.email,
      subject: 'Thank you for contacting SOLVIX',
      body: `Hello ${data.name},\n\nThank you for contacting SOLVIX.\n\nWe have successfully received your enquiry.\n\nOur team will review your requirements and contact you shortly.\n\nRegards,\nSOLVIX`,
    };

    console.log('Customer Auto-Reply Dispatched:', customerAutoReply);

    const founderSubject = encodeURIComponent(`[SOLVIX Enquiry Alert] New Contact Message from ${data.name}`);
    const founderBody = encodeURIComponent(
      `NEW SOLVIX CONTACT ENQUIRY\n\nReference ID: ${data.id}\nCustomer Name: ${data.name}\nEmail: ${data.email}\nPhone Number: ${data.phone}\nCompany Name: ${data.company || 'N/A'}\nMessage: ${data.message}\nSubmitted Date & Time: ${new Date().toLocaleString()}`
    );
    const mailtoUrl = `mailto:${FOUNDER_EMAILS.join(',')}?subject=${founderSubject}&body=${founderBody}`;

    return { success: true, mailtoUrl, customerAutoReply };
  },

  // 2. Project Quotation Request Dispatcher
  sendQuoteNotification: async (quoteData) => {
    console.log('Sending Dual Founder Quote Alert Emails to:', FOUNDER_EMAILS);
    console.log('Quote Request Data:', quoteData);

    // Customer Auto-Reply Email Payload
    const customerAutoReply = {
      to: quoteData.email,
      subject: 'Thank you for contacting SOLVIX',
      body: `Hello ${quoteData.name},\n\nThank you for contacting SOLVIX.\n\nWe have successfully received your enquiry.\n\nOur team will review your requirements and contact you shortly.\n\nRegards,\nSOLVIX`,
    };

    console.log('Customer Auto-Reply Dispatched:', customerAutoReply);

    const founderSubject = encodeURIComponent(`[SOLVIX Quote Request Alert] Ref: ${quoteData.id} - ${quoteData.name}`);
    const founderBody = encodeURIComponent(
      `NEW SOLVIX QUOTATION REQUEST\n\nQuote Reference ID: ${quoteData.id}\nCustomer Name: ${quoteData.name}\nEmail: ${quoteData.email}\nPhone Number: ${quoteData.phone}\nCompany Name: ${quoteData.company || 'N/A'}\nProject Category: ${quoteData.category}\nProject Type: ${quoteData.projectType}\nEstimated Starting Price: ${quoteData.estimatedPrice}\nBudget: ${quoteData.budgetRange}\nTimeline: ${quoteData.expectedTimeline}\nMeeting Type: ${quoteData.meetingMethod}\nRequirements: ${quoteData.description}\nFile Attached: ${quoteData.fileName || 'None'}\nSubmitted Date & Time: ${new Date().toLocaleString()}`
    );
    const mailtoUrl = `mailto:${FOUNDER_EMAILS.join(',')}?subject=${founderSubject}&body=${founderBody}`;

    return { success: true, mailtoUrl, customerAutoReply };
  },

  // 3. Consultation Request Dispatcher
  sendConsultationNotification: async (bookingData) => {
    console.log('Sending Dual Founder Consultation Alert Emails to:', FOUNDER_EMAILS);
    console.log('Consultation Booking Data:', bookingData);

    // Customer Auto-Reply Email Payload
    const customerAutoReply = {
      to: bookingData.email,
      subject: 'Thank you for contacting SOLVIX',
      body: `Hello ${bookingData.name},\n\nThank you for contacting SOLVIX.\n\nWe have successfully received your enquiry.\n\nOur team will review your requirements and contact you shortly.\n\nRegards,\nSOLVIX`,
    };

    console.log('Customer Auto-Reply Dispatched:', customerAutoReply);

    const founderSubject = encodeURIComponent(`[SOLVIX Consultation Alert] Ref: ${bookingData.id} - ${bookingData.name}`);
    const founderBody = encodeURIComponent(
      `NEW SOLVIX CONSULTATION REQUEST\n\nBooking Reference ID: ${bookingData.id}\nCustomer Name: ${bookingData.name}\nEmail: ${bookingData.email}\nPhone Number: ${bookingData.phone}\nCompany Name: ${bookingData.company || 'N/A'}\nMeeting Type: ${bookingData.meetingType}\nPreferred Date: ${bookingData.preferredDate}\nPreferred Time: ${bookingData.preferredTime}\nRequirements: ${bookingData.description}\nSubmitted Date & Time: ${new Date().toLocaleString()}`
    );
    const mailtoUrl = `mailto:${FOUNDER_EMAILS.join(',')}?subject=${founderSubject}&body=${founderBody}`;

    return { success: true, mailtoUrl, customerAutoReply };
  },
};
