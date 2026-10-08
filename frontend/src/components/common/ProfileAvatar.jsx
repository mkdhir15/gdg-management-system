import React, { useState, useRef } from 'react';
import { User, Camera, UploadCloud, Loader2 } from 'lucide-react';

/**
 * Reusable ProfileAvatar Component
 * Supports:
 * 1. Existing profile image
 * 2. Blank profile image (neutral initials / user icon fallback)
 * 3. Upload state (device file picker when editable)
 * 4. Loading state
 * 5. Error state (graceful fallback if image fails to load)
 */
export const ProfileAvatar = ({
  src,
  name = '',
  role,
  size = 'md',
  editable = false,
  onImageSelected,
  isLoading = false,
  className = '',
  alt,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef(null);

  // Size mapping
  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
    '2xl': 'w-28 h-28 text-2xl',
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
    xl: 'w-10 h-10',
    '2xl': 'w-14 h-14',
  };

  const resolvedSize = sizeClasses[size] || sizeClasses.md;
  const resolvedIconSize = iconSizes[size] || iconSizes.md;

  // Extract initials for blank avatar fallback
  const getInitials = (text) => {
    if (!text) return '';
    const parts = text.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(name);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onImageSelected) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageSelected(file, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    if (editable && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const hasValidImage = src && !imageError;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      {...props}
    >
      <div
        onClick={handleAvatarClick}
        className={`relative rounded-full overflow-hidden flex items-center justify-center transition-all ${resolvedSize} ${
          editable ? 'cursor-pointer group hover:ring-2 hover:ring-[#4285F4]/60' : ''
        } ${
          hasValidImage
            ? 'bg-zinc-800'
            : 'bg-zinc-800 dark:bg-zinc-800 text-zinc-300 font-semibold border border-white/10'
        }`}
        title={editable ? 'Click to upload profile photo' : name || 'User Avatar'}
      >
        {/* Loading Spinner State */}
        {isLoading ? (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center">
            <Loader2 className={`${resolvedIconSize} text-white animate-spin`} />
          </div>
        ) : hasValidImage ? (
          /* 1. Existing Profile Image with Error Fallback */
          <img
            src={src}
            alt={alt || name || 'Profile Avatar'}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          /* 2. Blank Profile Image (Neutral Initials or User Icon) */
          <div className="w-full h-full flex items-center justify-center bg-[#1A1A1A] text-zinc-300">
            {initials ? (
              <span className="font-medium tracking-wider">{initials}</span>
            ) : (
              <User className={`${resolvedIconSize} text-zinc-400`} />
            )}
          </div>
        )}

        {/* 3. Upload Overlay State (when editable) */}
        {editable && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
            <Camera className="w-4 h-4 mb-0.5" />
            {size === 'xl' || size === '2xl' ? (
              <span className="text-[10px] font-medium">Update</span>
            ) : null}
          </div>
        )}
      </div>

      {/* Hidden File Picker Input for Mentee/User upload */}
      {editable && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={handleFileChange}
          aria-label="Upload profile image"
        />
      )}

      {/* Role-based status indicator dot if role is passed */}
      {role && size !== 'xs' && (
        <span
          className={`absolute bottom-0 right-0 rounded-full ring-2 ring-black ${
            size === 'sm' || size === 'xs' ? 'w-2 h-2' : 'w-2.5 h-2.5'
          } ${
            role === 'ADMIN'
              ? 'bg-blue-500'
              : role === 'LEAD'
              ? 'bg-amber-500'
              : role === 'MENTOR'
              ? 'bg-emerald-500'
              : 'bg-zinc-400'
          }`}
          title={`Role: ${role}`}
        />
      )}
    </div>
  );
};
