import React from 'react';

const Footer = () => {
  return (
    <div className="w-full h-[180px] py-[10px] bg-[#F9F9F9]">
      <p className="sr-only">Footer</p>
      <div className="w-full max-w-[1200px] mx-auto px-[12px] text-base text-[#666] font-normal">
        <div className="w-full h-[70px] flex flex-row justify-between items-center">
          <p>@ 2024 Dogo dev. 두게더</p>
          <ul className="flex flex-row justify-between items-center gap-8">
            <li>
              <a href="#">개인정보 처리방침</a>
            </li>
            <li>
              <a href="#">이용약관</a>
            </li>
            <li>
              <a href="#">공지사항</a>
            </li>
          </ul>
        </div>
        <hr className="text-[#E6E6E6]" />
        <div className="w-full h-[88px] text-[14px] text-[#999] font-normal py-[24px]">
          <p>
            <span>사업자 등록 번호 : 000-00-0000</span> &nbsp; | &nbsp;
            <span>연락처 : test@test.com</span> &nbsp; | &nbsp;
            <span>주소 : 서울시 관악구</span>
          </p>
          <p>호텔 중개 서비스에 관한 의무와 책임은 해당 서비스를 이용한 사용자에게 있습니다.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
