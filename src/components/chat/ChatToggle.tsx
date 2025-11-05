'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatToggleProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function ChatToggle({ onClick, isOpen }: ChatToggleProps) {
  if (isOpen) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 group"
      title="Ask about Devin"
    >
      <MessageCircle className="w-6 h-6" />
      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
        AI
      </div>
    </button>
  );
}