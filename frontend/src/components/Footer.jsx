import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';

const TwitterIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path></svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

export default function Footer() {
  return (
    <footer style={{ 
      background: 'var(--bg-secondary)', 
      borderTop: '1px solid var(--border-color)',
      padding: '4rem 0 2rem 0',
      marginTop: 'auto',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative gradient blur */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '800px',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--accent-cyan), var(--accent-purple), transparent)',
        opacity: 0.5,
        boxShadow: '0 0 20px var(--accent-cyan)'
      }}></div>

      <div className="container footer-grid">
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <span className="h2 text-gradient" style={{ letterSpacing: '-0.03em' }}>byteBazaar</span>
          <p className="text-muted" style={{ lineHeight: 1.6 }}>
            The ultimate destination for premium tech gear and modern aesthetics. Elevating your digital lifestyle one byte at a time.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="social-icon">
              <TwitterIcon size={20} />
            </a>
            <a href="#" className="social-icon">
              <GithubIcon size={20} />
            </a>
            <a href="#" className="social-icon">
              <LinkedinIcon size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="h3" style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Quick Links</h3>
          <ul className="flex flex-col gap-2">
            <li><Link to="/" className="text-secondary">Home</Link></li>
            <li><Link to="/shop" className="text-secondary">Shop Collection</Link></li>
            <li><Link to="/cart" className="text-secondary">Your Cart</Link></li>
            <li><Link to="/about" className="text-secondary">About Us</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h3 className="h3" style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Stay Updated</h3>
          <p className="text-muted">Subscribe to our newsletter for the latest tech drops and exclusive offers.</p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type="email" className="input" placeholder="Enter your email" style={{ paddingLeft: '2.5rem' }} />
            </div>
            <button className="btn btn-primary" style={{ padding: '0 1rem' }}>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container bottom-bar">
        <p className="text-muted" style={{ fontSize: '0.875rem' }}>
          &copy; {new Date().getFullYear()} byteBazaar. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link to="#" className="text-muted" style={{ fontSize: '0.875rem' }}>Privacy Policy</Link>
          <Link to="#" className="text-muted" style={{ fontSize: '0.875rem' }}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
