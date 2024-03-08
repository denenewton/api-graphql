/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh2.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
      },
    ],
  },
};

export default nextConfig;
