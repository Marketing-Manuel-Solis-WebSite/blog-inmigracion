import Image from 'next/image';
import { Author } from '@/types';

interface AuthorCardProps {
  author: Author;
  publishedAt: string;
  readingTime: string;
}

export default function AuthorCard({ author, publishedAt, readingTime }: AuthorCardProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-ink-100">
        {author.avatar ? (
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent-gold to-accent-copper">
            <span className="text-cream-50 font-serif font-bold text-lg">
              {author.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div>
        <p className="font-medium text-ink-900">{author.name}</p>
        <p className="text-body-sm text-ink-500">
          {formattedDate} · {readingTime}
        </p>
      </div>
    </div>
  );
}
