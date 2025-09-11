export default function CircularProgress({
  progress,
  label,
}: {
  progress: number;
  label: string;
}) {
  const circumference = 2 * Math.PI * 40; // r = 40 → المحيط ≈ 251.2
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative w-16 h-16">
        <svg
          className="absolute top-0 left-0 w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="url(#progress-gradient)"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
          <defs>
            <linearGradient
              id="progress-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-sm text-gray-900 dark:text-gray-50">
          {label}
        </div>
      </div>
    </div>
  );
}
