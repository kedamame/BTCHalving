import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
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
      {
        source: "/embed.png",
        destination: "/api/embed",
        permanent: false,
      },
      {
        source: "/screenshot1.png",
        destination: "/api/screenshot1",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
