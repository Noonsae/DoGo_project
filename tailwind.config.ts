import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      },
      screens: {
        xs: '480px', // 작은 스마트폰
        xxs: '360px' // 매우 작은 스마트폰
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)', 'sans-serif']
      }
    }
  },
  plugins: [require('tailwind-scrollbar-hide')]
};
export default config;
