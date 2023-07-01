import { ReactNode } from "react";

export function Button({
  children,
  type = "button",
  onClick,
}: {
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="rounded-lg bg-blue-500 hover:bg-blue-400 px-2 md:px-4 py-2 text-white text-xs md:text-sm focus:border-blue-300 focus:outline-none focus:ring"
    >
      {children}
    </button>
  );
}
