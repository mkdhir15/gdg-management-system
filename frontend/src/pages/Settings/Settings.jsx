import React, { useState, useRef, useEffect } from 'react';
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
  Camera,
  UploadCloud,
  Trash2,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProfileAvatar } from '../../components/common/ProfileAvatar';

export const Settings = () => {
  const { currentUser, role, updateProfileImage } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { toast } = useToast();

  const [notificationPreview, setNotificationPreview] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [density, setDensity] = useState('comfortable'); // 'comfortable' | 'compact'
  const [isSaving, setIsSaving] = useState(false);

  // Mentee / User Profile Photo Upload State
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(
    currentUser?.profileImage || currentUser?.avatar || null
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPhotoSaving, setIsPhotoSaving] = useState(false);

  useEffect(() => {
    setPreviewImage(currentUser?.profileImage || currentUser?.avatar || null);
  }, [currentUser]);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file (PNG, JPG, or WebP).');
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhoto = () => {
    if (!previewImage) return;
    setIsPhotoSaving(true);
    setTimeout(() => {
      if (updateProfileImage) {
        updateProfileImage(previewImage);
      }
      setIsPhotoSaving(false);
      setSelectedFile(null);
      toast.success(
        'Profile photo updated in session! Ready for Django multipart upload endpoint (POST /api/users/profile-image/).'
      );
    }, 400);
  };

  const handleRemovePhoto = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    if (updateProfileImage) {
      updateProfileImage(null);
    }
    toast.info('Profile photo removed. Displaying default neutral avatar.');
  };

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
              {/* Profile Avatar with Upload Support */}
              <div className="relative inline-block mb-3">
                <ProfileAvatar
                  src={previewImage}
                  name={currentUser?.name}
                  role={role}
                  size="xl"
                  editable={true}
                  onImageSelected={(file, previewUrl) => {
                    setSelectedFile(file);
                    setPreviewImage(previewUrl);
                  }}
                  className="mx-auto ring-4 ring-slate-100 dark:ring-slate-800"
                />
              </div>

              {/* Mentee / User Image Upload Actions */}
              <div className="mt-2 mb-4 space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="profile-photo-upload"
                  aria-label="Upload Profile Photo"
                />

                {selectedFile ? (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={handleSavePhoto}
                      disabled={isPhotoSaving}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#1a73e8] hover:bg-[#1557b0] text-white transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      {isPhotoSaving ? 'Saving...' : 'Save Photo'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewImage(currentUser?.profileImage || currentUser?.avatar || null);
                      }}
                      className="px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      {previewImage ? 'Change Photo' : 'Add Profile Photo'}
                    </button>
                    {previewImage && (
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Remove Photo"
                        aria-label="Remove Photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {currentUser?.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                {currentUser?.email}
              </p>

              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                <Shield className="w-3 h-3" />
                {role} • {currentUser?.domain || currentUser?.domainName || 'Core Team'}
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
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {currentUser?.status || 'Active'}
                  </span>
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
