import { useState } from 'react';
import { Landmark, Phone, Lock, Eye, EyeOff, ArrowRight, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-950 via-primary-800 to-primary-600">
      {/* Hero section */}
      <div className="flex-1 flex flex-col justify-center px-6 pt-16 pb-8 max-w-sm mx-auto w-full">
        <div className="mb-10">
          <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/20">
            <Landmark className="text-white" size={28} />
          </div>
          <h1 className="font-display font-bold text-white text-3xl leading-tight mb-2">
            {mode === 'login' ? 'Welcome back' : 'Join the SACCO'}
          </h1>
          <p className="text-primary-100 text-sm leading-relaxed">
            {mode === 'login'
              ? 'Save, borrow, and grow your money with your trusted community savings cooperative.'
              : 'Start your journey to financial freedom with a community that invests in you.'}
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl">
          <div className="flex gap-2 mb-5 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === 'login' ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-500'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === 'signup' ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-500'}`}
            >
              Create Account
            </button>
          </div>

          <div className="space-y-4">
            <Input
              label="Phone number or email"
              placeholder="+256 7XX XXX XXX"
              icon={<Phone size={18} />}
              defaultValue="+256 772 100 204"
            />
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              icon={<Lock size={18} />}
              defaultValue="demo1234"
              rightIcon={
                <button onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            {mode === 'login' && (
              <div className="flex justify-end">
                <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
                  Forgot password?
                </button>
              </div>
            )}

            <Button fullWidth size="lg" onClick={onLogin}>
              {mode === 'login' ? 'Sign In' : 'Continue'}
              <ArrowRight size={18} />
            </Button>

            {mode === 'login' && (
              <>
                <div className="flex items-center gap-3 py-2">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-gray-400">or</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>
                <Button variant="outline" fullWidth size="lg" onClick={onLogin}>
                  <Fingerprint size={20} />
                  Use Biometric
                </Button>
              </>
            )}
          </div>
        </div>

        <p className="text-center text-primary-200 text-xs mt-6">
          By continuing, you agree to the Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
