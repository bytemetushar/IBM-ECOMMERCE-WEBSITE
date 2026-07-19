import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { X, User } from 'lucide-react';

export default function LoginPromptModal() {
  const { showLoginPopup, setShowLoginPopup } = useAuth();
  const navigate = useNavigate();

  if (!showLoginPopup) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div className="card" style={{
        maxWidth: '400px',
        width: '90%',
        position: 'relative',
        animation: 'fadeIn 0.2s ease-out'
      }}>
        <button 
          onClick={() => setShowLoginPopup(false)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-secondary)'
          }}
        >
          <X size={20} />
        </button>

        <div className="text-center flex-col items-center gap-4 py-4">
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-primary-dim)',
            color: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <User size={32} />
          </div>
          <h3 className="h3">Login Required</h3>
          <p className="text-secondary mb-6">
            Please log in or create an account to add items to your cart and complete your purchase.
          </p>
          
          <div className="flex-col gap-3 w-full">
            <button 
              className="btn btn-primary w-full"
              onClick={() => {
                setShowLoginPopup(false);
                navigate('/login');
              }}
            >
              Log In
            </button>
            <button 
              className="btn btn-outline w-full"
              onClick={() => {
                setShowLoginPopup(false);
                navigate('/register');
              }}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
