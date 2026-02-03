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
  query, 
  orderBy,
  doc,
  updateDoc,
  deleteField,
  getDoc
} from 'firebase/firestore';
import { auth, db, googleProvider, APP_ID } from '@/lib/firebase';
import { MessageSquare, Send, LogOut, User as UserIcon, Reply, X, Trash2 } from 'lucide-react';
import Image from 'next/image';

// Tipos de reacciones permitidas
type ReactionType = 'like' | 'love' | 'wow' | 'proud' | 'angry';

const REACTIONS: { type: ReactionType; emoji: string; label: string }[] = [
  { type: 'like', emoji: '👍', label: 'Me gusta' },
  { type: 'love', emoji: '❤️', label: 'Me encanta' },
  { type: 'wow', emoji: '😯', label: 'Me sorprende' },
  { type: 'proud', emoji: '👏', label: 'Me enorguellece' },
  { type: 'angry', emoji: '😡', label: 'Me enoja' },
];

interface Comment {
  id: string;
  text: string;
  userName: string;
  userPhoto: string;
  userId: string;
  parentId?: string | null;
  createdAt: any;
  slug: string;
  // Mapa de reacciones: { "userId": "reactionType" }
  reactions?: { [key: string]: ReactionType };
}

interface CommentsSectionProps {
  slug: string;
  title: string;
}

