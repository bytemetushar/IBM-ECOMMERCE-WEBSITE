import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({ FullName: '', email: '', password: '', contact: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await register(formData.FullName, formData.email, formData.password, formData.contact);
    setIsSubmitting(false);
    if (res.success) {
      navigate('/');
    }
  };

  return (
    <div className="container py-16" style={{ maxWidth: '500px' }}>
      <div className="card">
        <h2 className="h2 mb-8 text-gradient text-center">Create Account</h2>
        
        {error && (
          <div className="mb-6 p-4 rounded-md" style={{ 
            backgroundColor: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>{error}</span>
          </div>
        )}

        <form className="flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex-col gap-1">
            <label className="text-secondary">Full Name</label>
            <input type="text" name="FullName" className="input" placeholder="John Doe" required onChange={handleChange} />
          </div>
          <div className="flex-col gap-1">
            <label className="text-secondary">Email</label>
            <input type="email" name="email" className="input" placeholder="you@example.com" required onChange={handleChange} />
          </div>
          <div className="flex-col gap-1">
            <label className="text-secondary">Contact Number</label>
            <input type="text" name="contact" className="input" placeholder="1234567890" required onChange={handleChange} minLength={10} maxLength={10} />
          </div>
          <div className="flex-col gap-1 mb-4">
            <label className="text-secondary">Password</label>
            <input type="password" name="password" className="input" placeholder="••••••••" required onChange={handleChange} minLength={8} />
          </div>
          <button 
            className="btn btn-primary mt-2" 
            type="submit" 
            disabled={isSubmitting}
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '0.5rem',
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Creating account...
              </>
            ) : (
              'Register'
            )}
          </button>
        </form>
        <p className="text-center mt-4 text-secondary">
          Already have an account? <Link to="/login" className="text-primary-accent">Log in here</Link>
        </p>
      </div>
    </div>
  );
}
