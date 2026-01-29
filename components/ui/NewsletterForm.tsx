'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { db, auth, APP_ID } from '@/lib/firebase';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function NewsletterForm({ variant = 'footer' }: { variant?: 'footer' | 'sidebar' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      // INTENTO DE AUTH: Si falla, lo ignoramos y seguimos intentando guardar
      if (!auth.currentUser) {
        try {
          await signInAnonymously(auth);
        } catch (authError) {
          console.warn("Auth anónima falló, intentando escritura pública...", authError);
        }
      }

      // GUARDAR DATOS
      await addDoc(collection(db, 'artifacts', APP_ID, 'public', 'data', 'subscribers'), {
        email,
        createdAt: serverTimestamp(),
        source: variant === 'footer' ? 'footer_form' : 'sidebar_form',
        active: true
      });
      
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error: any) {
      console.error("Error definitivo:", error);
      setStatus('error');
      
      // Diagnóstico preciso para ti
      if (error.code === 'permission-denied') {
        setErrorMessage('Permiso denegado: Revisa las Reglas de Firestore en la consola.');
      } else if (error.code === 'auth/admin-restricted-operation') {
        setErrorMessage('Falta activar "Anónimo" en Firebase Authentication.');
      } else {
        setErrorMessage('Error de conexión. Intenta de nuevo.');
      }
    }
  };

  return (
    <div className="w-full">
      {status === 'success' ? (
        <div className={`flex items-center gap-2 p-3 rounded-xl bg-accent-emerald/20 text-accent-emerald ${variant === 'footer' ? 'justify-center' : ''}`}>
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">¡Gracias por suscribirte!</span>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <form onSubmit={handleSubmit} className={`flex flex-col ${variant === 'footer' ? 'sm:flex-row' : ''} gap-3`}>
            <div className="relative flex-1">
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${variant === 'footer' ? 'text-ink-400' : 'text-ink-400'}`} />
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-accent-gold/20 transition-all ${
                  variant === 'footer' 
                    ? 'bg-ink-800 border-ink-700 text-cream-100 placeholder:text-ink-400 focus:border-accent-gold' 
                    : 'bg-white border-ink-200 text-ink-900 placeholder:text-ink-400 focus:border-accent-gold'
                }`}
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className={`whitespace-nowrap flex items-center justify-center gap-2 ${
                variant === 'footer' ? 'btn-gold' : 'btn-gold text-sm'
              } disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
              {status === 'loading' ? 'Guardando...' : 'Suscribirme'}
            </button>
          </form>
          {status === 'error' && (
            <p className="text-sm text-accent-ruby flex items-center gap-1 bg-red-100/10 p-2 rounded">
              <AlertCircle className="w-4 h-4" /> {errorMessage}
            </p>
          )}
        </div>
      )}
    </div>
  );
}