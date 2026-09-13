// SOLVIX AI Service - Official OpenAI Node.js SDK + Natural AI Assistant Engine
const { OpenAI } = require("openai");
const solvixKnowledge = require("../data/solvixKnowledge");

const SYSTEM_PROMPT = `
You are "SOLVIX AI", the official AI Assistant for SOLVIX Software Solutions (https://www.solvixsoftwaresolutions.com).

CORE BEHAVIOR & RESPONSE STYLE:
- Act like a real, professional AI assistant (similar to ChatGPT).
- Do NOT behave like a traditional FAQ chatbot. Do NOT limit responses to predefined questions or keywords.
- Answer the customer's actual question first.
- Every response must be: Professional, Simple, Clear, Natural, Friendly, Helpful, Concise, and Easy to understand.
- Do NOT use unnecessarily complicated technical terminology.
- Do NOT give extremely long answers unless the customer specifically asks for detailed information.
- Do NOT sound robotic or repeatedly promote SOLVIX.

RANDOM, INVALID & UNKNOWN INPUT HANDLING RULES:
1. COMPLETELY RANDOM / GIBBERISH TEXT (e.g. "setxrctuvhbjnl", "asdfghjkl", "xyz123abc", "qwertyuiop", "hdjskfhskdjfh", "123456789xyz"):
   - DO NOT invent a meaning or generate a fake answer.
   - Respond naturally and politely: "I’m not sure what you mean by \`[input]\`. Could you please rephrase your question?" (or "I’m not sure what you mean by that. Could you please rephrase your question?").

2. TYPOGRAPHICAL ERRORS (e.g. "What is Javascrpt?", "Tell me about machne lerning"):
   - If confidence is high, suggest the likely correction: "Do you mean JavaScript? If so, JavaScript is a programming language commonly used to make websites interactive."
   - Do NOT force an interpretation when text is ambiguous.

3. UNKNOWN TERMS / UNRECOGNIZED ENTITIES:
   - If the user provides a real-looking term or product name that you do not recognize with sufficient confidence, do NOT hallucinate.
   - Reply: "I’m not familiar with that term. Could you provide a little more context?"

4. RANDOM TEXT MIXED WITH A REAL QUESTION (e.g. "asdfgh what is CRM xyz123"):
   - Ignore the irrelevant random characters and answer the meaningful question directly.

5. EMPTY OR NEARLY EMPTY MESSAGES (e.g. ".", "...", "?", "???", "hi", "hello"):
   - Respond naturally without showing an error: "Hi! 👋 How can I help you today?"

6. ACCURACY > GUESSING:
   - NEVER create an answer just because the user entered something. If there is no reliable meaning, politely ask the user to rephrase. Never use harsh words like "Invalid input!" or "Error!".

GENERAL QUESTIONS & SOLVIX FACTS:
- For general non-SOLVIX questions (e.g. "What is CRM?", "What is SaaS?", "What is ERP?", "What is machine learning?"), answer clearly and naturally without forcing the conversation to SOLVIX.
- For SOLVIX-specific queries, use ONLY verified facts:
  * Headquarters: Coimbatore, Tamil Nadu, India.
  * Founders & Leadership: Manjith (CEO & Founder), Subetha V (Founder & CTO), Sarwina M (Co-Founder & Technical Lead).
  * Services: Web & Web App Development, Mobile Apps (Android, iOS, Flutter/Dart), AI/ML Solutions, AI Automation, Custom CRM, ERP, UI/UX Design, API Integration.
  * Starting Base Prices: Website Development starting ₹12,000–₹25,000 (Corporate: ₹25,000–₹80,000), E-Commerce starting ₹75,000, Custom CRM starting ₹2,00,000, ERP starting ₹4,50,000, Mobile Apps starting ₹80,000, AI Chatbots starting ₹75,000.
  * Explain that final cost depends on specific features, scope, and requirements.
  * NEVER invent clients, awards, testimonials, revenue, employee numbers, fake projects, or unsupported prices. If unavailable, say: "I don't have that specific information available right now. You can contact the Solvix team for confirmation."
`;

/**
 * Lightweight Gibberish Detector
 */
function isGibberish(str) {
  const text = (str || "").trim();
  if (text.length < 4) return false;

  // Multi-word keyboard mashes
  if (text.includes(" ")) {
    const words = text.split(/\s+/);
    let gibberishWordCount = 0;
    for (const word of words) {
      if (
        /^[bcdfghjklmnpqrstvwxyz]{5,}$/i.test(word) ||
        /^[qwertyuiop]{6,}$/i.test(word) ||
        /^[asdfghjkl]{6,}$/i.test(word) ||
        /^[zxcvbnm]{6,}$/i.test(word)
      ) {
        gibberishWordCount++;
      }
    }
    return gibberishWordCount > 0 && gibberishWordCount >= words.length / 2;
  }

  // Single word keyboard mashes
  if (/^[bcdfghjklmnpqrstvwxyz]{5,}$/i.test(text)) return true;
  if (/^[qwertyuiop]{6,}$/i.test(text)) return true;
  if (/^[asdfghjkl]{6,}$/i.test(text)) return true;
  if (/^[zxcvbnm]{6,}$/i.test(text)) return true;
  if (/^[a-z0-9]{10,}$/i.test(text) && !/[aeiou]/i.test(text)) return true;

  return false;
}

