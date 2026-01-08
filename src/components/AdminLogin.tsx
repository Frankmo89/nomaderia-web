import { useState } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (password: string) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simple password validation (in production, use proper auth)
    // Password should be: nomaderia2025
    if (password === 'nomaderia2025') {
      localStorage.setItem('nomaderia_admin_token', 'authenticated');
      onLogin(password);
    } else {
      setError('Contraseña incorrecta');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2540] via-[#1a4d2e] to-[#0A2540] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h2 className="font-display text-5xl font-bold text-white mb-8">
            NOMADERÍA
          </h2>
          <h1 className="text-4xl font-black text-white mb-2">Panel Admin</h1>
          <p className="text-white/60">Acceso exclusivo para Nomadería</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-white font-semibold mb-3">
              Contraseña de Acceso
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#E8744F] focus:bg-white/15 transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#E8744F] hover:bg-[#d65a35] text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verificando...' : 'Acceder al Panel'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-white/40 text-sm mt-8">
          © 2025 Nomadería. Sistema de Administración
        </p>
      </div>
    </div>
  );
}
