'use client';

import { useState, useEffect } from 'react';
import { 
  User, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  serverTimestamp, 
  query 
} from 'firebase/firestore';
import { auth, db, googleProvider, APP_ID } from '@/lib/firebase';
import { MessageSquare, Send, LogOut, User as UserIcon, Reply, X } from 'lucide-react';
import Image from 'next/image';

interface Comment {
  id: string;
  text: string;
  userName: string;
  userPhoto: string;
  userId: string;
  parentId?: string | null; // ID del comentario padre si es respuesta
  createdAt: any;
  slug: string;
}

interface CommentsSectionProps {
  slug: string;
  title: string;
}

export default function CommentsSection({ slug, title }: CommentsSectionProps) {
  const [user, setUser] = useState<User | null>(null);
  const [text, setText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyTo, setReplyTo] = useState<string | null>(null); // ID del comentario al que respondemos
  const [loading, setLoading] = useState(true);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // Fetch Comments
  useEffect(() => {
    if (!slug) return;
    const q = query(collection(db, 'artifacts', APP_ID, 'public', 'data', 'comments'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loaded = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comment));
      // Filtrar por slug actual y ordenar por fecha
      const filtered = loaded
        .filter(c => c.slug === slug)
        .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setComments(filtered);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [slug]);

  const handleLogin = async () => {
    try { await signInWithPopup(auth, googleProvider); } 
    catch (e) { console.error("Login error:", e); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !text.trim()) return;

    try {
      await addDoc(collection(db, 'artifacts', APP_ID, 'public', 'data', 'comments'), {
        text: text.trim(),
        userName: user.displayName || 'Anónimo',
        userPhoto: user.photoURL || '',
        userId: user.uid,
        slug,
        parentId: replyTo, // null si es comentario nuevo, ID si es respuesta
        createdAt: serverTimestamp(),
      });
      setText('');
      setReplyTo(null);
    } catch (e) {
      console.error("Error sending comment:", e);
      alert("Error al enviar. Verifica tu conexión.");
    }
  };

  // Renderizar un comentario y sus respuestas
  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => {
    // Buscar respuestas para este comentario
    const replies = comments.filter(c => c.parentId === comment.id).reverse(); // Ordenar respuestas cronológicamente

    return (
      <div className={`flex gap-3 ${isReply ? 'ml-12 mt-3' : 'mt-6'}`}>
        <div className="flex-shrink-0">
          {comment.userPhoto ? (
            <Image src={comment.userPhoto} alt={comment.userName} width={isReply ? 32 : 40} height={isReply ? 32 : 40} className="rounded-full" />
          ) : (
            <div className={`rounded-full bg-ink-200 flex items-center justify-center font-bold text-ink-600 ${isReply ? 'w-8 h-8' : 'w-10 h-10'}`}>
              {comment.userName.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-ink-50">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-ink-900 text-sm">{comment.userName}</span>
              <span className="text-xs text-ink-400">
                {comment.createdAt?.seconds ? new Date(comment.createdAt.seconds * 1000).toLocaleDateString() : '...'}
              </span>
            </div>
            <p className="text-ink-700 text-body-md">{comment.text}</p>
            
            {!isReply && user && (
              <button 
                onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                className="text-xs text-accent-gold font-medium mt-2 flex items-center gap-1 hover:underline"
              >
                <Reply className="w-3 h-3" /> Responder
              </button>
            )}
          </div>

          {/* Formulario de respuesta específico */}
          {replyTo === comment.id && (
            <form onSubmit={handleSubmit} className="mt-3 ml-4 flex gap-2">
              <input
                autoFocus
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escribe tu respuesta..."
                className="flex-1 px-3 py-2 rounded-lg border border-accent-gold/30 text-sm focus:outline-none"
              />
              <button type="submit" className="bg-accent-gold text-white p-2 rounded-lg hover:bg-accent-copper">
                <Send className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => setReplyTo(null)} className="text-ink-400 p-2">
                <X className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Renderizar respuestas recursivamente */}
          {replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} isReply={true} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-12 bg-cream-100/30 rounded-3xl mt-12 px-4 lg:px-8 border border-ink-100" id="comentarios">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="w-6 h-6 text-accent-gold" />
        <h3 className="font-serif text-2xl text-ink-900">Comentarios ({comments.length})</h3>
      </div>

      {/* Input Principal */}
      {!user ? (
        <div className="text-center py-8 bg-white rounded-2xl border border-dashed border-ink-200">
          <p className="mb-4 text-ink-600">Únete a la conversación</p>
          <button onClick={handleLogin} className="btn-gold inline-flex items-center gap-2">
            <UserIcon className="w-4 h-4" /> Iniciar sesión con Google
          </button>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-ink-100 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-ink-600">Hola, {user.displayName}</span>
            </div>
            <button onClick={() => signOut(auth)} className="text-xs text-ink-400 hover:text-red-500">Cerrar Sesión</button>
          </div>
          {!replyTo && (
            <form onSubmit={handleSubmit}>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-3 bg-ink-50 rounded-xl border border-ink-100 focus:border-accent-gold outline-none min-h-[100px]"
                placeholder="¿Qué opinas sobre este tema?"
              />
              <div className="flex justify-end mt-2">
                <button type="submit" disabled={!text.trim()} className="btn-primary py-2 px-6 text-sm">
                  Publicar
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Lista de Comentarios Principales (parentId == null) */}
      <div className="space-y-2">
        {loading ? <p className="text-center text-ink-400">Cargando...</p> : 
         comments.filter(c => !c.parentId).map(comment => (
           <CommentItem key={comment.id} comment={comment} />
         ))
        }
        {!loading && comments.length === 0 && (
          <p className="text-center text-ink-400 italic">Sé el primero en comentar.</p>
        )}
      </div>
    </section>
  );
}