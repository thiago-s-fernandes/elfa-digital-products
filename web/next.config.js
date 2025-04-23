/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SITE_ENV_URL: process.env.SITE_ENV_URL,
    API_BASE_URL: process.env.API_BASE_URL
  }
};

export default nextConfig;
