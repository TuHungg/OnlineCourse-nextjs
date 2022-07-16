/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['firebasestorage.googleapis.com', 'via.placeholder.com'],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    env: {
        BASE_URL: process.env.BASE_URL,
    },
}

module.exports = nextConfig
