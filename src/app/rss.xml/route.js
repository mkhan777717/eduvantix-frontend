import { coursesRegistry } from "@/data/courses/index";

export async function GET() {
  const baseUrl = "https://eduvantix.com";

  let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Eduvantix Courses</title>
    <link>${baseUrl}</link>
    <description>Latest AI &amp; Tech courses from Eduvantix.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
`;

  Object.entries(coursesRegistry).forEach(([courseId, course]) => {
    rss += `    <item>
      <title><![CDATA[${course.title}]]></title>
      <link>${baseUrl}/courses/${courseId}</link>
      <description><![CDATA[${course.desc}]]></description>
      <category><![CDATA[${course.category}]]></category>
      <guid>${baseUrl}/courses/${courseId}</guid>
    </item>\n`;
  });

  rss += `  </channel>\n</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
