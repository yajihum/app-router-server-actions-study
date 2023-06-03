export const JumpIcon = () => {
  return (
    <svg
      className="h-6 w-6 text-gray-300"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />{" "}
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
};

export const ChatIcon = () => {
  return (
    <svg
      className="h-5 w-5 text-orange-400"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {" "}
      <path stroke="none" d="M0 0h24v24H0z" />{" "}
      <rect x="3" y="5" width="18" height="14" rx="2" />{" "}
      <polyline points="3 7 12 13 21 7" />
    </svg>
  );
};

export const ArrowBottomIcon = () => {
  return (
    <svg
      className="h-8 w-8 text-blue-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </svg>
  );
};