export default function CommentsSection({ slug, title }: CommentsSectionProps) {
  const [user, setUser] = useState<User | null>(null);
  const [text, setText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // Fetch Comments
  useEffect(() => {
    if (!slug) return;
    
    // Referencia a la colección
    const commentsRef = collection(db, 'artifacts', APP_ID, 'public', 'data', 'comments');
    
    // Consulta simple sin filtros complejos para evitar errores de índices en Firebase
    // Filtramos en memoria (client-side) que es seguro para volúmenes de blog moderados
    const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
      const loaded = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as Comment));

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
        userName: user.displayName || 'Usuario',
        userPhoto: user.photoURL || '',
        userId: user.uid,
        slug,
        parentId: replyTo,
        createdAt: serverTimestamp(),
        reactions: {} // Inicializar reacciones vacías
      });
      setText('');
      setReplyTo(null);
    } catch (e) {
      console.error("Error sending comment:", e);
      alert("Error al enviar. Intenta iniciar sesión nuevamente.");
    }
  };

  const handleReaction = async (commentId: string, type: ReactionType) => {
    if (!user) {
      handleLogin();
      return;
    }

    const commentRef = doc(db, 'artifacts', APP_ID, 'public', 'data', 'comments', commentId);
    
    try {
      // Obtenemos el comentario actual para ver si ya reaccionó
      const commentDoc = comments.find(c => c.id === commentId);
      if (!commentDoc) return;

      const currentReaction = commentDoc.reactions?.[user.uid];

      if (currentReaction === type) {
        // Si ya tiene esta reacción, la quitamos (toggle off)
        await updateDoc(commentRef, {
          [`reactions.${user.uid}`]: deleteField()
        });
      } else {
        // Si es nueva o diferente, la guardamos/actualizamos
        await updateDoc(commentRef, {
          [`reactions.${user.uid}`]: type
        });
      }
    } catch (e) {
      console.error("Error updating reaction:", e);
    }
  };

  // Componente para renderizar un comentario individual
  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => {
    // Buscar respuestas para este comentario
    const replies = comments
      .filter(c => c.parentId === comment.id)
      .sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0)); // Respuestas en orden cronológico ascendente

    // Calcular contadores de reacciones
    const reactionCounts = REACTIONS.reduce((acc, r) => {
      acc[r.type] = 0;
      return acc;
    }, {} as Record<ReactionType, number>);

    if (comment.reactions) {
      Object.values(comment.reactions).forEach(type => {
        if (reactionCounts[type] !== undefined) {
          reactionCounts[type]++;
        }
      });
    }

    const myReaction = user && comment.reactions ? comment.reactions[user.uid] : null;

    return (
      <div className={`flex gap-3 sm:gap-4 ${isReply ? 'ml-8 sm:ml-12 mt-4 relative' : 'mt-8'}`}>
        {/* Línea conectora para respuestas */}
        {isReply && (
          <div className="absolute -left-6 top-0 bottom-0 w-px bg-ink-200/50 rounded-full" />
        )}

        {/* Avatar */}
        <div className="flex-shrink-0">
          {comment.userPhoto ? (
            <Image 
              src={comment.userPhoto} 
              alt={comment.userName} 
              width={isReply ? 32 : 44} 
              height={isReply ? 32 : 44} 
              className="rounded-full border-2 border-cream-100 shadow-sm" 
            />
          ) : (
            <div className={`rounded-full bg-gradient-to-br from-ink-100 to-ink-200 flex items-center justify-center font-serif font-bold text-ink-600 border-2 border-cream-100 shadow-sm ${isReply ? 'w-8 h-8 text-xs' : 'w-11 h-11 text-lg'}`}>
              {comment.userName.charAt(0)}
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          <div className="bg-white p-4 sm:p-5 rounded-2xl rounded-tl-none shadow-editorial border border-ink-100/50 group hover:border-accent-gold/20 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-serif font-bold text-ink-900 text-sm sm:text-base mr-2">{comment.userName}</span>
                <span className="text-xs text-ink-400 font-medium">
                  {comment.createdAt?.seconds 
                    ? new Date(comment.createdAt.seconds * 1000).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) 
                    : 'Reciente'}
                </span>
              </div>
            </div>
            
            <p className="text-ink-700 text-body-md leading-relaxed whitespace-pre-wrap">{comment.text}</p>
            
            {/* Barra de Acciones */}
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-ink-50">
              {/* Botón Responder */}
              {user && (
                <button 
                  onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                  className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${replyTo === comment.id ? 'text-accent-gold' : 'text-ink-400 hover:text-accent-gold'}`}
                >
                  <Reply className="w-3.5 h-3.5" /> Responder
                </button>
              )}

              {/* Reacciones */}
              <div className="flex items-center gap-1">
                {REACTIONS.map((r) => (
                  <button
                    key={r.type}
                    onClick={() => handleReaction(comment.id, r.type)}
                    className={`relative group/emoji p-1 rounded-full transition-transform hover:scale-125 focus:outline-none ${myReaction === r.type ? 'bg-accent-gold/10 scale-110' : 'hover:bg-ink-50'}`}
                    title={r.label}
                  >
                    <span className="text-lg leading-none filter drop-shadow-sm">{r.emoji}</span>
                    {/* Contador individual si es > 0 */}
                    {reactionCounts[r.type] > 0 && (
                      <span className="absolute -top-2 -right-2 bg-white text-[10px] font-bold text-ink-600 px-1 rounded-full shadow-sm border border-ink-100">
                        {reactionCounts[r.type]}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Formulario de respuesta específico */}
          {replyTo === comment.id && (
            <div className="mt-4 ml-2 animate-fade-in">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    autoFocus
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={`Respondiendo a ${comment.userName}...`}
                    className="w-full pl-4 pr-12 py-3 rounded-xl border border-accent-gold/30 bg-cream-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-gold/20 text-sm transition-all shadow-inner"
                  />
                  <button 
                    type="button" 
                    onClick={() => setReplyTo(null)} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  type="submit" 
                  disabled={!text.trim()}
                  className="bg-accent-gold text-white p-3 rounded-xl hover:bg-accent-copper disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Renderizar respuestas recursivamente */}
          <div className="mt-2">
            {replies.map(reply => (
              <CommentItem key={reply.id} comment={reply} isReply={true} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-12 lg:py-16 relative" id="comentarios">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-cream-100/30 rounded-3xl border border-ink-100/50 -z-10" />
      
      <div className="px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-gold/10 rounded-lg">
              <MessageSquare className="w-6 h-6 text-accent-gold" />
            </div>
            <h3 className="font-display text-2xl text-ink-900">
              Comentarios <span className="text-ink-400 text-lg font-sans">({comments.length})</span>
            </h3>
          </div>
          
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-ink-600 hidden sm:inline-block">
                {user.displayName}
              </span>
              <button 
                onClick={() => signOut(auth)} 
                className="text-xs flex items-center gap-1 text-ink-400 hover:text-red-600 transition-colors px-3 py-1.5 rounded-full border border-ink-200 hover:bg-red-50"
              >
                <LogOut className="w-3 h-3" /> Salir
              </button>
            </div>
          )}
        </div>

        {/* Input Principal */}
        {!user ? (
          <div className="text-center py-10 px-6 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-ink-200 hover:border-accent-gold/50 transition-colors">
            <p className="font-serif text-lg text-ink-700 mb-2">¿Qué opinas sobre este tema?</p>
            <p className="text-body-sm text-ink-500 mb-6">Únete a la conversación con nuestra comunidad.</p>
            <button onClick={handleLogin} className="btn-gold inline-flex items-center gap-2 shadow-glow-gold hover:scale-105">
              <UserIcon className="w-4 h-4" /> Iniciar sesión con Google
            </button>
          </div>
        ) : (
          <div className="bg-white p-1 rounded-2xl shadow-editorial border border-ink-100 mb-10">
            {!replyTo && (
              <form onSubmit={handleSubmit} className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full p-4 pr-16 bg-transparent rounded-xl focus:outline-none min-h-[100px] resize-y text-ink-800 placeholder:text-ink-400"
                  placeholder="Escribe tu comentario aquí..."
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <button 
                    type="submit" 
                    disabled={!text.trim()} 
                    className="btn-primary py-2 px-4 text-sm rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:shadow-none"
                  >
                    Publicar <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Lista de Comentarios */}
        <div className="space-y-2 min-h-[200px]">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-accent-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-ink-400 italic font-serif">Aún no hay comentarios. ¡Sé el primero en participar!</p>
            </div>
          ) : (
            comments.filter(c => !c.parentId).map(comment => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}