// SOLVIX AI Service - Specialized SOLVIX Software Project Assistant Engine
const { OpenAI } = require("openai");
const solvixKnowledge = require("../data/solvixKnowledge");

const SYSTEM_PROMPT = `
You are "SOLVIX AI", the official AI Assistant for SOLVIX Software Solutions (https://www.solvixsoftwaresolutions.com).

PRIMARY SCOPE & PURPOSE:
- You are a specialized software project consultant for SOLVIX Software Solutions.
- Focus ONLY on SOLVIX services, custom software development, web & mobile applications, AI solutions, CRM/ERP systems, project scope, tech stack recommendations, real projects, and pricing.
- If a user asks unrelated non-SOLVIX general knowledge questions (e.g. "What is Python?", "Write an email", "Give me a recipe", "What is the weather?"), politely refocus the conversation to SOLVIX:
  "I am the SOLVIX AI Assistant, specialized in SOLVIX software services, custom web & mobile development, AI solutions, CRM/ERP, and project pricing. How can I help you with your software requirements today?"

VERIFIED SOLVIX FACTS & BASE PRICING:
- Company: SOLVIX Software Solutions based in Coimbatore, Tamil Nadu, India. Business hours: 9:00 AM – 6:00 PM IST (Mon–Sat).
- Services & Base Pricing:
  * Website Development (Business Website: ₹20,000 | Corporate Website: ₹40,000 | E-Commerce Website: ₹75,000 | Marketplace: ₹2,50,000)
  * Mobile App Development (Android App: ₹1,20,000 | iOS App: ₹1,50,000 | Flutter App: ₹2,00,000)
  * AI Solutions (AI Chatbot: ₹60,000 | AI Support: ₹1,20,000 | AI Automation: ₹2,00,000 | AI Document Processing: ₹2,50,000)
  * Business Systems (CRM Development: ₹2,00,000 | ERP Platform: ₹5,00,000)
  * UI/UX Design, API Development & Integration, Software Consulting, Maintenance & Support
- Featured Real Projects:
  * SimPill (Smart medication tracking and healthcare management system)
  * ZenMed (Comprehensive healthcare and clinic management platform)
  * Telemedicine Platform (Secure video consultation and digital prescription portal)
  * Petition Response Engine (Automated document analysis and legal petition response system)
- Pricing Note: Always state that final pricing depends on project scope, features, and requirements. Never invent unauthorized pricing, fake clients, revenue, or fake testimonials.

CONVERSATION & INPUT HANDLING:
- Context & Pronouns: Maintain context across turns within the current session. Resolve "how much?", "price evlo?", "can you build one?" using previous turn context.
- Tanglish / Informal Language: Support Indian English, Tamil keywords, and Tanglish (e.g. "CRM na enna?", "Enaku ecommerce website venum", "price evlo?", "website venum").
- Typos: Understand reasonable typos ("machne learning", "javscript", "ecomerce website", "chat bot") naturally.
- Gibberish: Meaningless text (e.g. "setxrctuvhbjnl", "4wredrfgbhjnkm2q3wsdtyjnkl'") -> "I'm not sure what you mean. Could you please rephrase your question?"
- Acknowledgment: Casual acknowledgments ("OKEYYYY", "ok", "thanks") -> "You're welcome! 😊 Let me know if you have any questions about SOLVIX services or pricing."
- Tone: Professional, simple, clear, natural, helpful. Avoid robotic disclaimers ("As an AI language model...").
`;

/**
 * Robust Gibberish Detector
 */
