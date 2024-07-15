/** @type {import('next').NextConfig} */
const nextConfig = {
    // env:{
    //     NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: 'de8gwnof9',
    //     NEXT_PUBLIC_CLOUDINARY_PRESET_NAME: 'zg2ve6so'
    // },
    images: {
        remotePatterns: [
            {
                hostname: 'res.cloudinary.com',
                protocol: 'https',
                
            }
        ]
    }
};

export default nextConfig;
