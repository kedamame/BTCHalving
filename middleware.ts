import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "ja"],
  defaultLocale: "en",
  localeDetection: true,
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