/**
 * Smart Knowledge Engine Fallback for offline or key-unconfigured environments
 */
function generateLocalKnowledgeResponse(message, context = {}) {
  const rawText = (message || "").trim();
  const query = rawText.toLowerCase();

  // Rule 5: Empty, punctuation, or simple greetings
  if (
    !rawText ||
    rawText === "." ||
    rawText === "..." ||
    rawText === "?" ||
    rawText === "???" ||
    query === "hi" ||
    query === "hello" ||
    query === "hey" ||
    query.startsWith("hi ") ||
    query.startsWith("hello ")
  ) {
    return "Hi! 👋 How can I help you today?";
  }

  // Rule 4: Mixed random text + meaningful question extraction
  let cleanQuery = query;
  if (query.includes("what is crm") || query.includes("crm")) {
    cleanQuery = "what is crm";
  } else if (query.includes("what is erp") || query.includes("erp")) {
    cleanQuery = "what is erp";
  } else if (query.includes("what is saas") || query.includes("saas")) {
    cleanQuery = "what is saas";
  } else if (query.includes("machine learning") || query.includes("machne lerning")) {
    cleanQuery = "what is machine learning";
  } else if (query.includes("javascrpt") || query.includes("javascript")) {
    cleanQuery = "javascrpt";
  }

  // Rule 1: Completely Random / Gibberish Text
  if (
    isGibberish(rawText) &&
    !query.includes("crm") &&
    !query.includes("erp") &&
    !query.includes("saas") &&
    !query.includes("website") &&
    !query.includes("app")
  ) {
    return `I’m not sure what you mean by \`${rawText}\`. Could you please rephrase your question?`;
  }

  // Rule 2: Typographical Errors
  if (cleanQuery.includes("javascrpt")) {
    return "Do you mean JavaScript? If so, JavaScript is a programming language commonly used to make websites interactive.";
  }
  if (query.includes("machne lerning") || query.includes("machin lerning")) {
    return "Do you mean machine learning? Machine learning is a branch of AI where systems learn patterns from data to make predictions or decisions.";
  }

  // Rule 3: General Knowledge Definitions
  if (cleanQuery.includes("what is crm")) {
    return "CRM stands for Customer Relationship Management. It is software used to manage customers, leads, sales, follow-ups, and communication in one place.";
  }
  if (cleanQuery.includes("what is erp")) {
    return "ERP stands for Enterprise Resource Planning. It helps businesses manage areas such as finance, inventory, purchasing, employees, projects, and operations in one system.";
  }
  if (cleanQuery.includes("what is saas")) {
    return "SaaS stands for Software as a Service. It is software that customers access online, usually through a subscription.";
  }
  if (cleanQuery.includes("what is machine learning")) {
    return "Machine learning is a branch of artificial intelligence where computers learn from data to identify patterns and make decisions without being explicitly programmed.";
  }
  if (query.includes("what is ai") || query === "ai") {
    return "Artificial Intelligence (AI) refers to computer systems designed to perform tasks that typically require human intelligence, such as understanding language, analyzing data, and making decisions.";
  }

  // Customer Service Intents
  if (query.includes("need a website") || query.includes("want a website") || query.includes("build website")) {
    return "Sure. Solvix can help you build a website based on your business requirements. If you tell me what type of business you have and what you need the website to do, I can help you understand the suitable option.";
  }
  if (query.includes("need an app") || query.includes("need app") || query.includes("want an app") || query.includes("build app")) {
    return "Absolutely. Solvix can develop custom mobile applications. We can help with Android, iOS, or cross-platform solutions such as Flutter. Tell me what your app should do, and I can guide you.";
  }
  if (query.includes("can you build crm") || query.includes("build crm") || query.includes("need crm")) {
    return "Yes. Solvix can develop a custom CRM based on your business requirements, including leads, customers, sales, follow-ups, dashboards, and other features.";
  }

  // Sales Conversation
  if (
    query.includes("e-commerce") &&
    (query.includes("clothing") || query.includes("store") || query.includes("shop") || query.includes("business"))
  ) {
    return "That sounds great. Solvix can build a custom e-commerce website for your clothing business, including product management, customer accounts, cart, checkout, payment integration, and other required features. If you share a few details about your requirements, we can help you with a suitable quotation.";
  }

  // Pricing Questions
  if (
    query.includes("e-commerce") &&
    (query.includes("cost") || query.includes("price") || query.includes("how much") || query.includes("charge") || query.includes("pricing"))
  ) {
    return "The current base price for an e-commerce website is ₹75,000. The final cost depends on features, integrations, design, payment gateway requirements, and overall project scope.";
  }
  if (
    (query.includes("crm") || query.includes("customer relationship")) &&
    (query.includes("cost") || query.includes("price") || query.includes("how much") || query.includes("charge") || query.includes("pricing") || query === "crm cost" || query === "crm price")
  ) {
    return "Our current base price for a CRM solution is ₹2,00,000. The final cost depends on the features, number of users, integrations, customization, and project requirements.";
  }
  if (query.includes("price") || query.includes("cost") || query.includes("budget") || query.includes("pricing") || query.includes("how much")) {
    return "Here is a quick overview of our starting base prices:\n\n• **Website Development:** Starting from ₹12,000 – ₹25,000\n• **E-Commerce Website:** Base starting at ₹75,000\n• **Mobile App (Android / iOS / Flutter):** Base starting at ₹80,000\n• **Custom CRM Solution:** Base starting at ₹2,00,000\n• **ERP Platform:** Base starting at ₹4,50,000\n\nThe final price depends on your specific project requirements and scope.";
  }

  // SOLVIX Facts
  if (
    query.includes("founder") ||
    query.includes("ceo") ||
    query.includes("cto") ||
    query.includes("team") ||
    query.includes("who owns") ||
    query.includes("leadership") ||
    query.includes("manjith") ||
    query.includes("subetha") ||
    query.includes("sarwina")
  ) {
    return "The Solvix leadership team includes **Manjith** (CEO & Founder), **Subetha V** (Founder & CTO), and **Sarwina M** (Co-Founder & Technical Lead).";
  }
  if (
    query.includes("contact") ||
    query.includes("phone") ||
    query.includes("email") ||
    query.includes("address") ||
    query.includes("location") ||
    query.includes("coimbatore") ||
    query.includes("reach") ||
    query.includes("whatsapp")
  ) {
    return "Solvix is headquartered in **Coimbatore, Tamil Nadu, India**.\n\n• **Phone / WhatsApp:** +91 76394 10944 / +91 98940 88401\n• **Email:** sarwinamuralikrishnan@gmail.com | subetha076@gmail.com";
  }
  if (query.includes("service") || query.includes("what do you do") || query.includes("provide")) {
    return "Solvix provides website and web application development, mobile applications, AI/ML solutions, AI automation, CRM, ERP, UI/UX design, API integration, and other software solutions.";
  }

  // Unclear Software Inquiry
  if (query === "i need software" || query === "software" || query === "need software") {
    return "Sure. What kind of software are you looking for—CRM, ERP, website, mobile app, AI solution, or something else?";
  }

  // Default Natural Response
  return "I’m not sure what you mean. Could you please rephrase your question?";
}

