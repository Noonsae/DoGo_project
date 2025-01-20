/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['pix8.agoda.net', 'dsggwbvtcrwuopwelpxy.supabase.co'] // Supabase 도메인 추가
  },
  
  webpack(config) {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/, // 폰트 파일 처리
      type: 'asset/resource',
    });
    return config;
  }
};

export default nextConfig;
