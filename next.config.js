/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        // The Academy lives at academy.onethousanddrones.com — don't duplicate
        // its landing here. Forward every /academy entry point straight to it.
        source: '/academy',
        destination: 'https://academy.onethousanddrones.com',
        permanent: false,
        basePath: false,
      },
    ]
  },
}
module.exports = nextConfig
