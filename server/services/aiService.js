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
- Do NOT sound robotic.
- Do NOT repeatedly promote SOLVIX or end every response with "Contact SOLVIX today!".

NATURAL CONVERSATION & CONTEXT UNDERSTANDING:
- Understand natural language, technical questions, business questions, general knowledge questions, follow-up questions, casual conversations, typos, and short context-dependent questions.
- Understand pronouns ("that", "it", "which one", "those") referring to topics discussed previously in the conversation history.

GENERAL QUESTIONS:
- Answer general questions (e.g. "What is CRM?", "What is ERP?", "What is SaaS?", "What is machine learning?") using general knowledge clearly and naturally.
- Do NOT force the conversation back to SOLVIX when the question is a general question.

SOLVIX-SPECIFIC QUESTIONS & FACTUAL STABILITY:
- Use ONLY verified information provided in this knowledge base for SOLVIX-specific queries.
- Headquarters: Coimbatore, Tamil Nadu, India.
- Founders & Leadership: Manjith (CEO & Founder), Subetha V (Founder & CTO), Sarwina M (Co-Founder & Technical Lead).
- Core Services: Website and Web Application Development, Mobile Applications (Android, iOS, Flutter/Dart), AI/ML Solutions, AI Automation, Custom CRM, ERP, UI/UX Design, API Integration, and Custom Business Software.
- Pricing Guidance (Base Starting Prices):
  * Website Development: Base starting at ₹12,000 – ₹25,000 (Corporate sites: ₹25,000 – ₹80,000)
  * E-Commerce Website: Base starting at ₹75,000
  * Mobile Apps (Android / iOS / Flutter): Base starting at ₹80,000
  * Custom CRM Solution: Base starting at ₹2,00,000
  * ERP Platform: Base starting at ₹4,50,000
  * AI Chatbot / Automation: Base starting at ₹75,000
- Always explain that final cost depends on project scope, features, integrations, and requirements.
- NEVER invent clients, testimonials, awards, partnerships, revenue, employee numbers, fake project names, certifications, services, prices, or guarantees.
- If specific information is unavailable, say: "I don't have that specific information available right now. You can contact the Solvix team for confirmation."

