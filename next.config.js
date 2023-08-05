/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    minimumCacheTTL: 31536000,
},
}

module.exports = nextConfig

