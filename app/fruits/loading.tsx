export default function Loading() {
  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3 mb-4 animate-pulse"></div>
        <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-4/5 animate-pulse"></div>
      </div>

      <div className="space-y-8">
        {[1, 2].map((section) => (
          <div key={section}>
            <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-48 mb-4 animate-pulse"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4 mb-3 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6 animate-pulse"></div>
                    <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-zinc-500 dark:text-zinc-400 mt-8 text-sm">
        Loading fruits catalog from server...
      </p>
    </div>
  );
}
