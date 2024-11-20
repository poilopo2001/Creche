import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, AlertCircle, Building2, Users, User, Phone } from 'lucide-react';

interface OnboardingData {
  name: string;
  phone?: string;
  // Parent specific
  childrenCount?: number;
  // Provider specific
  daycareName?: string;
  location?: string;
}

const SignupPage: React.FC = () => {
  const [step, setStep] = useState<'role' | 'account' | 'onboarding'>('role');
  const [role, setRole] = useState<'parent' | 'provider' | ''>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    name: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleRoleSelect = (selectedRole: 'parent' | 'provider') => {
    setRole(selectedRole);
    setStep('account');
  };

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    setStep('onboarding');
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signUp(email, password, role);
      navigate(role === 'parent' ? '/dashboard' : '/provider-dashboard');
    } catch (err) {
      setError('Failed to create an account');
    } finally {
      setLoading(false);
    }
  };

  const renderRoleSelection = () => (
    <div className="space-y-4">
      <button
        onClick={() => handleRoleSelect('parent')}
        className="w-full flex items-center justify-center px-4 py-6 border-2 border-gray-300 rounded-lg hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Users className="h-8 w-8 text-indigo-600 mr-4" />
        <div className="text-left">
          <div className="text-lg font-medium text-gray-900">Parent Account</div>
          <div className="text-sm text-gray-500">Find and manage daycare for your children</div>
        </div>
      </button>

      <button
        onClick={() => handleRoleSelect('provider')}
        className="w-full flex items-center justify-center px-4 py-6 border-2 border-gray-300 rounded-lg hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Building2 className="h-8 w-8 text-indigo-600 mr-4" />
        <div className="text-left">
          <div className="text-lg font-medium text-gray-900">Daycare Provider</div>
          <div className="text-sm text-gray-500">Manage your daycare facility and services</div>
        </div>
      </button>
    </div>
  );

  const renderAccountForm = () => (
    <form className="space-y-6" onSubmit={handleAccountSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            type="email"
            required
            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            type="password"
            required
            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="confirmPassword"
            type="password"
            required
            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Continue
      </button>
    </form>
  );

  const renderOnboardingForm = () => (
    <form className="space-y-6" onSubmit={handleFinalSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          {role === 'provider' ? 'Contact Person Name' : 'Your Name'}
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="name"
            type="text"
            required
            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={onboardingData.name}
            onChange={(e) => setOnboardingData({ ...onboardingData, name: e.target.value })}
          />
        </div>
      </div>

      {role === 'provider' && (
        <div>
          <label htmlFor="daycareName" className="block text-sm font-medium text-gray-700">
            Daycare Name
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="daycareName"
              type="text"
              required
              className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={onboardingData.daycareName || ''}
              onChange={(e) => setOnboardingData({ ...onboardingData, daycareName: e.target.value })}
            />
          </div>
        </div>
      )}

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="phone"
            type="tel"
            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={onboardingData.phone || ''}
            onChange={(e) => setOnboardingData({ ...onboardingData, phone: e.target.value })}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? 'Creating account...' : 'Complete Setup'}
      </button>
    </form>
  );

  const steps = [
    { id: 'role', name: 'Account Type' },
    { id: 'account', name: 'Credentials' },
    { id: 'onboarding', name: 'Profile' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {step === 'role' && 'Create your account'}
          {step === 'account' && `Create your ${role} account`}
          {step === 'onboarding' && 'Complete your profile'}
        </h2>
        {step === 'role' && (
          <p className="mt-2 text-center text-sm text-gray-600">
            Choose your account type to get started
          </p>
        )}
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-center">
          {steps.map((stepItem, index) => (
            <React.Fragment key={stepItem.id}>
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step === stepItem.id 
                    ? 'bg-indigo-600 text-white'
                    : index < steps.findIndex(s => s.id === step)
                      ? 'bg-indigo-200 text-indigo-700'
                      : 'bg-gray-200 text-gray-400'
                }`}>
                  {index + 1}
                </div>
                <div className="ml-2">
                  <div className="text-sm font-medium text-gray-900">{stepItem.name}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="w-16 border-t border-gray-200 mx-4" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          {step === 'role' && renderRoleSelection()}
          {step === 'account' && renderAccountForm()}
          {step === 'onboarding' && renderOnboardingForm()}

          {step !== 'role' && (
            <div className="mt-4">
              <button
                onClick={() => setStep(step === 'onboarding' ? 'account' : 'role')}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                ← Back
              </button>
            </div>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage; 