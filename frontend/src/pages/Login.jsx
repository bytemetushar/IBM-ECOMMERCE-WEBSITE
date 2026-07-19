export default function Login() {
  return (
    <div className="container py-16" style={{ maxWidth: '500px' }}>
      <div className="card">
        <h2 className="h2 mb-8 text-gradient text-center">Login</h2>
        <form className="flex-col gap-4">
          <div className="flex-col gap-1">
            <label className="text-secondary">Email</label>
            <input type="email" className="input" placeholder="you@example.com" />
          </div>
          <div className="flex-col gap-1 mb-4">
            <label className="text-secondary">Password</label>
            <input type="password" className="input" placeholder="••••••••" />
          </div>
          <button className="btn btn-primary" type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}