SALES & CLARIFICATION:
- When a customer shows genuine interest in a service, naturally guide them toward the next step without being pushy or aggressively asking for personal info.
- If a question is genuinely unclear (e.g., "I need software"), ask a short clarification question (e.g., "Sure. What kind of software are you looking for—CRM, ERP, website, mobile app, AI solution, or something else?").
`;

/**
 * Smart Knowledge Engine Fallback for offline or key-unconfigured environments
 */
function generateLocalKnowledgeResponse(message, context = {}) {
  const text = (message || "").trim();
  const query = text.toLowerCase();

  // 1. Casual Greetings & Customer Service Behavior
  if (query === "hi" || query === "hello" || query === "hey" || query.startsWith("hi ") || query.startsWith("hello ")) {
    return "Hi! 👋 How can I help you today?";
  }

  // 2. General Knowledge Definitions
  if (query.includes("what is crm") || query === "crm") {
    return "CRM stands for Customer Relationship Management. It is software used to manage customers, leads, sales, follow-ups, and communication in one place.";
  }
  if (query.includes("what is erp") || query === "erp") {
    return "ERP stands for Enterprise Resource Planning. It helps businesses manage areas such as finance, inventory, purchasing, employees, projects, and operations in one system.";
  }
  if (query.includes("what is saas") || query === "saas") {
    return "SaaS stands for Software as a Service. It is software that customers access online, usually through a subscription.";
  }
  if (query.includes("what is machine learning") || query.includes("what is ml")) {
    return "Machine learning is a branch of artificial intelligence where computers learn from data to identify patterns and make decisions without being explicitly programmed.";
  }
  if (query.includes("what is ai") || query === "ai") {
    return "Artificial Intelligence (AI) refers to computer systems designed to perform tasks that typically require human intelligence, such as understanding language, analyzing data, and making decisions.";
  }

  // 3. Customer Service Responses for Common Intents
  if (query.includes("need a website") || query.includes("want a website") || query.includes("build website")) {
    return "Sure. Solvix can help you build a website based on your business requirements. If you tell me what type of business you have and what you need the website to do, I can help you understand the suitable option.";
  }
  if (query.includes("need an app") || query.includes("need app") || query.includes("want an app") || query.includes("build app")) {
    return "Absolutely. Solvix can develop custom mobile applications. We can help with Android, iOS, or cross-platform solutions such as Flutter. Tell me what your app should do, and I can guide you.";
  }
  if (query.includes("can you build crm") || query.includes("build crm") || query.includes("need crm")) {
    return "Yes. Solvix can develop a custom CRM based on your business requirements, including leads, customers, sales, follow-ups, dashboards, and other features.";
  }

  // 4. Sales Conversation (e.g. E-Commerce for clothing business)
  if (query.includes("e-commerce") && (query.includes("clothing") || query.includes("store") || query.includes("shop") || query.includes("business"))) {
    return "That sounds great. Solvix can build a custom e-commerce website for your clothing business, including product management, customer accounts, cart, checkout, payment integration, and other required features. If you share a few details about your requirements, we can help you with a suitable quotation.";
  }

  // 5. Pricing Questions
  if (query.includes("e-commerce") && (query.includes("cost") || query.includes("price") || query.includes("how much") || query.includes("charge") || query.includes("pricing"))) {
    return "The current base price for an e-commerce website is ₹75,000. The final cost depends on features, integrations, design, payment gateway requirements, and overall project scope.";
  }
  if ((query.includes("crm") || query.includes("customer relationship")) && (query.includes("cost") || query.includes("price") || query.includes("how much") || query.includes("charge") || query.includes("pricing") || query === "crm cost" || query === "crm price")) {
    return "Our current base price for a CRM solution is ₹2,00,000. The final cost depends on the features, number of users, integrations, customization, and project requirements.";
  }
  if (query.includes("price") || query.includes("cost") || query.includes("budget") || query.includes("pricing") || query.includes("how much")) {
    return "Here is a quick overview of our starting base prices:\n\n• **Website Development:** Starting from ₹12,000 – ₹25,000\n• **E-Commerce Website:** Base starting at ₹75,000\n• **Mobile App (Android / iOS / Flutter):** Base starting at ₹80,000\n• **Custom CRM Solution:** Base starting at ₹2,00,000\n• **ERP Platform:** Base starting at ₹4,50,000\n\nThe final price depends on your specific project requirements and scope.";
  }

  // 6. SOLVIX Company Details
  if (query.includes("founder") || query.includes("ceo") || query.includes("cto") || query.includes("team") || query.includes("who owns") || query.includes("leadership") || query.includes("manjith") || query.includes("subetha") || query.includes("sarwina")) {
    return "The Solvix leadership team includes **Manjith** (CEO & Founder), **Subetha V** (Founder & CTO), and **Sarwina M** (Co-Founder & Technical Lead).";
  }
  if (query.includes("contact") || query.includes("phone") || query.includes("email") || query.includes("address") || query.includes("location") || query.includes("coimbatore") || query.includes("reach") || query.includes("whatsapp")) {
    return "Solvix is headquartered in **Coimbatore, Tamil Nadu, India**.\n\n• **Phone / WhatsApp:** +91 76394 10944 / +91 98940 88401\n• **Email:** sarwinamuralikrishnan@gmail.com | subetha076@gmail.com";
  }
  if (query.includes("service") || query.includes("what do you do") || query.includes("provide")) {
    return "Solvix provides website and web application development, mobile applications, AI/ML solutions, AI automation, CRM, ERP, UI/UX design, API integration, and other software solutions.";
  }

  // 7. Unclear Software Inquiry
  if (query === "i need software" || query === "software" || query === "need software") {
    return "Sure. What kind of software are you looking for—CRM, ERP, website, mobile app, AI solution, or something else?";
  }

  // Default Natural Response
  return "Solvix provides custom software development, including websites, mobile applications (Android, iOS, Flutter/Dart), AI solutions, CRM, and ERP systems. How can I help you today?";
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
