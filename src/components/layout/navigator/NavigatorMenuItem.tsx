import Link from 'next/link';

const NavigationMenuItem = ({ href, label }: { href: string; label: string }) => {
  return (
    <li>
      <Link
        href={href}
        className="px-[16px] py-[12px] w-full h-[43px] flex items-center text-base text-[#2c2c2c] font-normal hover:text-blue-500 rounded-[8px] hover:bg-[#f8f8f8]"
      >
        {label}
      </Link>
    </li>
  );
};

export default NavigationMenuItem;
