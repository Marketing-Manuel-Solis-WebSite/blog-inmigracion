'use client';

import { Facebook, Twitter, Linkedin, Link2, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export default function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-body-sm text-ink-500 mr-2">Compartir:</span>
      
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-xl bg-ink-100/50 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all group"
        aria-label="Compartir en Facebook"
      >
        <Facebook className="w-5 h-5 text-ink-600 group-hover:text-white" />
      </a>

      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-xl bg-ink-100/50 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-all group"
        aria-label="Compartir en Twitter"
      >
        <Twitter className="w-5 h-5 text-ink-600 group-hover:text-white" />
      </a>

      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-xl bg-ink-100/50 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-all group"
        aria-label="Compartir en LinkedIn"
      >
        <Linkedin className="w-5 h-5 text-ink-600 group-hover:text-white" />
      </a>

      <button
        onClick={copyToClipboard}
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
          copied
            ? 'bg-accent-emerald text-white'
            : 'bg-ink-100/50 hover:bg-accent-gold hover:text-white'
        }`}
        aria-label="Copiar enlace"
      >
        {copied ? (
          <Check className="w-5 h-5" />
        ) : (
          <Link2 className="w-5 h-5 text-ink-600 group-hover:text-white" />
        )}
      </button>
    </div>
  );
}
