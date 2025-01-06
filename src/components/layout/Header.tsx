import React from 'react'

const Header = () => {
  return (
    <div className="w-full h-[86px] fixed">
      <div className="w-full max-w-[1200px] h-[86px] mx-auto flex flex-row justify-between items-center border border-black">
        <h1>Dogo</h1>
        <div className="flex flex-row">
          
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className='mr-[26px]'>
            <path
              d="M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0Z"
              fill="#1C1B1F"
            />
          </svg>

          <div>
            <p>ham_Btn</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;