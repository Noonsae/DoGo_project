import React from 'react'

const EventSection = () => {
  return (
    <section className="w-full max-w-[1200px] h-[360px] mx-auto pt-[80px] pb-[60px] grid grid-cols-2">
      {/* 스와이퍼로 슬라이드 들어가 들어갈 예정 */}
      <div className="w-[585px] h-[300px] bg-[#E3E3E3] px-[40px] rounded-[8px] flex flex-col justify-evenly">
        <p>Event 01</p>
        <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure fugit rem repudiandae nam eum ipsum sint temporibus eveniet officiis voluptatum!</span>
        <a href="#" className='w-full text-right'>이벤트 보러가기</a>
      </div> 
      <div className="w-[585px] h-[300px] bg-[#E3E3E3] px-[40px] rounded-[8px] flex flex-col justify-evenly">
        <p>Event 02</p>
        <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure fugit rem repudiandae nam eum ipsum sint temporibus eveniet officiis voluptatum!</span>
        <a href="#" className='w-full text-right'>이벤트 보러가기</a>
      </div> 
  
    </section>
  );
}

export default EventSection