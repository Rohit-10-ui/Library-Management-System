import React, { useState, useEffect, useRef } from 'react';

// SVG Icon Components
const BookIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BooksIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 8h2M2 12h2M2 16h2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const SearchIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2"/>
    <path d="M21 21l-4.35-4.35" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const UsersIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ChartIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 20V10M12 20V4M6 20v-6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const BellIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ClockIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CheckCircleIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const QrCodeIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="8" height="8" stroke={color} strokeWidth="2"/>
    <rect x="13" y="3" width="8" height="8" stroke={color} strokeWidth="2"/>
    <rect x="3" y="13" width="8" height="8" stroke={color} strokeWidth="2"/>
    <path d="M13 13h2v2h-2zM17 13h2v2h-2zM13 17h2v2h-2zM17 17h2v2h-2z" fill={color}/>
  </svg>
);

const BrainIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 1 0-2.526 5.77 4 4 0 1 0 .556 6.588A4 4 0 1 0 12 18Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 1 1 2.526 5.77 4 4 0 1 1-.556 6.588A4 4 0 1 1 12 18Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 12a3 3 0 0 0-6 0" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CloudIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UserIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2"/>
  </svg>
);

const ShieldIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GitHubIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const MailIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke={color} strokeWidth="2"/>
    <path d="M3 7l9 6 9-6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CodeIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DatabaseIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="5" rx="9" ry="3" stroke={color} strokeWidth="2"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" stroke={color} strokeWidth="2"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" stroke={color} strokeWidth="2"/>
  </svg>
);

const TrendingUpIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 6l-9.5 9.5-5-5L1 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 6h6v6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ZapIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LayoutIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2"/>
    <path d="M3 9h18M9 21V9" stroke={color} strokeWidth="2"/>
  </svg>
);

