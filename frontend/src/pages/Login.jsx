import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(formData.email, formData.password);
    if (res.success) {
      navigate('/');
    }
  };

  return (
    <div className="container py-16" style={{ maxWidth: '500px' }}>
      <div className="card">
        <h2 className="h2 mb-8 text-gradient text-center">Login</h2>
        {error && <div className="mb-4 text-center" style={{ color: '#ef4444' }}>{error}</div>}
        <form className="flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex-col gap-1">
            <label className="text-secondary">Email</label>
            <input type="email" name="email" className="input" placeholder="you@example.com" required onChange={handleChange} />
          </div>
          <div className="flex-col gap-1 mb-4">
            <label className="text-secondary">Password</label>
            <input type="password" name="password" className="input" placeholder="••••••••" required onChange={handleChange} />
          </div>
          <button className="btn btn-primary" type="submit">Sign In</button>
        </form>
        <p className="text-center mt-4 text-secondary">
          Don't have an account? <Link to="/register" className="text-primary-accent">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}
