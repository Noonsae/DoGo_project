import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function SignupModal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="w-[500px] flex p-[40px 32px 32px 32px] flex-col items-center g-[32px] bg-white rounded-[8px] ">
        {children}
      </div>
    </div>
  );
}
