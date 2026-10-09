/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
  },
  async redirects() {
    return [
      { source: '/dashboard/sermon', destination: '/dashboard/sermon-project', permanent: false },
      { source: '/dashboard/sermon/library', destination: '/dashboard/sermon-project/library', permanent: false },
      { source: '/dashboard/sermon/library.js', destination: '/dashboard/sermon-project/library', permanent: false },
      { source: '/dashboard/testimony', destination: '/dashboard/testimony-diary', permanent: false },
      { source: '/dashboard/prayer-log', destination: '/dashboard/prayer', permanent: false },
      { source: '/dashboard/accomplishments', destination: '/dashboard/accomplishment', permanent: false },
    ];
  },
};

export default nextConfig;
