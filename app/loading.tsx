export default function Loading() {
  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo/Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-cream-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-accent-gold border-t-transparent animate-spin"></div>
        </div>
        
        {/* Loading Text */}
        <p className="text-ink-600 font-medium animate-pulse">
          Cargando contenido...
        </p>
      </div>
    </div>
  );
}
