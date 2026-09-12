import React, { useState } from 'react';
import { Search, Play, ShoppingCart, Check, Star, Sparkles, Filter, ShieldCheck } from 'lucide-react';

export default function Products({ onOpenDemo, onBuyProduct }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Enterprise ERP & Management',
    'Healthcare & Medical',
    'Mobile & On-Demand',
    'Education & Institutions',
    'Business & E-Commerce',
  ];

  const products = [
    {
      id: 'hospital-mgmt',
      title: 'Hospital Management System',
      category: 'Healthcare & Medical',
      price: '₹24,999 / $349',
      rating: 4.9,
      reviews: 48,
      badge: 'Bestseller',
      techStack: ['React', 'Node.js', 'MySQL', 'Express'],
      features: ['Patient EHR & Records', 'Doctor Scheduling & OPD', 'Pharmacy & Billing Module', 'ICU & Bed Tracking'],
      description: 'Full-fledged hospital administration suite for managing patients, appointments, electronic records, labs, and billing.',
      gradient: 'linear-gradient(135deg, #2563EB, #0284C7)',
    },
    {
      id: 'blood-donation',
      title: 'Blood Donation System',
      category: 'Healthcare & Medical',
      price: '₹14,999 / $199',
      rating: 4.8,
      reviews: 32,
      badge: 'High Impact',
      techStack: ['React', 'Firebase', 'Node.js', 'Tailwind'],
      features: ['Real-time Donor Match', 'Blood Bank Inventory', 'Emergency SMS Broadcast', 'Location GPS Radius'],
      description: 'Real-time blood bank inventory management and automated donor matching engine with emergency SMS alerts.',
      gradient: 'linear-gradient(135deg, #DC2626, #7C3AED)',
    },
    {
      id: 'food-delivery',
      title: 'Food Delivery Application',
      category: 'Mobile & On-Demand',
      price: '₹29,999 / $399',
      rating: 4.9,
      reviews: 64,
      badge: 'Hot Seller',
      techStack: ['Flutter', 'Node.js', 'MongoDB', 'Google Maps'],
      features: ['Customer, Rider & Merchant Apps', 'Live Order GPS Tracking', 'Razorpay & Stripe Gateway', 'Admin Master Suite'],
      description: 'Complete multi-app ecosystem for food ordering, live delivery driver tracking, restaurant management, and billing.',
      gradient: 'linear-gradient(135deg, #D97706, #DC2626)',
    },
    {
      id: 'hotel-mgmt',
      title: 'Hotel Management',
      category: 'Enterprise ERP & Management',
      price: '₹19,999 / $279',
      rating: 4.8,
      reviews: 41,
      badge: 'Top Rated',
      techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      features: ['Visual Room Booking Grid', 'Check-In / Out POS', 'Housekeeping Roster', 'Revenue & Tax Analytics'],
      description: 'Streamline hotel front-desk operations, online room reservations, guest billing, housekeeping, and revenue analytics.',
      gradient: 'linear-gradient(135deg, #059669, #0284C7)',
    },
    {
      id: 'school-erp',
      title: 'School ERP',
      category: 'Education & Institutions',
      price: '₹22,999 / $319',
      rating: 4.9,
      reviews: 53,
      badge: 'Featured',
      techStack: ['Flutter', 'Node.js', 'MongoDB', 'Firebase'],
      features: ['Parent Mobile App', 'Student Attendance & SMS', 'Online Fee Gateway', 'Transport Live GPS'],
      description: 'Comprehensive K-12 school administration platform with parent mobile app, transport GPS tracking, and fee collection.',
      gradient: 'linear-gradient(135deg, #2563EB, #7C3AED)',
    },
    {
      id: 'college-erp',
      title: 'College ERP',
      category: 'Education & Institutions',
      price: '₹34,999 / $479',
      rating: 5.0,
      reviews: 72,
      badge: 'Enterprise',
      techStack: ['Spring Boot', 'React', 'PostgreSQL', 'AWS'],
      features: ['Admissions & Semester Fees', 'Exams & Automated GPA', 'Faculty Payroll & Leave', 'LMS & Assignment Portal'],
      description: 'University and higher education enterprise management handling admissions, exams, fee engines, and faculty workflows.',
      gradient: 'linear-gradient(135deg, #7C3AED, #2563EB)',
    },
    {
      id: 'inventory-mgmt',
      title: 'Inventory Management',
      category: 'Enterprise ERP & Management',
      price: '₹18,999 / $259',
      rating: 4.9,
      reviews: 59,
      badge: 'Fast Seller',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Express'],
      features: ['Barcode / QR Label Print', 'Stock Alert & Auto Reorder', 'Multi-Warehouse Sync', 'Purchase Order Workflow'],
      description: 'Real-time inventory management, stock valuation, multi-warehouse sync, supplier tracking, and purchase orders.',
      gradient: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
    },
    {
      id: 'restaurant-billing',
      title: 'Restaurant Billing',
      category: 'Business & E-Commerce',
      price: '₹12,999 / $179',
      rating: 4.8,
      reviews: 38,
      badge: 'Popular',
      techStack: ['React', 'Electron', 'SQLite', 'Node.js'],
      features: ['Offline KOT Printing', 'Table Layout & Order Sync', 'GST & Thermal Billing', 'Inventory Ingredient Deduction'],
      description: 'Speedy POS restaurant billing system with Kitchen Order Ticket (KOT) printing, table management, and GST tax reports.',
      gradient: 'linear-gradient(135deg, #EA580C, #D97706)',
    },
    {
      id: 'emp-mgmt',
      title: 'Employee Management',
      category: 'Enterprise ERP & Management',
      price: '₹16,999 / $229',
      rating: 4.8,
      reviews: 46,
      badge: 'Essential',
      techStack: ['React', 'Spring Boot', 'MySQL', 'Docker'],
      features: ['Biometric Sync', 'Automated Payroll Slips', 'Leave Approval Hierarchy', 'Performance & KPIs'],
      description: 'Complete HR system for attendance sync, payroll processing, leave requests, performance tracking, and employee onboarding.',
      gradient: 'linear-gradient(135deg, #DB2777, #7C3AED)',
    },
    {
      id: 'library-mgmt',
      title: 'Library Management',
      category: 'Education & Institutions',
      price: '₹11,999 / $159',
      rating: 4.7,
      reviews: 29,
      badge: 'Smart Tool',
      techStack: ['Python', 'Flask', 'MySQL', 'Bootstrap'],
      features: ['Barcode Book Issue/Return', 'Fine Calculator', 'Digital E-Book PDF Portal', 'Member Card System'],
      description: 'Automate book cataloging, circulation, fines, and student library subscriptions with barcode scanner integration.',
      gradient: 'linear-gradient(135deg, #7C3AED, #2563EB)',
    },
    {
      id: 'attendance-mgmt',
      title: 'Attendance Management',
      category: 'Enterprise ERP & Management',
      price: '₹13,999 / $189',
      rating: 4.8,
      reviews: 35,
      badge: 'Reliable',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
      features: ['Geo-fencing Mobile Check-in', 'Shift & Overtime Manager', 'Export Excel/PDF Reports', 'Slack/WhatsApp Alerts'],
      description: 'Digital staff and student attendance software featuring location geofencing, shift scheduling, and automated timesheets.',
      gradient: 'linear-gradient(135deg, #0284C7, #2563EB)',
    },
    {
      id: 'face-recognition-att',
      title: 'Face Recognition Attendance',
      category: 'Enterprise ERP & Management',
      price: '₹24,999 / $349',
      rating: 4.9,
      reviews: 42,
      badge: 'AI Powered',
      techStack: ['Python', 'OpenCV', 'React', 'FastAPI'],
      features: ['Touchless AI Face Scan', 'Liveness Verification', 'Real-time Anti-Spoofing', 'Cloud Sync Logs'],
      description: 'AI-driven biometrics touchless attendance system using computer vision facial recognition and liveness detection.',
      gradient: 'linear-gradient(135deg, #7C3AED, #38BDF8)',
    },
    {
      id: 'appointment-booking',
      title: 'Appointment Booking',
      category: 'Business & E-Commerce',
      price: '₹12,999 / $179',
      rating: 4.8,
      reviews: 31,
      badge: 'Easy Setup',
      techStack: ['React', 'Next.js', 'Tailwind', 'Stripe'],
      features: ['Calendar Slot Sync', 'Google / Outlook Sync', 'Automated Email Reminders', 'Upfront Payment Booking'],
      description: 'Multi-vendor appointment scheduling portal for consultants, salons, clinics, and professional service providers.',
      gradient: 'linear-gradient(135deg, #2563EB, #059669)',
    },
    {
      id: 'pet-care-system',
      title: 'Pet Care System',
      category: 'Healthcare & Medical',
      price: '₹14,999 / $199',
      rating: 4.7,
      reviews: 26,
      badge: 'Unique',
      techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
      features: ['Vet Appointment Booking', 'Vaccination Schedule Tracker', 'Pet Boarding Calendar', 'Medical Records PDF'],
      description: 'Complete management software for veterinary clinics, pet grooming centers, pet hostels, and adoption registries.',
      gradient: 'linear-gradient(135deg, #10B981, #38BDF8)',
    },
    {
      id: 'ngo-management',
      title: 'NGO Management',
      category: 'Enterprise ERP & Management',
      price: '₹13,999 / $189',
      rating: 4.9,
      reviews: 37,
      badge: 'Community',
      techStack: ['React', 'Node.js', 'MySQL', 'Razorpay'],
      features: ['Donor 80G Tax Receipts', 'Volunteers Roster', 'Fundraising Campaign Analytics', 'Project Expense Tracking'],
      description: 'Non-profit management system for managing recurring donor contributions, volunteer matching, and tax-exempt receipts.',
      gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    },
    {
      id: 'clinic-management',
      title: 'Clinic Management',
      category: 'Healthcare & Medical',
      price: '₹17,999 / $249',
      rating: 4.8,
      reviews: 44,
      badge: 'High Demand',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Express'],
      features: ['Prescription E-Writer', 'Patient Token System', 'Lab Test Reports Generator', 'WhatsApp Appointment Reminders'],
      description: 'Lightweight doctor clinic software for fast electronic prescriptions, patient queues, billing, and lab records.',
      gradient: 'linear-gradient(135deg, #0284C7, #7C3AED)',
    },
    {
      id: 'pharmacy-mgmt',
      title: 'Pharmacy Management',
      category: 'Healthcare & Medical',
      price: '₹16,999 / $229',
      rating: 4.9,
      reviews: 39,
      badge: 'GST Ready',
      techStack: ['React', 'Node.js', 'MySQL', 'Tailwind'],
      features: ['Drug Expiry Date Alerts', 'Batch Number Stock Search', 'GST Invoice Generator', 'Supplier Purchase Register'],
      description: 'Retail and wholesale pharmacy billing software with automated medicine expiry tracking, batch control, and GST reports.',
      gradient: 'linear-gradient(135deg, #059669, #2563EB)',
    },
    {
      id: 'invoice-software',
      title: 'Invoice Software',
      category: 'Business & E-Commerce',
      price: '₹9,999 / $139',
      rating: 4.9,
      reviews: 58,
      badge: 'Bestseller',
      techStack: ['Next.js', 'React', 'Tailwind', 'PostgreSQL'],
      features: ['Multi-currency GST/VAT', 'PDF Invoice Generator', 'Recurring Billing & Reminders', 'Payment Gateway Integration'],
      description: 'Professional billing & invoicing platform for freelancers, agencies, and small businesses with custom templates.',
      gradient: 'linear-gradient(135deg, #2563EB, #38BDF8)',
    },
    {
      id: 'gym-management',
      title: 'Gym Management',
      category: 'Enterprise ERP & Management',
      price: '₹14,999 / $199',
      rating: 4.8,
      reviews: 47,
      badge: 'Popular',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
      features: ['Membership Renewal Alerts', 'Trainer Slot Booking', 'Locker & Access Control', 'Diet Plan Builder'],
      description: 'Fitness center & gym membership portal with biometric check-in, auto-renewal WhatsApp alerts, and diet plan creation.',
      gradient: 'linear-gradient(135deg, #DC2626, #EA580C)',
    },
    {
      id: 'vehicle-rental',
      title: 'Vehicle Rental System',
      category: 'Mobile & On-Demand',
      price: '₹21,999 / $299',
      rating: 4.8,
      reviews: 33,
      badge: 'Pro Grade',
      techStack: ['Flutter', 'Node.js', 'MongoDB', 'Google Maps'],
      features: ['Vehicle Fleet Availability', 'Hourly / Daily Rent Calculator', 'Security Deposit Escrow', 'Digital Agreement Sign'],
      description: 'Car, bike, and heavy vehicle rental booking engine with fleet GPS status, identity verification, and online payments.',
      gradient: 'linear-gradient(135deg, #4F46E5, #0284C7)',
    },
    {
      id: 'real-estate-mgmt',
      title: 'Real Estate Management',
      category: 'Business & E-Commerce',
      price: '₹24,999 / $349',
      rating: 4.9,
      reviews: 51,
      badge: 'Hot Seller',
      techStack: ['React', 'Next.js', 'Tailwind', 'MySQL'],
      features: ['360 Virtual Property Tour', 'Lead CRM & Agent Portal', 'Tenant Lease Agreements', 'Rent Collection Gateway'],
      description: 'Comprehensive property portal for real estate brokers, property managers, landlords, and tenant rent collection.',
      gradient: 'linear-gradient(135deg, #7C3AED, #2563EB)',
    },
    {
      id: 'tourism-website',
      title: 'Tourism Website',
      category: 'Business & E-Commerce',
      price: '₹15,999 / $219',
      rating: 4.8,
      reviews: 36,
      badge: 'Modern UI',
      techStack: ['React', 'Tailwind', 'Node.js', 'Razorpay'],
      features: ['Tour Package Customizer', 'Itinerary PDF Generator', 'Hotel & Transport Booking', 'Traveler Reviews Grid'],
      description: 'Stunning travel agency portal with custom itinerary planning, package booking, payment gateway, and multi-currency support.',
      gradient: 'linear-gradient(135deg, #0284C7, #10B981)',
    },
    {
      id: 'event-management',
      title: 'Event Management',
      category: 'Business & E-Commerce',
      price: '₹17,999 / $249',
      rating: 4.9,
      reviews: 40,
      badge: 'Trending',
      techStack: ['React', 'Node.js', 'MongoDB', 'QR Code'],
      features: ['Ticket Sales & QR Passes', 'Speaker & Agenda Roster', 'Venue Seating Chart', 'Live Check-in Scanner App'],
      description: 'All-in-one event ticketing, conference pass generation, live QR ticket scanner, and speaker scheduling engine.',
      gradient: 'linear-gradient(135deg, #DB2777, #7C3AED)',
    },
    {
      id: 'business-portfolio',
      title: 'Business Portfolio',
      category: 'Business & E-Commerce',
      price: '₹9,999 / $139',
      rating: 4.9,
      reviews: 62,
      badge: 'Starter',
      techStack: ['React', 'Tailwind', 'Framer Motion', 'Vite'],
      features: ['Ultra-fast Modern Design', 'Interactive Project Showcase', 'SEO Meta & Schema', 'WhatsApp Contact Lead Form'],
      description: 'High-converting corporate identity website tailored for agencies, startups, consultants, and enterprise services.',
      gradient: 'linear-gradient(135deg, #2563EB, #7C3AED)',
    },
    {
      id: 'ecommerce-platform',
      title: 'E-Commerce Platform',
      category: 'Business & E-Commerce',
      price: '₹27,999 / $379',
      rating: 5.0,
      reviews: 79,
      badge: 'Flagship',
      techStack: ['Next.js', 'React', 'Tailwind', 'Stripe'],
      features: ['Headless Fast Storefront', 'Inventory & Variant System', 'Flash Sale & Coupon Engine', 'Full Admin Control Panel'],
      description: 'Production-ready e-commerce platform with high conversion cart, discount coupon engine, tax billing, and live analytics.',
      gradient: 'linear-gradient(135deg, #7C3AED, #0284C7)',
    },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products" className="section-padding" style={{ position: 'relative', background: 'var(--bg-secondary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-pill">
            <span className="pulse-dot" />
            <span>25+ READY-MADE SOFTWARE MARKETPLACE</span>
          </div>
          <h2>
            Turnkey Software <span className="text-gradient">Ready to Launch</span>
          </h2>
          <p>
            Skip months of development risk. Purchase complete, production-grade source code, full documentation, and instant cloud deployment support.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '40px',
            background: 'var(--bg-card)',
            padding: '18px 24px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: activeCategory === cat ? '1px solid var(--color-secondary)' : '1px solid var(--border-color)',
                  background: activeCategory === cat ? 'var(--color-secondary)' : 'transparent',
                  color: activeCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: activeCategory === cat ? '700' : '500',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }}
            />
            <input
              type="text"
              placeholder="Search 25+ products or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 42px',
                background: 'var(--bg-main)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--text-primary)',
                fontSize: '0.88rem',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '28px',
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Header Gradient Preview Graphic */}
                <div
                  style={{
                    height: '160px',
                    background: product.gradient,
                    padding: '20px',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    overflow: 'hidden',
                  }}
                >
                  {/* Decorative background grid pattern */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                      opacity: 0.5,
                    }}
                  />

                  {/* Top Badges */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <span
                      style={{
                        background: 'rgba(11, 31, 77, 0.85)',
                        backdropFilter: 'blur(8px)',
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: '800',
                        color: '#FFFFFF',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      {product.badge}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(11, 31, 77, 0.85)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', color: '#FBBF24' }}>
                      <Star size={12} fill="#FBBF24" />
                      <span style={{ fontWeight: '800', color: '#FFF' }}>{product.rating}</span>
                      <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>({product.reviews})</span>
                    </div>
                  </div>

                  {/* Title Preview in Banner */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 700 }}>
                      {product.category}
                    </div>
                    <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', fontWeight: 800 }}>
                      {product.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content Body */}
                <div style={{ padding: '24px' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.55, marginBottom: '18px' }}>
                    {product.description}
                  </p>

                  {/* Tech Stack Badges */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    {product.techStack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          background: 'rgba(37, 99, 235, 0.08)',
                          border: '1px solid rgba(37, 99, 235, 0.2)',
                          color: 'var(--color-secondary)',
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Key Features List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                    {product.features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <Check size={14} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Footer Action */}
              <div
                style={{
                  padding: '18px 24px',
                  background: 'rgba(11, 31, 77, 0.02)',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>One-time License</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                    {product.price}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => onOpenDemo(product.title)}
                    className="btn-secondary btn-sm"
                    style={{ padding: '8px 14px', borderRadius: 'var(--radius-md)' }}
                    title="View Interactive Live Demo"
                  >
                    <Play size={14} style={{ color: 'var(--color-secondary)' }} />
                    <span>Demo</span>
                  </button>

                  <button
                    onClick={() => onBuyProduct(product)}
                    className="btn-primary btn-sm"
                    style={{ padding: '8px 14px', borderRadius: 'var(--radius-md)' }}
                  >
                    <ShoppingCart size={14} />
                    <span>Buy / Quote</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
