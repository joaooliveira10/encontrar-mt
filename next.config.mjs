/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    typedRoutes: true,
  },
  // Adicionar configurações para lidar com SSR
  output: 'standalone',
  trailingSlash: false,
  // Configurações específicas para desenvolvimento
  swcMinify: true,
  reactStrictMode: true,
};
export default nextConfig;
