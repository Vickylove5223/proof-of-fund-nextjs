/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/guides/:slug',
        destination: '/:slug',
        permanent: true,
      },
      {
        source: '/home-2',
        destination: '/',
        permanent: true,
      },
      {
        source: '/australia-student-visa-proof-of-funds',
        destination: '/australia-student-visa-proof-of-funds-from-nigeria-2026-complete-requirements-guide',
        permanent: true,
      },
      {
        source: '/how-to-use-real-estate-and-land-as-proof-of-funds-for-your-visa',
        destination: '/guides',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/guides',
        permanent: true,
      },
      {
        source: '/how-to-get-proof-of-funds',
        destination: '/how-to-get-proof-of-fund-in-nigeria',
        permanent: true,
      },
      {
        source: '/how-to-get-proof-of-funds-in-nigeria',
        destination: '/how-to-get-proof-of-fund-in-nigeria',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
