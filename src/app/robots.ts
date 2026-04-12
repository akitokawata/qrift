import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/qr/", "/callback/", "/api/"],
      },
    ],
    sitemap: "https://qrift.sarvest.jp/sitemap.xml",
  };
}
