export default function Loading() {
  return (
    <main className="w-full pb-16 animate-pulse">
      
      {/* 1. Header Container Skeleton */}
      <header className="relative w-full max-w-7xl mx-auto mb-12 sm:mb-16 border-b border-slate-200">
        
        {/* 2. Image Container Skeleton */}
        <div className="relative w-full bg-slate-200 aspect-video sm:aspect-21/9 z-0">
        </div>

        {/* 3. Text Container Skeleton */}
        <div className="relative z-10 w-full px-4 sm:px-0 sm:absolute sm:bottom-0 sm:left-0 sm:max-w-2xl md:max-w-3xl">
          <div className="bg-white pt-6 sm:p-6 md:p-8 lg:pr-12">
            <div className="h-10 sm:h-12 md:h-16 bg-slate-200 rounded w-3/4 mb-4"></div>
            <div className="h-10 sm:h-12 md:h-16 bg-slate-200 rounded w-1/2 mb-4"></div>
            
            <div className="h-6 bg-slate-200 rounded w-full mb-2 mt-6"></div>
            <div className="h-6 bg-slate-200 rounded w-5/6"></div>
          </div>
        </div>
      </header>
      
      {/* 4. Reading Column Skeleton */}
      <article className="mx-auto px-4 sm:px-6 max-w-3xl space-y-4">
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-[95%]"></div>
        <div className="h-4 bg-slate-200 rounded w-[90%]"></div>
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-4/5 mb-8"></div>

        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-[85%]"></div>
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-[92%]"></div>
      </article>
    </main>
  );
}
