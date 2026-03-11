import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/.well-known/farcaster.json",
        destination:
          "https://api.farcaster.xyz/miniapps/hosted-manifest/019cdcbb-8e68-39cf-5012-1c51c3295ae4",
        permanent: false, // 307 Temporary Redirect
      },
      {
        source: "/icon.png",
        destination: "/api/icon",
        permanent: false,
      },
      {
        source: "/image.png",
        destination: "/api/og",
        permanent: false,
      },
      {
        source: "/splash.png",
        destination: "/api/splash",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
