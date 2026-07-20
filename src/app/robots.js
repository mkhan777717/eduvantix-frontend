export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/admin/*",
        "/student/",
        "/student/*",
        "/mentor/",
        "/mentor/*",
        "/api/private/",
        "/login",
        "/reset-password",
      ],
    },
    sitemap: "https://eduvantix.com/sitemap.xml",
  };
}