const Landing = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [activeNav, setActiveNav] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setVisibleSections(prev => new Set([...prev, index]));
        }
      });
    }, observerOptions);

    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveNav(id);
    }
  };

  const keyFeatures = [
    { icon: SearchIcon, title: 'Smart Book Search', description: 'Advanced search with filters, categories, and instant results' },
    { icon: CheckCircleIcon, title: 'Availability Status', description: 'Real-time book availability tracking with reservation system' },
    { icon: ClockIcon, title: 'Borrow & Return', description: 'Seamless checkout process with automated return tracking' },
    { icon: BellIcon, title: 'Due Date & Fines', description: 'Automatic fine calculation with payment gateway integration' },
    { icon: BellIcon, title: 'Smart Notifications', description: 'Email and SMS reminders for due dates and new arrivals' },
    { icon: ChartIcon, title: 'Analytics Dashboard', description: 'Comprehensive reports and insights on library usage' }
  ];

  const advancedFeatures = [
    { icon: QrCodeIcon, title: 'QR & RFID Support', description: 'Quick book identification and checkout using modern technology' },
    { icon: BrainIcon, title: 'AI Recommendations', description: 'Personalized book suggestions based on reading history' },
    { icon: ChartIcon, title: 'Analytics & Reports', description: 'Detailed insights on circulation, popular books, and trends' },
    { icon: CloudIcon, title: 'Cloud-Based System', description: 'Access from anywhere with automatic backups and security' }
  ];

  const benefits = [
    { icon: ZapIcon, title: 'Saves Time', description: 'Automate routine tasks and reduce processing time by 70%' },
    { icon: TrendingUpIcon, title: 'Reduces Manual Work', description: 'Eliminate paperwork with digital record-keeping' },
    { icon: CheckCircleIcon, title: 'Improves Accuracy', description: 'Minimize errors with automated validation and tracking' },
    { icon: LayoutIcon, title: 'Easy Management', description: 'Intuitive interface for effortless library operations' }
  ];

  const techStack = [
    { category: 'Frontend', items: ['React.js', ' CSS', 'Redux'], icon: CodeIcon },
    { category: 'Backend', items: ['SpringBoot', 'Java', 'JWT Auth'], icon: CodeIcon },
    { category: 'Database', items: ['MySQL'], icon: DatabaseIcon }
  ];

  const howItWorks = [
    { step: '1', title: 'Register / Login', description: 'Create your account or sign in securely', icon: UserIcon },
    { step: '2', title: 'Search Book', description: 'Find books using smart search and filters', icon: SearchIcon },
    { step: '3', title: 'Issue / Return', description: 'Borrow books with one click or return them easily', icon: BookIcon },
    { step: '4', title: 'Track Status', description: 'Monitor your borrowing history and due dates', icon: ClockIcon }
  ];

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.backgroundShapes}>
        <div className="floating-shape shape-1" style={styles.floatingShape1}></div>
        <div className="floating-shape shape-2" style={styles.floatingShape2}></div>
        <div className="floating-shape shape-3" style={styles.floatingShape3}></div>
      </div>

      {/* Navigation */}
      <nav style={{...styles.nav, ...(scrolled ? styles.navScrolled : {})}}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <BooksIcon size={36} color="#FF9B7A" />
          </div>
          <span>LibraryHub</span>
        </div>
        <ul style={styles.navLinks}>
          <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} style={{...styles.navLink, ...(activeNav === 'home' ? styles.navLinkActive : {})}}>Home</a></li>
          <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }} style={{...styles.navLink, ...(activeNav === 'features' ? styles.navLinkActive : {})}}>Features</a></li>
          <li><a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }} style={{...styles.navLink, ...(activeNav === 'how-it-works' ? styles.navLinkActive : {})}}>How It Works</a></li>
          <li><a href="#tech" onClick={(e) => { e.preventDefault(); scrollToSection('tech'); }} style={{...styles.navLink, ...(activeNav === 'tech' ? styles.navLinkActive : {})}}>Technology</a></li>
        </ul>
        <div style={styles.navButtons}>
          <button style={styles.btnLogin} onClick={() => window.location.href = '/login'}>Login</button>
          <button style={styles.btnRegister} onClick={() => window.location.href = '/register'}>Register</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" style={styles.hero}>
        <div style={styles.heroContent}>
          <div className="hero-badge" style={styles.heroBadge}>
            <ZapIcon size={16} color="#FF9B7A" />
            <span style={{ marginLeft: '8px' }}>Smart Library Management System</span>
          </div>
          <h1 className="hero-title" style={styles.heroTitle}>
            Revolutionize Your Library with{' '}
            <span style={styles.heroTitleGradient}>Intelligent Automation</span>
          </h1>
          <p className="hero-description" style={styles.heroDescription}>
            Streamline book management, enhance user experience, and unlock powerful insights with our comprehensive library management solution.
          </p>
          <div className="hero-buttons" style={styles.heroButtons}>
            <button style={styles.btnPrimary}>
              <span>Get Started Free</span>
              <span style={styles.btnArrow}>→</span>
            </button>
            <button style={styles.btnSecondary}>
              <span>Explore Features</span>
            </button>
          </div>
          <div style={styles.heroStats}>
            <div style={styles.heroStat}>
              <div style={styles.heroStatNumber}>10K+</div>
              <div style={styles.heroStatLabel}>Books Managed</div>
            </div>
            <div style={styles.heroStat}>
              <div style={styles.heroStatNumber}>500+</div>
              <div style={styles.heroStatLabel}>Active Users</div>
            </div>
            <div style={styles.heroStat}>
              <div style={styles.heroStatNumber}>99%</div>
              <div style={styles.heroStatLabel}>Uptime</div>
            </div>
          </div>
        </div>
        <div className="hero-illustration" style={styles.heroIllustration}>
          <div style={styles.mockupContainer}>
            <div className="mockup-screen" style={styles.mockupScreen}>
              <div style={styles.mockupHeader}>
                <div style={styles.mockupDot}></div>
                <div style={{...styles.mockupDot, background: '#FFD4B8'}}></div>
                <div style={{...styles.mockupDot, background: '#A8C5A8'}}></div>
              </div>
              <div style={styles.mockupContent}>
                <div className="shimmer-line" style={{...styles.shimmerLine, width: '60%'}}></div>
                <div className="shimmer-line" style={{...styles.shimmerLine, width: '80%', marginTop: '12px'}}></div>
                <div className="shimmer-line" style={{...styles.shimmerLine, width: '40%', marginTop: '12px'}}></div>
                <div style={styles.mockupCard}>
                  <BooksIcon size={24} color="#FF9B7A" />
                  <div style={{ marginLeft: '12px', flex: 1 }}>
                    <div className="shimmer-line" style={{...styles.shimmerLine, width: '70%', height: '12px'}}></div>
                    <div className="shimmer-line" style={{...styles.shimmerLine, width: '50%', marginTop: '8px', height: '8px'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" style={styles.section}>
        <div 
          ref={el => sectionRefs.current[0] = el}
          data-index={0}
          className="fade-in-section"
          style={{
            ...styles.sectionContent,
            opacity: visibleSections.has(0) ? 1 : 0,
            transform: visibleSections.has(0) ? 'translateY(0)' : 'translateY(50px)'
          }}
        >
          <div style={styles.sectionHeader}>
            <div style={styles.sectionLabel}>Key Features</div>
            <h2 style={styles.sectionTitle}>Everything You Need in One Platform</h2>
            <p style={styles.sectionDescription}>
              Powerful features designed to make library management effortless and efficient
            </p>
          </div>
          <div style={styles.featuresGrid}>
            {keyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="feature-card"
                  style={{
                    ...styles.featureCard,
                    transitionDelay: `${index * 0.1}s`
                  }}
                >
                  <div style={styles.featureIconWrapper}>
                    <Icon size={32} color="#FF9B7A" />
                  </div>
                  <h3 style={styles.featureTitle}>{feature.title}</h3>
                  <p style={styles.featureDescription}>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* User Roles */}
      <section style={styles.rolesSection}>
        <div 
          ref={el => sectionRefs.current[1] = el}
          data-index={1}
          style={{
            ...styles.sectionContent,
            opacity: visibleSections.has(1) ? 1 : 0,
            transform: visibleSections.has(1) ? 'translateY(0)' : 'translateY(50px)'
          }}
        >
          <div style={styles.sectionHeader}>
            <div style={styles.sectionLabel}>User Roles</div>
            <h2 style={styles.sectionTitle}>Designed for Everyone</h2>
          </div>
          <div style={styles.rolesGrid}>
            <div className="role-card" style={styles.roleCard}>
              <div style={{...styles.roleIcon, background: 'linear-gradient(135deg, #FF9B7A 0%, #FFD4B8 100%)'}}>
                <UserIcon size={48} color="white" />
              </div>
              <h3 style={styles.roleTitle}>Student / User</h3>
              <ul style={styles.roleList}>
                <li>Browse and search books</li>
                <li>Reserve and borrow books</li>
                <li>Track borrowing history</li>
                <li>Receive notifications</li>
                <li>Pay fines online</li>
              </ul>
            </div>
            <div className="role-card" style={styles.roleCard}>
              <div style={{...styles.roleIcon, background: 'linear-gradient(135deg, #6B9BD1 0%, #B8D4ED 100%)'}}>
                <ShieldIcon size={48} color="white" />
              </div>
              <h3 style={styles.roleTitle}>Librarian / Admin</h3>
              <ul style={styles.roleList}>
                <li>Manage book inventory</li>
                <li>Issue and return books</li>
                <li>Generate reports</li>
                <li>Manage user accounts</li>
                <li>Configure system settings</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={styles.section}>
        <div 
          ref={el => sectionRefs.current[2] = el}
          data-index={2}
          style={{
            ...styles.sectionContent,
            opacity: visibleSections.has(2) ? 1 : 0,
            transform: visibleSections.has(2) ? 'translateY(0)' : 'translateY(50px)'
          }}
        >
          <div style={styles.sectionHeader}>
            <div style={styles.sectionLabel}>How It Works</div>
            <h2 style={styles.sectionTitle}>Simple & Intuitive Process</h2>
          </div>
          <div style={styles.stepsContainer}>
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="step-card" style={styles.stepCard}>
                  <div style={styles.stepNumber}>{step.step}</div>
                  <div style={styles.stepIcon}>
                    <Icon size={32} color="#FF9B7A" />
                  </div>
                  <h3 style={styles.stepTitle}>{step.title}</h3>
                  <p style={styles.stepDescription}>{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section style={styles.advancedSection}>
        <div 
          ref={el => sectionRefs.current[3] = el}
          data-index={3}
          style={{
            ...styles.sectionContent,
            opacity: visibleSections.has(3) ? 1 : 0,
            transform: visibleSections.has(3) ? 'translateY(0)' : 'translateY(50px)'
          }}
        >
          <div style={styles.sectionHeader}>
            <div style={styles.sectionLabel}>Advanced Features</div>
            <h2 style={styles.sectionTitle}>Next-Generation Technology</h2>
          </div>
          <div style={styles.advancedGrid}>
            {advancedFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="advanced-card" style={styles.advancedCard}>
                  <div style={styles.advancedIconWrapper}>
                    <Icon size={40} color="#FF9B7A" />
                  </div>
                  <h3 style={styles.advancedTitle}>{feature.title}</h3>
                  <p style={styles.advancedDescription}>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={styles.section}>
        <div 
          ref={el => sectionRefs.current[4] = el}
          data-index={4}
          style={{
            ...styles.sectionContent,
            opacity: visibleSections.has(4) ? 1 : 0,
            transform: visibleSections.has(4) ? 'translateY(0)' : 'translateY(50px)'
          }}
        >
          <div style={styles.sectionHeader}>
            <div style={styles.sectionLabel}>Benefits</div>
            <h2 style={styles.sectionTitle}>Why Choose LibraryHub?</h2>
          </div>
          <div style={styles.benefitsGrid}>
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="benefit-card" style={styles.benefitCard}>
                  <div style={styles.benefitIcon}>
                    <Icon size={28} color="#FF9B7A" />
                  </div>
                  <h3 style={styles.benefitTitle}>{benefit.title}</h3>
                  <p style={styles.benefitDescription}>{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section id="tech" style={styles.techSection}>
        <div 
          ref={el => sectionRefs.current[5] = el}
          data-index={5}
          style={{
            ...styles.sectionContent,
            opacity: visibleSections.has(5) ? 1 : 0,
            transform: visibleSections.has(5) ? 'translateY(0)' : 'translateY(50px)'
          }}
        >
          <div style={styles.sectionHeader}>
            <div style={styles.sectionLabel}>Technology Stack</div>
            <h2 style={styles.sectionTitle}>Built with Modern Technologies</h2>
          </div>
          <div style={styles.techGrid}>
            {techStack.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div key={index} className="tech-card" style={styles.techCard}>
                  <div style={styles.techIconWrapper}>
                    <Icon size={36} color="white" />
                  </div>
                  <h3 style={styles.techCategory}>{tech.category}</h3>
                  <div style={styles.techItems}>
                    {tech.items.map((item, i) => (
                      <span key={i} style={styles.techItem}>{item}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section style={styles.demoSection}>
        <div 
          ref={el => sectionRefs.current[6] = el}
          data-index={6}
          style={{
            ...styles.sectionContent,
            opacity: visibleSections.has(6) ? 1 : 0,
            transform: visibleSections.has(6) ? 'translateY(0)' : 'translateY(50px)'
          }}
        >
          <div style={styles.sectionHeader}>
            <div style={styles.sectionLabel}>Screenshots</div>
            <h2 style={styles.sectionTitle}>See It In Action</h2>
          </div>
          <div style={styles.demoGrid}>
            <div className="demo-card" style={styles.demoCard}>
              <div style={styles.demoImage}>
                <LayoutIcon size={64} color="#FFD4B8" />
                <div style={styles.demoOverlay}>User Dashboard</div>
              </div>
              <div style={styles.demoInfo}>
                <h4 style={styles.demoTitle}>User Dashboard</h4>
                <p style={styles.demoDescription}>Intuitive interface for browsing and managing books</p>
              </div>
            </div>
            <div className="demo-card" style={styles.demoCard}>
              <div style={styles.demoImage}>
                <ChartIcon size={64} color="#FFD4B8" />
                <div style={styles.demoOverlay}>Admin Panel</div>
              </div>
              <div style={styles.demoInfo}>
                <h4 style={styles.demoTitle}>Admin Panel</h4>
                <p style={styles.demoDescription}>Comprehensive control with analytics and insights</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to Transform Your Library?</h2>
          <p style={styles.ctaDescription}>
            Join hundreds of libraries already using LibraryHub to streamline operations and enhance user experience
          </p>
          <div style={styles.ctaButtons}>
            <button style={{...styles.btnPrimary, background: 'white', color: '#FF9B7A'}}>
              Start Free Trial
            </button>
            <button style={{...styles.btnSecondary, borderColor: 'white', color: '#FF9B7A'}}>
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <div style={styles.footerLogo}>
              <BooksIcon size={32} color="#FF9B7A" />
              <span style={styles.footerLogoText}>LibraryHub</span>
            </div>
            <p style={styles.footerAbout}>
              A comprehensive library management system designed to streamline operations and enhance user experience with cutting-edge technology.
            </p>
            <div style={styles.socialLinks}>
              <a href="#" style={styles.socialLink}>
                <GitHubIcon size={20} color="#8B6F47" />
              </a>
              <a href="#" style={styles.socialLink}>
                <MailIcon size={20} color="#8B6F47" />
              </a>
            </div>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerHeading}>Product</h4>
            <ul style={styles.footerLinks}>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#demo">Demo</a></li>
              <li><a href="#docs">Documentation</a></li>
            </ul>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerHeading}>Developers</h4>
            <ul style={styles.footerLinks}>
              <li><a href="#team">Team</a></li>
              <li><a href="#contribute">Contribute</a></li>
              <li><a href="https://github.com">GitHub</a></li>
              <li><a href="#api">API Docs</a></li>
            </ul>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerHeading}>Contact</h4>
            <ul style={styles.footerLinks}>
              <li><a href="#support">Support</a></li>
              <li><a href="mailto:info@libraryhub.com">Email Us</a></li>
              <li><a href="#feedback">Feedback</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={styles.copyright}>
            &copy; 2026 LibraryHub. Built with{' '}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#FF9B7A" style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {' '}by passionate developers
          </p>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Quicksand:wght@400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Quicksand', sans-serif;
          overflow-x: hidden;
        }

        a {
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }

        button {
          cursor: pointer;
          border: none;
          font-family: 'Quicksand', sans-serif;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .floating-shape {
          animation: float 20s ease-in-out infinite;
        }

        .hero-badge, .hero-title, .hero-description, .hero-buttons {
          animation: slideUp 0.8s ease-out backwards;
        }

        .hero-badge { animation-delay: 0.1s; }
        .hero-title { animation-delay: 0.2s; }
        .hero-description { animation-delay: 0.3s; }
        .hero-buttons { animation-delay: 0.4s; }

        .hero-illustration {
          animation: slideUp 0.8s ease-out 0.5s backwards;
        }

        .mockup-screen {
          animation: float 6s ease-in-out infinite;
        }

        .shimmer-line {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        .feature-card, .role-card, .step-card, .advanced-card, .benefit-card, .tech-card, .demo-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-card:hover, .role-card:hover, .advanced-card:hover, .benefit-card:hover, .tech-card:hover, .demo-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(255, 155, 122, 0.15);
        }

        .step-card:hover {
          transform: scale(1.05);
        }

        .fade-in-section {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btnPrimary:hover .btnArrow {
          transform: translateX(5px);
        }

        @media (max-width: 968px) {
          nav ul, .nav-buttons {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

// Continued in next part due to length...
const styles = {
  container: {
    background: '#FFF8F0',
    color: '#3D2817',
    minHeight: '100vh',
    position: 'relative',
  },
  backgroundShapes: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  floatingShape1: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255, 155, 122, 0.1) 0%, transparent 70%)',
    top: '10%',
    left: '-10%',
    animationDelay: '0s',
  },
  floatingShape2: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(168, 197, 168, 0.1) 0%, transparent 70%)',
    top: '50%',
    right: '-15%',
    animationDelay: '-7s',
  },
  floatingShape3: {
    position: 'absolute',
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(107, 155, 209, 0.1) 0%, transparent 70%)',
    bottom: '10%',
    left: '20%',
    animationDelay: '-14s',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 6%',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    background: 'rgba(255, 248, 240, 0.9)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 155, 122, 0.1)',
    transition: 'all 0.3s ease',
  },
  navScrolled: {
    padding: '1rem 6%',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontFamily: "'DM Serif Display', serif",
    fontSize: '1.75rem',
    color: '#5D4E37',
    fontWeight: 400,
  },
  logoIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  navLinks: {
    display: 'flex',
    gap: '2.5rem',
    listStyle: 'none',
  },
  navLink: {
    color: '#5D4E37',
    fontSize: '1rem',
    fontWeight: 600,
    position: 'relative',
    transition: 'color 0.3s ease',
    padding: '0.5rem 0',
  },
  navLinkActive: {
    color: '#FF9B7A',
  },
  navButtons: {
    display: 'flex',
    gap: '1rem',
  },
  btnLogin: {
    background: 'transparent',
    color: '#FF9B7A',
    padding: '0.7rem 1.8rem',
    borderRadius: '50px',
    fontWeight: 600,
    fontSize: '0.95rem',
    border: '2px solid #FF9B7A',
    transition: 'all 0.3s ease',
  },
  btnRegister: {
    background: '#FF9B7A',
    color: 'white',
    padding: '0.7rem 1.8rem',
    borderRadius: '50px',
    fontWeight: 600,
    fontSize: '0.95rem',
    border: 'none',
    boxShadow: '0 4px 15px rgba(255, 155, 122, 0.3)',
    transition: 'all 0.3s ease',
  },
  hero: {
    padding: '6rem 6% 4rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center',
    minHeight: '90vh',
    position: 'relative',
    zIndex: 1,
  },
  heroContent: {
    maxWidth: '600px',
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    background: 'rgba(255, 155, 122, 0.1)',
    border: '1px solid rgba(255, 155, 122, 0.3)',
    color: '#FF9B7A',
    padding: '0.6rem 1.5rem',
    borderRadius: '50px',
    fontSize: '0.9rem',
    fontWeight: 600,
    marginBottom: '2rem',
  },
  heroTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
    lineHeight: 1.15,
    color: '#5D4E37',
    marginBottom: '1.5rem',
  },
  heroTitleGradient: {
    background: 'linear-gradient(135deg, #FF9B7A 0%, #6B9BD1 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroDescription: {
    fontSize: '1.2rem',
    lineHeight: 1.7,
    color: '#8B6F47',
    marginBottom: '2.5rem',
  },
  heroButtons: {
    display: 'flex',
    gap: '1.5rem',
    marginBottom: '3rem',
  },
  btnPrimary: {
    background: '#FF9B7A',
    color: 'white',
    padding: '1.1rem 2.5rem',
    borderRadius: '50px',
    fontWeight: 700,
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 20px rgba(255, 155, 122, 0.3)',
    transition: 'all 0.3s ease',
  },
  btnSecondary: {
    background: 'white',
    color: '#FF9B7A',
    padding: '1.1rem 2.5rem',
    borderRadius: '50px',
    fontWeight: 700,
    fontSize: '1rem',
    border: '2px solid #FF9B7A',
    transition: 'all 0.3s ease',
  },
  btnArrow: {
    transition: 'transform 0.3s ease',
  },
  heroStats: {
    display: 'flex',
    gap: '3rem',
  },
  heroStat: {
    textAlign: 'center',
  },
  heroStatNumber: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: '2.5rem',
    color: '#FF9B7A',
    fontWeight: 400,
    lineHeight: 1,
  },
  heroStatLabel: {
    fontSize: '0.9rem',
    color: '#8B6F47',
    marginTop: '0.5rem',
  },
  heroIllustration: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockupContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '500px',
  },
  mockupScreen: {
    background: 'white',
    borderRadius: '20px',
    padding: '1.5rem',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
  },
  mockupHeader: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  mockupDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: '#FF9B7A',
  },
  mockupContent: {
    padding: '1rem 0',
  },
  shimmerLine: {
    height: '16px',
    borderRadius: '4px',
  },
  mockupCard: {
    background: '#FFF8F0',
    padding: '1.5rem',
    borderRadius: '12px',
    marginTop: '1.5rem',
    display: 'flex',
    alignItems: 'center',
  },
  section: {
    padding: '6rem 6%',
    position: 'relative',
    zIndex: 1,
  },
  sectionContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  sectionLabel: {
    color: '#FF9B7A',
    fontWeight: 700,
    fontSize: '0.95rem',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '1rem',
  },
  sectionTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
    color: '#5D4E37',
    marginBottom: '1rem',
    lineHeight: 1.2,
  },
  sectionDescription: {
    fontSize: '1.2rem',
    color: '#8B6F47',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.7,
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  featureCard: {
    background: 'white',
    padding: '2.5rem',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
    border: '1px solid rgba(255, 155, 122, 0.1)',
  },
  featureIconWrapper: {
    width: '70px',
    height: '70px',
    background: 'rgba(255, 155, 122, 0.1)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },
  featureTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: '1.5rem',
    color: '#5D4E37',
    marginBottom: '1rem',
  },
  featureDescription: {
    color: '#8B6F47',
    lineHeight: 1.7,
    fontSize: '1rem',
  },
  rolesSection: {
    padding: '6rem 6%',
    background: 'linear-gradient(180deg, #FFF8F0 0%, #F5EDE3 100%)',
    position: 'relative',
    zIndex: 1,
  },
  rolesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '3rem',
    maxWidth: '900px',
    margin: '0 auto',
  },
  roleCard: {
    background: 'white',
    padding: '3rem',
    borderRadius: '24px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
    textAlign: 'center',
  },
  roleIcon: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 2rem',
  },
  roleTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: '2rem',
    color: '#5D4E37',
    marginBottom: '1.5rem',
  },
  roleList: {
    listStyle: 'none',
    textAlign: 'left',
    fontSize: '1.05rem',
    lineHeight: 2,
    color: '#8B6F47',
  },
  stepsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    position: 'relative',
  },
  stepCard: {
    background: 'white',
    padding: '2.5rem',
    borderRadius: '20px',
    textAlign: 'center',
    position: 'relative',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
  },
  stepNumber: {
    width: '50px',
    height: '50px',
    background: 'linear-gradient(135deg, #FF9B7A 0%, #FFD4B8 100%)',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: 700,
    margin: '0 auto 1.5rem',
    fontFamily: "'DM Serif Display', serif",
  },
  stepIcon: {
    marginBottom: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
  },
  stepTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: '1.5rem',
    color: '#5D4E37',
    marginBottom: '1rem',
  },
  stepDescription: {
    color: '#8B6F47',
    lineHeight: 1.6,
  },
  advancedSection: {
    padding: '6rem 6%',
    background: 'linear-gradient(135deg, rgba(255, 155, 122, 0.05) 0%, rgba(168, 197, 168, 0.05) 100%)',
    position: 'relative',
    zIndex: 1,
  },
  advancedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2.5rem',
  },
  advancedCard: {
    background: 'white',
    padding: '3rem 2rem',
    borderRadius: '24px',
    textAlign: 'center',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(255, 155, 122, 0.1)',
  },
  advancedIconWrapper: {
    width: '90px',
    height: '90px',
    background: 'linear-gradient(135deg, rgba(255, 155, 122, 0.1) 0%, rgba(255, 212, 184, 0.1) 100%)',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
  },
  advancedTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: '1.6rem',
    color: '#5D4E37',
    marginBottom: '1rem',
  },
  advancedDescription: {
    color: '#8B6F47',
    lineHeight: 1.7,
  },
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  benefitCard: {
    background: 'white',
    padding: '2.5rem',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  benefitIcon: {
    width: '60px',
    height: '60px',
    background: 'rgba(255, 155, 122, 0.1)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },
  benefitTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: '1.5rem',
    color: '#5D4E37',
    marginBottom: '1rem',
  },
  benefitDescription: {
    color: '#8B6F47',
    lineHeight: 1.7,
  },
  techSection: {
    padding: '6rem 6%',
    background: '#FFF8F0',
    position: 'relative',
    zIndex: 1,
  },
  techGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2.5rem',
  },
  techCard: {
    background: 'white',
    padding: '3rem 2.5rem',
    borderRadius: '24px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
    textAlign: 'center',
  },
  techIconWrapper: {
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #FF9B7A 0%, #FFD4B8 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
  },
  techCategory: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: '1.8rem',
    color: '#5D4E37',
    marginBottom: '1.5rem',
  },
  techItems: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    justifyContent: 'center',
  },
  techItem: {
    background: 'rgba(255, 155, 122, 0.1)',
    color: '#FF9B7A',
    padding: '0.6rem 1.2rem',
    borderRadius: '50px',
    fontSize: '0.9rem',
    fontWeight: 600,
    border: '1px solid rgba(255, 155, 122, 0.2)',
  },
  demoSection: {
    padding: '6rem 6%',
    background: 'linear-gradient(180deg, #F5EDE3 0%, #FFF8F0 100%)',
    position: 'relative',
    zIndex: 1,
  },
  demoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '3rem',
  },
  demoCard: {
    background: 'white',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
  },
  demoImage: {
    height: '300px',
    background: 'linear-gradient(135deg, #FF9B7A 0%, #FFD4B8 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  demoOverlay: {
    position: 'absolute',
    bottom: '1.5rem',
    left: '1.5rem',
    background: 'rgba(255, 255, 255, 0.95)',
    color: '#5D4E37',
    padding: '0.75rem 1.5rem',
    borderRadius: '50px',
    fontWeight: 700,
    fontSize: '0.95rem',
  },
  demoInfo: {
    padding: '2rem',
  },
  demoTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: '1.6rem',
    color: '#5D4E37',
    marginBottom: '0.75rem',
  },
  demoDescription: {
    color: '#8B6F47',
    lineHeight: 1.6,
  },
  ctaSection: {
    padding: '6rem 6%',
    background: 'linear-gradient(135deg, #FF9B7A 0%, #6B9BD1 100%)',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
  },
  ctaContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  ctaTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    color: 'white',
    marginBottom: '1.5rem',
    lineHeight: 1.2,
  },
  ctaDescription: {
    fontSize: '1.3rem',
    color: 'rgba(255, 255, 255, 0.95)',
    marginBottom: '3rem',
    lineHeight: 1.7,
  },
  ctaButtons: {
    display: 'flex',
    gap: '1.5rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  footer: {
    padding: '4rem 6% 2rem',
    background: '#5D4E37',
    color: '#FFF8F0',
    position: 'relative',
    zIndex: 1,
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: '3rem',
    maxWidth: '1200px',
    margin: '0 auto 3rem',
  },
  footerSection: {},
  footerLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },
  footerLogoText: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: '1.75rem',
    color: '#FFD4B8',
  },
  footerAbout: {
    color: '#FFD4B8',
    lineHeight: 1.7,
    marginBottom: '2rem',
    opacity: 0.9,
  },
  socialLinks: {
    display: 'flex',
    gap: '1rem',
  },
  socialLink: {
    width: '40px',
    height: '40px',
    background: 'rgba(255, 212, 184, 0.1)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  footerHeading: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: '1.3rem',
    color: '#FFD4B8',
    marginBottom: '1.5rem',
  },
  footerLinks: {
    listStyle: 'none',
    lineHeight: 2,
  },
  footerBottom: {
    textAlign: 'center',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255, 212, 184, 0.2)',
  },
  copyright: {
    color: '#FFD4B8',
    opacity: 0.8,
    fontSize: '0.95rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Landing;