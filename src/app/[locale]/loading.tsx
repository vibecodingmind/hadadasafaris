'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center">
      <div className="flex flex-col items-center">
        {/* Logo skeleton */}
        <div className="h-12 w-32 bg-[#B78A42]/10 rounded-lg animate-pulse" />

        {/* Loading bar */}
        <div className="mt-8 w-48 h-1 bg-[#B78A42]/10 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-gradient-to-r from-[#B78A42] to-[#D5BC92] rounded-full animate-[loading_1.5s_ease-in-out_infinite]" />
        </div>

        <p className="mt-4 text-xs text-[#333333]/25 tracking-[0.3em] uppercase">
          Loading...
        </p>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}
