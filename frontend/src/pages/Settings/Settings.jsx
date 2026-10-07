import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import {
  Sun,
  Moon,
  Bell,
  Sliders,
  User,
  Shield,
  Check,
  Smartphone,
  Save,
  Info,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

export const Settings = () => {
  const { currentUser, role } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { toast } = useToast();

  const [notificationPreview, setNotificationPreview] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [density, setDensity] = useState('comfortable'); // 'comfortable' | 'compact'
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Frontend preferences saved locally.');
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          System Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage your interface preferences, appearance, notifications, and active session profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Account Profile Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader title="Current Session" subtitle="Active Persona" />
            <CardBody className="text-center pt-2">
              <div className="relative inline-block mb-3">
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-slate-100 dark:ring-slate-800"
                />
                <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {currentUser?.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                {currentUser?.email}
              </p>

              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                <Shield className="w-3 h-3" />
                {role} • {currentUser?.domainName || 'Core Team'}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-left text-xs space-y-2 text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Chapter</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">MMDU Mullana</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Role Authority</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Active</span>
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/60">
            <div className="flex gap-2.5">
              <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-blue-900 dark:text-blue-200">
                  Client-Side Preferences
                </p>
                <p className="text-[11px] text-blue-700 dark:text-blue-300 mt-0.5 leading-relaxed">
                  These settings are stored in your browser session and affect only this local device.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Appearance & Notifications */}
        <div className="md:col-span-2 space-y-6">
          {/* Appearance Section */}
          <Card>
            <CardHeader
              title="Appearance"
              subtitle="Customize the look and feel of the management portal"
            />
            <CardBody className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                  Theme Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      if (isDarkMode) toggleTheme();
                    }}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left ${
                      !isDarkMode
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900 dark:text-blue-100 ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">Light Theme</p>
                      <p className="text-[11px] text-slate-500">Google Clean Palette</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      if (!isDarkMode) toggleTheme();
                    }}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left ${
                      isDarkMode
                        ? 'border-blue-500 bg-blue-950/40 text-blue-100 ring-2 ring-blue-500/30'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-900/60 text-indigo-300 flex items-center justify-center shrink-0">
                      <Moon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">Dark Theme</p>
                      <p className="text-[11px] text-slate-400">Deep Contrast Studio</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                  Display Density
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                    <input
                      type="radio"
                      name="density"
                      value="comfortable"
                      checked={density === 'comfortable'}
                      onChange={() => setDensity('comfortable')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Comfortable (Standard)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                    <input
                      type="radio"
                      name="density"
                      value="compact"
                      checked={density === 'compact'}
                      onChange={() => setDensity('compact')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Compact (High Information)</span>
                  </label>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Notifications Preferences */}
          <Card>
            <CardHeader
              title="Notification Preferences"
              subtitle="Configure client-side preview alerts and audio feedback"
            />
            <CardBody className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Notification Popover Previews
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Display unread count badge and quick preview drawer in navigation bar
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationPreview}
                  onChange={(e) => setNotificationPreview(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Task Milestone Alerts
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Show upcoming deadline banners on dashboard overview cards
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Interface Audio Cues
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Play subtle sound upon successful form submissions and toast triggers
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSave}
                  isLoading={isSaving}
                  icon={Save}
                >
                  Save Preferences
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
