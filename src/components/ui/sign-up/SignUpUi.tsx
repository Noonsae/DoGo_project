import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function SignModal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="w-[500px] bg-white  p-6 rounded-lg shadow-lg max-w-sm ">{children}</div>
    </div>
  );
}
