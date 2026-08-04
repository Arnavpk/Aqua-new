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
            // add production Strapi domain here once deployed, e.g.:
            // { protocol: 'https', hostname: 'cms.aquaimagica.com', pathname: '/uploads/**' }
        ],
    },
};

module.exports = nextConfig;