"use client";

export default function Footer() {
  return (
    <footer className="mt-10 text-center text-yellow-600 text-xs opacity-80 py-4 border-t border-yellow-800">
      &copy; {new Date().getFullYear()} Global Growth Peer Connection (GGPC). All rights reserved.
    </footer>
  );
}
