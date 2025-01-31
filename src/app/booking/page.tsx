'use client';
import { useEffect, useState } from 'react';
import Sidebar from './_components/Sidebar';
import { useRouter, useSearchParams } from 'next/navigation';
import { browserSupabase } from '@/supabase/supabase-client';

const countryCodes = [
  { code: '+82', name: '대한민국 (South Korea)' },
  { code: '+1', name: '미국 (USA)' },
  { code: '+81', name: '일본 (Japan)' },
  { code: '+86', name: '중국 (China)' }
];

interface RoomType {
  id: string;
  room_name: string;
  price: number;
}

interface UserType {
  email: string;
  phone_number: string;
}

const booking = () => {
  const [selectedCode, setSelectedCode] = useState(countryCodes[0].code);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const searchParams = useSearchParams();
  const [room, setRoom] = useState<RoomType | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

  const roomId = searchParams.get('room_id');
  useEffect(() => {
    const fetchData = async () => {
      const supabase = browserSupabase();

      // 현재 로그인된 유저 가져오기
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', authError.message);
        return;
      }

      const userId = authData?.user?.id; // 로그인된 사용자 ID 가져오기
      if (!roomId || !userId) return;

      // 객실 정보 가져오기
      const { data: roomData, error: roomError } = await supabase
        .from('rooms')
        .select('id, room_name, price')
        .eq('id', roomId)
        .single();
      if (roomError) {
        console.error('객실 정보를 불러오는 중 오류 발생:', roomError.message);
      } else {
        setRoom(roomData);
      }

      // ✅ 유저 정보 가져오기 (이메일 & 전화번호)
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('email, phone_number')
        .eq('id', userId)
        .single();
      if (userError) {
        console.error('유저 정보를 불러오는 중 오류 발생:', userError.message);
      } else {
        setUser(userData);
      }
    };

    fetchData();
  }, [roomId]);

  const router = useRouter();
  const handlePayment = () => {
    router.push('/booking/[id]');
  };
  return (
    // 디자인은 나중에
    <div className="flex flex-col lg:flex-row min-h-screen ">
      <Sidebar />
      <div className="flex-1 container mx-auto px-4 py-28 pb-32 ">
        <div className="max-w-3xl mx-auto space-y-6 ">
          {/* 체크인 정보 */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-[892px]">
            <p className="text-lg font-semibold">체크인 정보</p>
            <p className="text-neutral-600">투숙객 1인의 정보를 입력해 주세요.</p>
          </div>

          {/* 투숙객 정보 */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-[892px]">
            <p className="text-lg font-semibold">투숙객 정보</p>
            <div className="flex flex-row items-center justify-around ">
              <div className="flex flex-col justify-center ">
                <p className="w-[400px]">영문 이름</p>
                <input className="border p-3  mt-2 rounded-md" placeholder="영문으로 작성해주세요" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="flex flex-col justify-end w-[400px]">영문 성</p>
                <input className="border p-3  mt-2 rounded-md" placeholder="영문으로 작성해주세요" />
              </div>
            </div>
          </div>

          {/* 연락처 정보 */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-[892px]">
            <p className="text-lg font-semibold">연락처 정보</p>
            <p className="flex flex-col justify-end s">이메일정보</p>
            <input value={user?.email || ''} className="border p-3 w-full mt-2 rounded-md" placeholder="이메일" />
            <label htmlFor="countryCode" className="text-lg font-semibold">
              휴대폰 번호
            </label>
            <div className="flex space-y-2 mt-2 justify-around flex-row">
              <div className="flex flex-col">
                <select
                  id="countryCode"
                  value={selectedCode}
                  onChange={(e) => setSelectedCode(e.target.value)}
                  className="border rounded-md p-3 mt-2 w-[400px]"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name} {country.code}
                    </option>
                  ))}
                </select>
              </div>
              <input
                value={user?.phone_number || ''}
                className="border mt-2 p-3 rounded-md w-[400px]"
                placeholder="전화번호를 입력해주세요"
              />
            </div>
          </div>

          {/* 요청 사항 */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-[892px]">
            <p className="text-lg font-semibold">요청 사항</p>
            <p className="text-gray-600 text-sm">
              별도의 요청 사항을 보장해드릴 수는 없으나, 숙소 측에서 서비스 제공을 위해 최선의 노력을 다할 것입니다.
            </p>

            <div className="mt-4 space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-5 h-5" />
                <span>유아용 침대 (가능한 경우)</span>
              </label>

              <input className="border p-3 w-full rounded-md" placeholder="별도의 요청사항을 작성해 주세요." />

              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-5 h-5" />
                <span>예약한 객실은 서로 붙여주세요. (가능한 경우)</span>
              </label>
            </div>
          </div>

          {/* 결제 수단 */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-[892px]">
            <p className="text-lg font-semibold">결제 수단</p>
            <p className="text-gray-600 text-sm">숙박하실 호텔을 결제하기 위한 방법을 선택해 주세요.</p>

            {/* 결제 수단 선택 (라디오 버튼) */}
            <div className="mt-4 flex space-x-8">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  className="w-5 h-5 accent-[#B3916A]"
                  checked={paymentMethod === 'credit'}
                  onChange={() => setPaymentMethod('credit')}
                />
                <span className="font-semibold text-gray-700">신용/체크카드</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  className="w-5 h-5 accent-[#B3916A]"
                  checked={paymentMethod === 'toss'}
                  onChange={() => setPaymentMethod('toss')}
                />
                <span className="font-semibold text-gray-700">토스페이먼트</span>
              </label>
            </div>

            {/* 신용/체크카드 결제 폼 */}
            {paymentMethod === 'credit' && (
              <div className="mt-4 p-6 border border-gray-200 rounded-lg bg-gray-50">
                <p className="font-semibold text-gray-700">신용/체크카드</p>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    카드번호 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="카드번호를 입력해 주세요."
                    className="w-full p-3 border border-gray-300 rounded-md mt-1"
                  />
                </div>

                <div className="flex space-x-4 mt-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                      유효 기간 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="MM / YYYY"
                      className="w-full p-3 border border-gray-300 rounded-md mt-1"
                    />
                  </div>

                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                      CVV <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="입력해 주세요."
                      className="w-full p-3 border border-gray-300 rounded-md mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 토스페이먼트 결제 안내 */}
            {paymentMethod === 'toss' && (
              <div className="mt-4 p-6 border border-gray-200 rounded-lg bg-gray-50">
                <p className="font-semibold text-gray-700">토스페이먼트</p>
                <p className="text-gray-600 text-sm mt-2">
                  토스페이먼트를 사용하여 간편하게 결제하세요. 결제 진행 시 토스 앱으로 연결됩니다.
                </p>

                <button className="mt-4 bg-blue-500 text-white w-full py-3 rounded-md font-semibold">
                  토스페이로 결제하기
                </button>
              </div>
            )}
          </div>

          {/* 동의 및 결제 버튼 */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-[892px]">
            <p className="text-lg font-semibold">다음 사항에 동의해 주세요.</p>

            <div className="mt-4 space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-sm">
                  본인은 만 14세 이상이며, DoGo.com 개인정보 보호정책에 명시된 바와 같이 본인과 본인이 부양하는
                  아동(해당되는 경우)의 필수적 개인 정보가 수집 및 활용되는 데 동의합니다.
                </span>
              </label>

              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-sm">
                  본인은 DoGo.com 개인정보 보호정책에 명시된 바와 같이 본인과 본인이 부양하는 아동(해당되는 경우)의
                  필수적 개인 정보가 대한민국 국내외 제 3자에게 제공 및 전송되는 것에 동의합니다.
                </span>
              </label>
            </div>

            <div className="mt-6 flex justify-end items-center">
              <span className="text-2xl  mr-[20px] font-semibold text-[#B3916A]">
                {room ? `${room.price.toLocaleString()}원` : 'Loading...'}
              </span>
              <button onClick={handlePayment} className="bg-[#B3916A] text-white px-6 py-3 rounded-md">
                결제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default booking;
