// SOLVIX Software Solutions Centralized Knowledge Base

const solvixKnowledge = {
  company: {
    name: "SOLVIX Software Solutions",
    tagline: "Build. Innovate. Scale.",
    mission: "Empowering businesses with modern, scalable, and cutting-edge software solutions.",
    headquarters: "Coimbatore, Tamil Nadu, India",
    founders: [
      { name: "Sarwina M", role: "Co-Founder & CEO / Technical Lead", email: "sarwinamuralikrishnan@gmail.com" },
      { name: "Subetha V", role: "Co-Founder & CTO / Solutions Architect", email: "subetha076@gmail.com" },
    ],
    contact: {
      phone: "+91 98765 43210",
      email: "sarwinamuralikrishnan@gmail.com",
      altEmail: "subetha076@gmail.com",
      hours: "Monday – Saturday: 9:00 AM – 7:00 PM IST",
      support: "24/7 Priority Emergency Support Available",
    },
    website: "https://www.solvixsoftwaresolutions.com",
  },

  // Official Real SOLVIX Projects (DO NOT invent others)
  realProjects: [
    {
      name: "SimPill",
      category: "Healthcare / Computer Vision",
      description: "Pill recognition and medication tracking application using computer vision and advanced software development.",
      techStack: ["Python", "OpenCV", "Computer Vision", "React", "Node.js"]
    },
    {
      name: "ZenMed",
      category: "Healthcare / AI Assistant",
      description: "Comprehensive diabetes assistant and healthcare portal.",
      techStack: ["Flask", "SQLite", "MediaPipe/OpenCV", "Python", "HTML5/CSS3"]
    },
    {
      name: "Telemedicine Platform",
      category: "Healthcare Software",
      description: "Healthcare-oriented digital consultation and patient record platform.",
      techStack: ["React", "Node.js", "Express", "Supabase", "WebRTC"]
    },
    {
      name: "Petition Response Engine",
      category: "AI / NLP Solution",
      description: "AI/NLP based petition processing system featuring automated classification, urgency analysis, duplicate detection, intelligent routing, and analytics dashboard.",
      techStack: ["Python", "NLP", "OpenAI API", "React", "FastAPI/Flask"]
    }
  ],

  services: [
    {
      category: "Web Development",
      description: "Responsive, ultra-fast websites, web applications, and landing pages tailored for business growth.",
      items: [
        { name: "Landing Page", range: "₹12,000 – ₹18,000", timeline: "1–2 Weeks", desc: "High-converting single page website with contact form." },
        { name: "Portfolio Website", range: "₹18,000 – ₹25,000", timeline: "1–2 Weeks", desc: "Professional showcase website for individuals & agencies." },
        { name: "Business Website", range: "₹25,000 – ₹45,000", timeline: "2–3 Weeks", desc: "Multi-page corporate website with CMS and enquiry integration." },
        { name: "Corporate Website", range: "₹45,000 – ₹80,000", timeline: "3–4 Weeks", desc: "Advanced enterprise web portal with custom features." },
        { name: "E-Commerce Website", range: "₹80,000 – ₹1,50,000", timeline: "4–6 Weeks", desc: "Full online store with payment gateway, order tracking, admin dashboard." },
        { name: "Multi-Vendor Marketplace", range: "₹2,50,000+", timeline: "8–12 Weeks", desc: "Scalable marketplace connecting buyers and multiple sellers." },
      ],
    },
    {
      category: "Mobile App Development",
      description: "Native and cross-platform iOS & Android mobile applications built for high performance.",
      items: [
        { name: "Android App", range: "₹80,000 – ₹1,20,000", timeline: "4–6 Weeks", desc: "Native Android application published on Google Play Store." },
        { name: "iOS App", range: "₹1,00,000 – ₹1,50,000", timeline: "4–6 Weeks", desc: "Native iOS app published on Apple App Store." },
        { name: "Flutter App (Android + iOS)", range: "₹1,50,000 – ₹2,50,000", timeline: "6–8 Weeks", desc: "Cross-platform app running seamlessly on both Android & iOS." },
      ],
    },
    {
      category: "AI Solutions",
      description: "Custom AI model integration, intelligent chatbots, customer support automation, and document extraction.",
      items: [
        { name: "AI Chatbot", range: "₹75,000 – ₹1,20,000", timeline: "2–4 Weeks", desc: "Intelligent customer service & lead generation AI assistant." },
        { name: "AI Customer Support System", range: "₹1,50,000 – ₹2,50,000", timeline: "4–6 Weeks", desc: "Automated ticket handling, rag knowledge search, multi-channel support." },
        { name: "AI Automation Workflow", range: "₹2,00,000 – ₹3,50,000", timeline: "6–8 Weeks", desc: "Automated document OCR, data pipeline, and AI-driven reporting." },
        { name: "AI Document Processing", range: "₹2,50,000+", timeline: "6–10 Weeks", desc: "Extract structured analytics from unstructured PDFs, invoices, and contracts." },
      ],
    },
    {
      category: "Business Software",
      description: "Custom CRM, ERP, inventory management, HR portal, and business workflow software.",
      items: [
        { name: "CRM Software", range: "₹1,80,000 – ₹3,00,000", timeline: "6–8 Weeks", desc: "Customer relationship management system with lead tracking & pipeline." },
        { name: "ERP Platform", range: "₹4,50,000+", timeline: "10–14 Weeks", desc: "Enterprise resource planning suite covering finance, HR, inventory, operations." },
        { name: "Inventory Management", range: "₹1,20,000 – ₹2,00,000", timeline: "4–6 Weeks", desc: "Real-time stock tracking, purchase orders, barcode scanning." },
        { name: "HR & Payroll System", range: "₹1,75,000 – ₹2,80,000", timeline: "6–8 Weeks", desc: "Employee attendance, leave management, automated payroll processing." },
      ],
    },
  ],

  technologies: {
    frontend: ["React.js", "Vite", "Tailwind CSS", "Framer Motion", "TypeScript", "HTML5/CSS3"],
    backend: ["Node.js", "Express.js", "Python", "Flask", "RESTful APIs"],
    mobile: ["Flutter", "React Native", "Android (Java/Kotlin)", "iOS (Swift)"],
    database: ["Supabase", "PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis"],
    ai_ml: ["OpenAI API", "LangChain", "Python OpenCV / MediaPipe", "PyTorch", "NLP"],
    cloud: ["AWS", "Vercel", "Render", "Docker", "Nginx", "Git / GitHub"],
  },

  process: [
    { step: 1, name: "IDEA & DISCOVERY", desc: "Understand business goals, target audience, technical scope, and project feasibility." },
    { step: 2, name: "REQUIREMENT PLANNING", desc: "Wireframing, architecture blueprinting, tech stack selection, and milestone scheduling." },
    { step: 3, name: "DESIGN & UI/UX", desc: "Crafting intuitive, responsive prototype designs aligned with your brand identity." },
    { step: 4, name: "AGILE DEVELOPMENT", desc: "Clean modular code development with weekly client sprint reviews and progress demos." },
    { step: 5, name: "TESTING & QA", desc: "Rigorous security audits, load testing, cross-browser compatibility, and bug fixing." },
    { step: 6, name: "DEPLOYMENT & LAUNCH", desc: "Production launch, domain setup, SSL security, admin training, and 3 months free support." },
  ]
};

module.exports = solvixKnowledge;
