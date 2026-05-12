/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      const ext = config.externals;
      config.externals = [
        ...(Array.isArray(ext) ? ext : ext ? [ext] : []),
        "@sparticuz/chromium",
        "puppeteer-core",
      ];
    }
    return config;
  },
};

export default nextConfig;
