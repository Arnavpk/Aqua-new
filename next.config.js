/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['res.cloudinary.com'],
        remotePatterns: [
            {
                protocol: 'http', // switch to https in production
                hostname: 'localhost',
                port: '1337',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https', // switch to https in production
                hostname: 'uat.aquaimagicaa.com',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https', // switch to https in production
                hostname: 'www.aquaimagicaa.com',
                pathname: '/**',   
            },
            {
                protocol: 'https', // switch to https in production
                hostname: 'www.shankuswaterpark.com',
                pathname: '/**',
            },
            // Your new Strapi production subdomain
            {
                protocol: 'https',
                hostname: 'strapi.aquaimagicaa.com',
                pathname: '/uploads/**',
            }
        ],
    },
};

module.exports = nextConfig;