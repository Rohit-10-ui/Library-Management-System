import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo">
            <h1>📚 City Central Library</h1>
          </div>
          <div className="nav-links">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link signup-btn">Register</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Our Digital Library</h1>
          <p className="hero-subtitle">
            Explore, borrow, and manage your favorite books. A complete library management system for members, librarians, and administrators.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary">Register as Member</Link>
            <Link to="/login" className="btn btn-secondary">Login</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="book-stack">
            <div className="book book-1">📕</div>
            <div className="book book-2">📗</div>
            <div className="book book-3">📘</div>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="roles-section">
        <h2>Library Access Levels</h2>
        <div className="roles-grid">
          <div className="role-card">
            <div className="role-icon">👤</div>
            <h3>Members</h3>
            <p>Browse the catalog, search for books, borrow and return items</p>
            <Link to="/signup" className="role-btn">Register Now</Link>
          </div>
          <div className="role-card">
            <div className="role-icon">💼</div>
            <h3>Librarians</h3>
            <p>Manage books, process borrowing, handle member management</p>
            <Link to="/login" className="role-btn">Login</Link>
          </div>
          <div className="role-card">
            <div className="role-icon">⚙️</div>
            <h3>Administrators</h3>
            <p>System administration, user management, reports and analytics</p>
            <Link to="/login" className="role-btn">Login</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Library Services</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Book Search</h3>
            <p>Search our complete catalog by title, author, ISBN, or genre</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📤</div>
            <h3>Borrowing</h3>
            <p>Check out books and manage your active loans and due dates</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📥</div>
            <h3>Returns</h3>
            <p>Return borrowed books and view your borrowing history</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Inventory</h3>
            <p>Complete book inventory with location and availability status</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Member Accounts</h3>
            <p>Manage accounts, view borrowing records, and account settings</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Reports</h3>
            <p>Generate reports on inventory, members, and circulation statistics</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>Getting Started as a Member</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Register</h3>
            <p>Create a new library member account</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Browse Books</h3>
            <p>Search and explore our complete book collection</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Borrow Books</h3>
            <p>Check out books and receive due date notifications</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Manage Account</h3>
            <p>Track loans, view history, and manage your preferences</p>
          </div>
        </div>
      </section>

      {/* Library Info Section */}
      <section className="library-info">
        <h2>Library Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <h4>📍 Location</h4>
            <p>123 Main Street, City Center</p>
          </div>
          <div className="info-item">
            <h4>⏰ Hours</h4>
            <p>Mon-Fri: 9AM-8PM<br/>Sat-Sun: 10AM-6PM</p>
          </div>
          <div className="info-item">
            <h4>📞 Contact</h4>
            <p>Phone: (555) 123-4567<br/>Email: info@citylibrary.org</p>
          </div>
          <div className="info-item">
            <h4>📖 Collection</h4>
            <p>5,000+ Books<br/>Multiple Genres</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Join Our Library Community</h2>
        <p>Get access to thousands of books and start your reading journey today</p>
        <Link to="/signup" className="btn btn-primary btn-large">Register Now</Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>City Central Library</h4>
            <p>Serving our community with quality library services</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Register</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Phone: (555) 123-4567<br/>Email: info@citylibrary.org</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 City Central Library. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