function isGibberish(str) {
  const raw = (str || "").trim();
  const text = raw.replace(/[^a-z0-9\s]/gi, "");
  if (text.length < 4) return false;

  const techTerms = ["crm", "erp", "saas", "website", "app", "solvix", "flutter", "react", "python", "ai", "ml", "api", "clothing"];
  const containsTech = techTerms.some(term => text.toLowerCase().includes(term));
  if (containsTech) return false;

  // Single word with mashed letters/numbers
  if (/^[a-z0-9]{8,}$/i.test(text) && !/(?:[aeiou]{2,}|the|what|how|where|when|which|who|can|will|you|your|our|this|that|with|for|have|need|want|build)/i.test(text)) return true;

  // Multi-word keyboard mashes
  if (text.includes(" ")) {
    const words = text.split(/\s+/);
    let gibberishWordCount = 0;
    for (const word of words) {
      if (
        /^[bcdfghjklmnpqrstvwxyz]{5,}$/i.test(word) ||
        /^[qwertyuiop]{6,}$/i.test(word) ||
        /^[asdfghjkl]{6,}$/i.test(word) ||
        /^[zxcvbnm]{6,}$/i.test(word) ||
        (/^[a-z0-9]{7,}$/i.test(word) && !/[aeiou]/i.test(word))
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
  if (/^[a-z0-9]{8,}$/i.test(text) && !/[aeiou]/i.test(text)) return true;

  return false;
}

/**
 * SOLVIX Focused Knowledge Engine (Handles SOLVIX services, pricing, projects, Tanglish, typos, gibberish & refocuses unrelated general questions)
 */
function generateLocalKnowledgeResponse(message, conversation = [], context = {}) {
  const rawText = (message || "").trim();
  const query = rawText.toLowerCase();

  // 1. Empty, punctuation, or simple greetings
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
    return "Hi! 👋 I'm the SOLVIX AI Assistant. I can help you with SOLVIX software services, web & app development, AI solutions, CRM, ERP, real projects, and pricing. How can I help you today?";
  }

  // 2. Casual acknowledgments & thanks (e.g. "OKEYYYY", "ok", "thanks")
  const ackTerms = ["ok", "okay", "okeyyyy", "okey", "got it", "understood", "sure", "thanks", "thank you", "great", "awesome", "cool", "perfect", "nice"];
  const cleanWord = query.replace(/[^a-z]/g, "");
  if (ackTerms.includes(query) || ackTerms.includes(cleanWord)) {
    return "You're welcome! 😊 Let me know if you have any questions about SOLVIX services or pricing.";
  }

  // 3. Gibberish check
  if (isGibberish(rawText)) {
    return `I'm not sure what you mean by \`${rawText}\`. Could you please rephrase your question?`;
  }

  // Extract last context topic from conversation history if available
  let lastTopic = "";
  if (Array.isArray(conversation) && conversation.length > 0) {
    const userAndAiMsgs = conversation.map(m => (m.content || m.text || "").toLowerCase()).join(" ");
    if (userAndAiMsgs.includes("crm")) lastTopic = "crm";
    else if (userAndAiMsgs.includes("erp")) lastTopic = "erp";
    else if (userAndAiMsgs.includes("e-commerce") || userAndAiMsgs.includes("ecommerce") || userAndAiMsgs.includes("clothing") || userAndAiMsgs.includes("website")) lastTopic = "ecommerce";
    else if (userAndAiMsgs.includes("flutter")) lastTopic = "flutter";
    else if (userAndAiMsgs.includes("app")) lastTopic = "app";
    else if (userAndAiMsgs.includes("chatbot") || userAndAiMsgs.includes("ai support")) lastTopic = "chatbot";
  }

  // 4. Pronoun / Follow-up resolution ("how much?", "price evlo?", "can you build one?", "how much is it?")
  const isPriceQuery = query.includes("how much") || query.includes("price") || query.includes("cost") || query.includes("evlo") || query.includes("charge");
  const isCanYouBuild = query.includes("can you build") || query.includes("can you make") || query.includes("can you develop") || query.includes("pannanum");
  const isWebsiteReq = query.includes("website") || query.includes("site");
  const isAppReq = query.includes("app") || query.includes("mobile");

  if (isPriceQuery && (query === "how much" || query === "how much?" || query.includes("price evlo") || query.includes("how much is it") || query === "price" || query === "cost")) {
    if (lastTopic === "crm") {
      return "Our current base price for CRM development is ₹2,00,000. Final pricing depends on project scope, features, and requirements.";
    } else if (lastTopic === "erp") {
      return "Our current base price for ERP development is ₹5,00,000. Final pricing depends on project scope, modules, and requirements.";
    } else if (lastTopic === "ecommerce") {
      return "The current base price for an E-Commerce website is ₹75,000, while a Marketplace starts at ₹2,50,000. Final cost depends on specific features and integrations.";
    } else if (lastTopic === "website") {
      return "Our base pricing for website development is: Business Website at ₹20,000 and Corporate Website at ₹40,000. Final pricing depends on project scope.";
    } else if (lastTopic === "app") {
      return "Our starting base prices for mobile app development are: Android App at ₹1,20,000, iOS App at ₹1,50,000, and Flutter App at ₹2,00,000.";
    } else if (lastTopic === "chatbot") {
      return "Our starting base price for an AI Chatbot is ₹60,000, and AI Customer Support System is ₹1,20,000.";
    }
  }

  if (isCanYouBuild && (query.includes("one") || query.includes("it") || query.includes("that"))) {
    if (lastTopic === "crm") {
      return "Yes. SOLVIX can develop a custom CRM based on your business requirements, including lead tracking, sales pipelines, customer management, and analytics dashboards.";
    } else if (lastTopic === "erp") {
      return "Yes. SOLVIX can build a full-scale ERP platform covering finance, inventory, HR, purchasing, and operations.";
    } else if (lastTopic === "website" || lastTopic === "ecommerce") {
      return "Yes. SOLVIX can develop custom websites and e-commerce platforms tailored to your business.";
    }
  }

  // Hospital CRM Multi-part query
  if (query.includes("hospital") && query.includes("crm")) {
    return "Yes, SOLVIX can build a custom CRM for a hospital. Recommended features include patient record management, appointment scheduling, doctor availability tracking, billing integration, and medical history access. Our starting base price for custom CRM development is ₹2,00,000, with final cost depending on specific requirements.";
  }

  // 5. Tanglish / Intent Matching
  // Clothing business context
  if (query.includes("clothing")) {
    return "A business or e-commerce website could be suitable for a clothing business. If you want customers to browse products, manage inventory, and place orders online, an e-commerce website is the ideal choice. SOLVIX base pricing for E-Commerce starts at ₹75,000.";
  }

  // CRM
  if (query.includes("crm")) {
    if (isPriceQuery) {
      return "Our current base price for CRM development is ₹2,00,000. Final pricing depends on project scope, features, and user seats.";
    }
    if (isCanYouBuild || query.includes("need crm") || query.includes("build crm") || query.includes("want crm")) {
      return "Yes. SOLVIX can develop a custom CRM tailored to your workflow, including lead tracking, customer communication, sales pipelines, and reporting dashboards.";
    }
    return "CRM stands for Customer Relationship Management. SOLVIX builds custom CRM software to manage customers, leads, sales pipelines, follow-ups, and business communication in one place. Starting base price is ₹2,00,000.";
  }

  // ERP
  if (query.includes("erp")) {
    if (isPriceQuery) {
      return "Our current base price for an ERP system is ₹5,00,000. Final cost depends on modules, user roles, and customization requirements.";
    }
    return "ERP stands for Enterprise Resource Planning. SOLVIX develops custom ERP systems to help businesses manage finance, inventory, purchasing, HR, and operations in one unified system. Starting base price is ₹5,00,000.";
  }

  // SaaS Solutions
  if (query.includes("saas")) {
    return "SOLVIX builds custom SaaS (Software as a Service) web applications with multi-tenant architecture, user subscription management, and payment gateway integrations.";
  }

  // Machine Learning / AI Solutions
  if ((query.includes("machine learning") || query.includes("machne lerning") || query.includes("machin lerning") || query.includes("machne") || query.includes("ai chatbot") || query.includes("ai support") || query.includes("ai automation") || query === "ai") && !query.includes("email")) {
    if (isPriceQuery) {
      return "Here is our base pricing for AI Solutions:\n• **AI Chatbot:** ₹60,000\n• **AI Customer Support:** ₹1,20,000\n• **AI Automation:** ₹2,00,000\n• **AI Document Processing:** ₹2,50,000";
    }
    return "SOLVIX provides custom AI & Machine Learning solutions including AI Chatbots (₹60,000), AI Support Systems (₹1,20,000), AI Automation Workflows (₹2,00,000), and AI Document Processing (₹2,50,000).";
  }

  // E-Commerce
  if (query.includes("e-commerce") || query.includes("ecommerce") || query.includes("ecomerce")) {
    if (isPriceQuery) {
      return "Our base pricing for an E-Commerce Website is ₹75,000, while a Multi-Vendor Marketplace starts at ₹2,50,000. Final pricing depends on project scope, payment integrations, and design complexity.";
    }
    return "SOLVIX provides custom E-Commerce web development with secure payment gateways, cart management, inventory tracking, customer accounts, and order dashboards. Base price starts at ₹75,000.";
  }

  // General Website Queries
  if (isWebsiteReq) {
    if (query.includes("business")) return "Our base price for a Business Website is ₹20,000. It includes responsive design, CMS, and contact integration.";
    if (query.includes("corporate")) return "Our base price for a Corporate Website is ₹40,000. It includes custom enterprise layouts and CMS integration.";
    if (isPriceQuery) {
      return "Here is our base pricing for Website Development:\n• **Business Website:** ₹20,000\n• **Corporate Website:** ₹40,000\n• **E-Commerce Website:** ₹75,000\n• **Marketplace:** ₹2,50,000\n\nFinal cost depends on your exact project requirements.";
    }
    return "SOLVIX builds responsive, fast websites tailored to your business requirements. We offer Business Websites (from ₹20,000), Corporate Websites (from ₹40,000), and E-Commerce Websites (from ₹75,000). What type of website are you looking for?";
  }

  // Mobile App Queries
  if (isAppReq) {
    if (isPriceQuery) {
      return "Here is our base pricing for Mobile App Development:\n• **Android App:** ₹1,20,000\n• **iOS App:** ₹1,50,000\n• **Flutter App (Android + iOS):** ₹2,00,000\n\nFinal pricing depends on app features and backend requirements.";
    }
    if (query.includes("flutter")) return "SOLVIX develops cross-platform Flutter mobile applications for both Android & iOS. Starting base price is ₹2,00,000.";
    if (query.includes("android")) return "Our starting base price for a native Android application is ₹1,20,000.";
    if (query.includes("ios")) return "Our starting base price for a native iOS application is ₹1,50,000.";
    return "SOLVIX develops native Android/iOS and cross-platform Flutter mobile apps. Starting prices: Android (₹1,20,000), iOS (₹1,50,000), Flutter (₹2,00,000). What features do you need in your app?";
  }

  // Real Projects Inquiry
  if (query.includes("project") || query.includes("portfolio") || query.includes("work") || query.includes("simpill") || query.includes("zenmed")) {
    return "Here are some of SOLVIX's featured real projects:\n\n• **SimPill:** Smart medication tracking and healthcare management system.\n• **ZenMed:** Comprehensive healthcare and clinic management platform.\n• **Telemedicine Platform:** Secure video consultation and digital prescription portal.\n• **Petition Response Engine:** Automated document analysis and legal petition response system.";
  }

  // SOLVIX Details & Hours
  if (query.includes("solvix") || query.includes("company") || query.includes("about") || query.includes("location") || query.includes("address") || query.includes("coimbatore") || query.includes("hours")) {
    return "SOLVIX Software Solutions is a software services startup based in Coimbatore, Tamil Nadu, India.\n\n• **Business Hours:** 9:00 AM – 6:00 PM IST (Mon–Sat)\n• **Services:** Web & App Development, AI/ML Solutions, AI Chatbots, Custom CRM, ERP, API Integration, Software Consulting, UI/UX Design.\n• **Location:** Coimbatore, Tamil Nadu, India";
  }

  // Refocus non-SOLVIX general queries (e.g. "What is Python?", "Write an email", "Weather in Tokyo")
  return "I am the SOLVIX AI Assistant, specialized in SOLVIX software services, custom web & mobile development, AI solutions, CRM/ERP, and project pricing. How can I help you with your software requirements today?";
}

/**
 * Generate AI Chat Response using configured LLM provider or Focused SOLVIX Knowledge Engine
 */
async function generateChatResponse(message, conversation = [], context = {}) {
  const apiKey = process.env.LLM_API_KEY || process.env.OPENAI_API_KEY;
  const model = process.env.LLM_MODEL || "gpt-4o-mini";
  const baseURL = process.env.LLM_BASE_URL || undefined;

  // Check if API key is valid
  if (!apiKey || apiKey.trim() === "" || apiKey === "your_openai_api_key_here") {
    console.log("[CHAT] Using SOLVIX Focused Knowledge Engine");
    const reply = generateLocalKnowledgeResponse(message, conversation, context);
    return {
      success: true,
      reply,
      conversationId: `conv-local-${Date.now()}`,
    };
  }

  try {
    const openaiOptions = { apiKey: apiKey.trim() };
    if (baseURL && baseURL.trim() !== "") {
      openaiOptions.baseURL = baseURL.trim();
    }

    const openai = new OpenAI(openaiOptions);

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
      model,
      messages,
      max_tokens: 700,
      temperature: 0.7,
    });

    const reply = completion.choices?.[0]?.message?.content || generateLocalKnowledgeResponse(message, conversation, context);

    return {
      success: true,
      reply,
      conversationId: `conv-${Date.now()}`,
    };
  } catch (error) {
    console.warn("[CHAT] LLM API error occurred, falling back to local engine:", error.message);
    const reply = generateLocalKnowledgeResponse(message, conversation, context);
    return {
      success: true,
      reply,
      conversationId: `conv-fallback-${Date.now()}`,
    };
  }
}

module.exports = {
  generateChatResponse,
  generateLocalKnowledgeResponse,
};
