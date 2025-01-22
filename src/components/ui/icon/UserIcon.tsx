import React, { useState } from 'react';

const UserIcon = () => {
  const [userType, setUserType] = useState<string | null>(null);
  return (
    <div>
      <svg
        className={`mt-[20px] mb-[20px] mr-[16px] ml-[16px] ${
          userType === 'user' ? 'fill-[#534431]' : 'fill-[#444444]'
        }`}
        width="43"
        height="43"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.9998 22C27.8932 22 32.6665 17.2266 32.6665 11.3333C32.6665 5.43996 27.8932 0.666626 21.9998 0.666626C16.1065 0.666626 11.3332 5.43996 11.3332 11.3333C11.3332 17.2266 16.1065 22 21.9998 22ZM21.9998 27.3333C14.8798 27.3333 0.666504 30.9066 0.666504 38V43.3333H43.3332V38C43.3332 30.9066 29.1198 27.3333 21.9998 27.3333Z"
          fill="#444444"
        />
      </svg>
    </div>
  );
};

export default UserIcon;
