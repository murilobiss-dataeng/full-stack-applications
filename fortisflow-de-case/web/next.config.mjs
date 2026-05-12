/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
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
