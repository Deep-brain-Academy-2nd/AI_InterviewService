const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://dev.aistudios.com/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig;