/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'podcastr-images.s3.ap-south-1.amazonaws.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'podcastr-images.s3.amazonaws.com',
                port: '',
                pathname: '/**'
            }
        ],
    }
};

export default nextConfig;
