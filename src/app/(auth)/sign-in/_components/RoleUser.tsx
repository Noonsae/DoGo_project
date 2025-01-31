import React from 'react';
import FindIdModal from './FindIdModal';
import FindPasswordModal from './FindPasswordModal/FindPasswordModal';
import KakaoSignIn from './KakaoSignIn';
import DividerIcon from '@/components/ui/icon/DividerIcon';

const Role = () => {
  return (
    <></>
    // <div>
    //   <form
    //     onSubmit={(e) => {
    //       e.preventDefault();
    //       handleLogin();
    //     }}
    //   >
    //     <input
    //       type="email"
    //       placeholder={form.activeTab === 'user' ? '일반 회원 이메일' : '사업자 이메일'}
    //       value={form.email}
    //       onChange={(e) => setForm({ ...form, email: e.target.value })}
    //       className="w-full sm:w-[400px] h-[48px] pt-[8px] pb-[8px] px-[16px] border border-neutral-300 rounded-[8px] mb-[12px] focus:outline-none focus:ring-2 focus:ring-black"
    //     />
    //     <input
    //       type="password"
    //       placeholder="비밀번호"
    //       value={form.password}
    //       onChange={(e) => setForm({ ...form, password: e.target.value })}
    //       className="w-full sm:w-[400px] h-[48px] pt-[8px] pb-[8px] px-[16px] border border-neutral-300 rounded-[8px] mb-[12px] focus:outline-none focus:ring-2 focus:ring-black"
    //     />
    //     <div className="flex items-center justify-end text-sm text-gray-500 mb-4">
    //       <button
    //         type="button"
    //         onClick={() => setForm({ ...form, isFindIdModalOpen: true })}
    //         className="m-[2px] hover:underline"
    //       >
    //         아이디 찾기
    //       </button>
    //       <DividerIcon />
    //       <button
    //         type="button"
    //         onClick={() => setForm({ ...form, isFindPasswordOpen: true })}
    //         className="hover:underline"
    //       >
    //         비밀번호 찾기
    //       </button>
    //     </div>
    //     <button
    //       type="submit"
    //       className="w-full max-w-[400px] text-[20px] bg-[#B3916A] font-pretendard font-semibold leading-[135%] not-italic text-white py-3 rounded-lg hover:bg-[#a37e5f] transition mb-[12px] sm:mb-[16px]"
    //     >
    //       로그인
    //     </button>
    //   </form>
    //   <p className=" w-full sm:w-[400px] p-[12px] flex justify-center text-neutral-600">
    //     계정이 없으신가요?
    //     <button onClick={handleSignUp} className="text-[#534431] ml-3 font-semibold">
    //       회원가입
    //     </button>
    //   </p>
    //   <div className="w-full sm:w-[400px] flex items-center my-6">
    //     <hr className="flex-grow border-neutral-300" />
    //     <span className="px-4 text-sm text-neutral-400">간편 로그인</span>
    //     <hr className="flex-grow border-neutral-300" />
    //   </div>
    //   {form.isFindIdModalOpen && <FindIdModal onClose={() => setForm({ ...form, isFindIdModalOpen: false })} />}
    //   {form.isFindPasswordOpen && <FindPasswordModal onClose={() => setForm({ ...form, isFindPasswordOpen: false })} />}
    //   <div className="text-center mt-8">
    //     <KakaoSignIn />
    //   </div>
    //   <div className="flex w-full max-w-[400px] justify-center items-center text-sm text-gray-500 mt-4">
    //     <button
    //       type="button"
    //       className="flex-1 text-right m-[2px] hover:underline"
    //       onClick={() => window.open('https://www.kakao.com/policy/privacy', '_blank')}
    //     >
    //       개인정보처리방침
    //     </button>

    //     <DividerIcon />

    //     <button
    //       type="button"
    //       className="flex-1 text-left hover:underline"
    //       onClick={() => window.open('https://www.kakao.com/policy/terms?type=a&lang=ko', '_blank')}
    //     >
    //       이용약관
    //     </button>
    //   </div>
    // </div>
  );
};
// business는 카카오소셜로그인 절대 금지시키기 위한 컴포넌트 분리를 계획중임.
export default Role;
