import Link from 'next/link';

const EventSection = () => {
  return (
    <section className="w-full max-w-[1300px] px-[50px] h-[440px] mx-auto pt-[80px] pb-[60px] grid grid-cols-2 gap-[35px] text-[20px] text-[#636363] font-medium">
      {/* 스와이퍼로 슬라이드 들어가 들어갈 예정 */}
      <article className="relative w-full max-w-[580px] h-[300px] p-[40px] bg-[#EFEFEF] rounded-[8px]">
        <h4 className="text-[32px] font-semibold">Event 01</h4>
        <p className="mt-[12px]">Lorem, ipsum.</p>
        <Link href="/event" className="absolute right-[40px] bottom-[40px] w-full p-[10px] text-right">
          이벤트 보러가기
        </Link>
      </article>

      <article className="relative w-full max-w-[580px] h-[300px] p-[40px] bg-[#EFEFEF] rounded-[8px]">
        <h4 className="text-[32px] font-semibold">Event 02</h4>
        <p className="mt-[12px]">Lorem, ipsum dolor.</p>
        <Link href="/event" className="absolute right-[40px] bottom-[40px] w-full p-[10px] text-right">
          이벤트 보러가기
        </Link>
      </article>
    </section>
  );
}

export default EventSection