import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Eye,
  EyeOff,
  ArrowRight,
  Mail,
  Lock,
  User,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_ROLES, ALL_ACCOUNTS_MAP, GDG_ADMIN } from '../../services/mockData';
import gdgLogo from '../../assets/gdgmmdu-logo.jpg';
import loginLogo from '../../assets/login-logo.jpg';
import { SocialButton, InputGroup } from '../../App';
import { Chrome, Github } from '../../components/common/Icons';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Primary toggle state: 'login' | 'signup'
  const [activeTab, setActiveTab] = useState('login');

  // Password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  // Status & Validation Feedback
  const [errors, setErrors] = useState({});
  const [statusFeedback, setStatusFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearErrors = () => {
    setErrors({});
    setStatusFeedback(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    clearErrors();
  };

  // Social Buttons click feedback (explicitly demo/placeholder as requested)
  const handleSocialClick = (provider) => {
    setStatusFeedback({
      type: 'info',
      message: `${provider} authentication is currently a visual UI preview. Institutional OAuth integration with the backend will be enabled in the upcoming release.`,
    });
  };

  // Login Submit Handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    clearErrors();

    const newErrors = {};
    if (!loginEmail.trim()) {
      newErrors.email = 'Institutional email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail.trim())) {
      newErrors.email = 'Please provide a valid email format.';
    }

    if (!loginPassword) {
      newErrors.password = 'Password is required to authenticate.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const lowerEmail = loginEmail.trim().toLowerCase();
      const matchingAccount = Object.values(ALL_ACCOUNTS_MAP).find(
        (acc) => acc?.email?.toLowerCase() === lowerEmail
      );

      const targetAccount = matchingAccount || GDG_ADMIN;
      const targetRole = targetAccount.role || MOCK_ROLES.ADMIN;

      // Call auth service
      const res = await login({
        email: loginEmail.trim(),
        password: loginPassword,
        role: targetRole,
        accountId: targetAccount.id,
      });

      if (res?.success) {
        setStatusFeedback({
          type: 'success',
          message: `Authenticated as ${targetAccount.name} (${targetAccount.role}). Directing to workspace...`,
        });

        setTimeout(() => {
          const roleRoutes = {
            [MOCK_ROLES.ADMIN]: '/admin/dashboard',
            [MOCK_ROLES.LEAD]: '/lead/dashboard',
            [MOCK_ROLES.MENTOR]: '/mentor/dashboard',
            [MOCK_ROLES.MENTEE]: '/mentee/dashboard',
          };
          navigate(roleRoutes[targetRole] || '/admin/dashboard');
        }, 800);
      }
    } catch {
      setStatusFeedback({
        type: 'error',
        message: 'Authentication failed. Please verify institutional credentials.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sign Up Submit Handler (New volunteer/member - treated as PENDING)
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    clearErrors();

    const newErrors = {};
    if (!signupFirstName.trim()) {
      newErrors.firstName = 'First name is required.';
    }
    if (!signupLastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    }
    if (!signupEmail.trim()) {
      newErrors.email = 'Institutional email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!signupPassword) {
      newErrors.password = 'Password is required.';
    } else if (signupPassword.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Frontend validation succeeded - status is PENDING
    setTimeout(() => {
      setIsSubmitting(false);
      setStatusFeedback({
        type: 'info',
        message: `Volunteer registration payload verified for ${signupFirstName} ${signupLastName} (${signupEmail}). Account status is set to PENDING awaiting administrator approval. Ready for Django REST Framework integration (POST /api/auth/register/).`,
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col lg:flex-row antialiased selection:bg-[#4285F4]/30">
      {/* ========================================================================= */}
      {/* LEFT HERO PANEL (~52% width on desktop, hidden on mobile/tablet) */}
      {/* ========================================================================= */}
      <section
        className="hidden lg:flex lg:w-[52%] xl:w-[54%] relative overflow-hidden p-6 xl:p-8 flex-col justify-between"
        aria-label="GDG MMDU Workspace Visual Hero"
      >
        {/* Rounded Container Frame */}
        <div className="relative w-full h-full rounded-3xl overflow-hidden flex flex-col justify-between p-8 xl:p-10 border border-white/10 shadow-2xl">
          {/*
            NATURAL VIDEO BACKGROUND:
            - EXACT URL PROVIDED
            - autoPlay, muted, loop, playsInline
            - absolute inset-0 w-full h-full object-cover
            - CRITICAL: NO dark overlay, NO gradient overlay, NO tinting!
          */}
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_081238_406ed0e3-5d83-436e-a512-0bbff7ec5b95.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          />

          {/* TOP AREA: Brand Badge & Return Link (Readable via high-contrast pill styling) */}
          <div className="relative z-10 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-3 bg-black/80 hover:bg-black/95 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-2xl transition-all shadow-lg group"
            >
              <img
                src={gdgLogo}
                alt="GDG MMDU Logo"
                className="h-8 w-auto object-contain rounded-md"
              />
              <div className="text-left">
                <div className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                  <span>GDG MMDU</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
                </div>
                <div className="text-[10px] text-zinc-300 font-medium leading-none">
                  Management System
                </div>
              </div>
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/90 hover:text-white bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/15 px-3.5 py-2 rounded-full transition-all shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </Link>
          </div>

          {/* CENTER VISUAL: login-logo.jpg as the sole primary visual focus */}
          <div className="relative z-10 flex-1 flex items-center justify-center p-6 sm:p-10 pb-12">
            <img
              src={loginLogo}
              alt="Google Developer Groups On Campus - Maharishi Markandeshwar (Deemed to be University)"
              className="w-full max-w-md xl:max-w-lg max-h-[72%] object-contain select-none drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* RIGHT FORM PANEL (Responsive, centered, primary interaction area) */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 sm:px-8 lg:px-12 py-8 lg:py-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile & Small Screen Brand Header */}
          <div className="flex lg:hidden items-center justify-between pb-2 border-b border-white/10">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <img
                src={gdgLogo}
                alt="GDG MMDU Logo"
                className="h-8 w-auto object-contain rounded-md"
              />
              <div className="text-left">
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  <span>GDG MMDU</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
                </div>
                <div className="text-[10px] text-zinc-400 font-medium leading-none">
                  Management System
                </div>
              </div>
            </Link>

            <Link
              to="/"
              className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Link>
          </div>

          {/* Segmented Toggle: [ Log In ] [ Create Account ] */}
          <div className="p-1 bg-[#141414] border border-white/10 rounded-xl grid grid-cols-2 text-xs font-semibold relative">
            <button
              type="button"
              onClick={() => handleTabChange('login')}
              className={`relative z-10 py-2.5 rounded-lg transition-colors cursor-pointer text-center ${
                activeTab === 'login' ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {activeTab === 'login' && (
                <motion.div
                  layoutId="auth-tab-pill"
                  className="absolute inset-0 bg-[#262626] border border-white/10 rounded-lg -z-10 shadow-xs"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              Log In
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('signup')}
              className={`relative z-10 py-2.5 rounded-lg transition-colors cursor-pointer text-center ${
                activeTab === 'signup' ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {activeTab === 'signup' && (
                <motion.div
                  layoutId="auth-tab-pill"
                  className="absolute inset-0 bg-[#262626] border border-white/10 rounded-lg -z-10 shadow-xs"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              Create Account
            </button>
          </div>

          {/* Dynamic Form Header */}
          <div className="text-left space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {activeTab === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              {activeTab === 'login'
                ? 'Sign in to access your GDG MMDU workspace.'
                : 'Register as a volunteer or student member to get started.'}
            </p>
          </div>

          {/* Feedback & Status Message */}
          {statusFeedback && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                statusFeedback.type === 'success'
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                  : statusFeedback.type === 'error'
                  ? 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                  : 'bg-blue-950/40 border-blue-500/30 text-blue-300'
              }`}
            >
              {statusFeedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              ) : statusFeedback.type === 'error' ? (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <div className="leading-relaxed flex-1">{statusFeedback.message}</div>
            </motion.div>
          )}

          {/* Social Authentication Buttons (Visual Preview / Demo) */}
          <div className="grid grid-cols-2 gap-3">
            <SocialButton
              icon={Chrome}
              label="Google"
              onClick={() => handleSocialClick('Google')}
            />
            <SocialButton
              icon={Github}
              label="GitHub"
              onClick={() => handleSocialClick('GitHub')}
            />
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-white/10 w-full" />
            <span className="bg-[#0A0A0A] px-3 text-[11px] text-zinc-400 uppercase tracking-wider font-medium shrink-0">
              or continue with email
            </span>
          </div>

          {/* Form Content with Animated Transition */}
          <AnimatePresence mode="wait">
            {activeTab === 'login' ? (
              <motion.form
                key="login-form"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                onSubmit={handleLoginSubmit}
                className="space-y-4"
                noValidate
              >
                <InputGroup
                  label="Institutional Email"
                  placeholder="e.g. yourname@mmumullana.org"
                  type="email"
                  id="login-email"
                  name="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  error={errors.email}
                  required
                  autoComplete="email"
                />

                <InputGroup
                  label="Password"
                  placeholder="Enter your security password"
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  name="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  error={errors.password}
                  required
                  autoComplete="current-password"
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-zinc-400 hover:text-white p-1 transition-colors cursor-pointer"
                      title={showPassword ? 'Hide password' : 'Show password'}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                />

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-zinc-300 hover:text-white select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-[#1A1A1A] text-[#4285F4] focus:ring-[#4285F4]/30 focus:ring-offset-0 cursor-pointer"
                    />
                    <span>Remember me</span>
                  </label>

                  <span
                    onClick={() =>
                      setStatusFeedback({
                        type: 'info',
                        message: 'Password reset flow will be connected to institutional email verification in backend phase.',
                      })
                    }
                    className="text-zinc-400 hover:text-white cursor-pointer transition-colors"
                  >
                    Forgot password?
                  </span>
                </div>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-[#4285F4] hover:bg-[#1a73e8] text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Log In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Bottom Toggle Note */}
                <div className="text-center text-xs text-zinc-400 pt-2">
                  <span>New to GDG MMDU? </span>
                  <button
                    type="button"
                    onClick={() => handleTabChange('signup')}
                    className="text-[#4285F4] hover:text-blue-400 font-semibold underline underline-offset-4 cursor-pointer"
                  >
                    Create an account
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.form
                key="signup-form"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                onSubmit={handleSignupSubmit}
                className="space-y-4"
                noValidate
              >
                {/* Name Fields (2 columns on sm) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <InputGroup
                    label="First Name"
                    placeholder="e.g. Rahul"
                    type="text"
                    id="signup-first-name"
                    name="firstName"
                    value={signupFirstName}
                    onChange={(e) => setSignupFirstName(e.target.value)}
                    error={errors.firstName}
                    required
                    autoComplete="given-name"
                  />
                  <InputGroup
                    label="Last Name"
                    placeholder="e.g. Sharma"
                    type="text"
                    id="signup-last-name"
                    name="lastName"
                    value={signupLastName}
                    onChange={(e) => setSignupLastName(e.target.value)}
                    error={errors.lastName}
                    required
                    autoComplete="family-name"
                  />
                </div>

                <InputGroup
                  label="Institutional Email"
                  placeholder="e.g. rahul.sharma@mmumullana.org"
                  type="email"
                  id="signup-email"
                  name="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  error={errors.email}
                  required
                  autoComplete="email"
                />

                <InputGroup
                  label="Password"
                  placeholder="Create a password"
                  type={showPassword ? 'text' : 'password'}
                  id="signup-password"
                  name="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  error={errors.password}
                  helper="Requires at least 8 characters."
                  required
                  autoComplete="new-password"
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-zinc-400 hover:text-white p-1 transition-colors cursor-pointer"
                      title={showPassword ? 'Hide password' : 'Show password'}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                />

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-[#4285F4] hover:bg-[#1a73e8] text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow active:scale-[0.99] disabled:opacity-60 cursor-pointer mt-2"
                >
                  {isSubmitting ? (
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Bottom Toggle Note */}
                <div className="text-center text-xs text-zinc-400 pt-2">
                  <span>Already a member? </span>
                  <button
                    type="button"
                    onClick={() => handleTabChange('login')}
                    className="text-[#4285F4] hover:text-blue-400 font-semibold underline underline-offset-4 cursor-pointer"
                  >
                    Log in
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
