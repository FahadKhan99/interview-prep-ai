const SpinnerLoader = () => {
  return (
    <div role="status">
      <svg className="inline w-5 h-5 animate-spin" viewBox="0 0 50 50">
        {/* Background circle */}
        <circle
          className="text-cyan-900 hover:text-cyan-600 transition-colors duration-300"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />

        {/* Rotating arc */}
        <circle
          className="text-gray-200 hover:text-cyan-400 transition-colors duration-300"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="92 150" // arc length
          strokeDashoffset="0"
        />
      </svg>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SpinnerLoader;