/**
 * Generate AI Chat Response using official OpenAI SDK or Smart Knowledge Fallback
 */
async function generateChatResponse(message, conversation = [], context = {}) {
  const apiKey = process.env.OPENAI_API_KEY;

  // If OpenAI API key is missing or unconfigured, use Smart Knowledge Engine
  if (!apiKey || apiKey.trim() === "" || apiKey === "your_openai_api_key_here") {
    console.log("[CHAT] Using SOLVIX Natural Knowledge Engine (Local Fallback)");
    const reply = generateLocalKnowledgeResponse(message, context);
    return {
      success: true,
      reply,
      conversationId: `conv-local-${Date.now()}`,
    };
  }

  try {
    const openai = new OpenAI({ apiKey });

    const formattedHistory = (conversation || [])
      .slice(-10)
      .map((msg) => ({
        role: msg.role === "user" || msg.sender === "user" ? "user" : "assistant",
        content: msg.content || msg.text || "",
      }))
      .filter((msg) => msg.content.trim() !== "");

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...formattedHistory,
      { role: "user", content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 600,
      temperature: 0.7,
    });

    const reply = completion.choices?.[0]?.message?.content || generateLocalKnowledgeResponse(message, context);

    return {
      success: true,
      reply,
      conversationId: `conv-${Date.now()}`,
    };
  } catch (error) {
    console.warn("[CHAT] OpenAI API error occurred, falling back to SOLVIX Knowledge Engine:", error.message);
    const reply = generateLocalKnowledgeResponse(message, context);
    return {
      success: true,
      reply,
      conversationId: `conv-fallback-${Date.now()}`,
    };
  }
}

module.exports = {
  generateChatResponse,
};
