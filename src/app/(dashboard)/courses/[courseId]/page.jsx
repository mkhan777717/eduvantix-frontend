import CourseClient from "./CourseClient";
import { coursesRegistry } from "@/data/courses/index";

/* ─────────────────────────────────────────────
   Course Detail Page — Dynamic SEO
   generateMetadata() generates unique SEO for
   every course slug from the coursesRegistry.
   This overrides the dashboard group noindex
   so individual course pages ARE indexed.
───────────────────────────────────────────── */

export async function generateMetadata({ params }) {
  const { courseId } = await params;
  const course = coursesRegistry[courseId];

  if (!course) {
    return {
      title: "Course Not Found — Eduvantix",
      robots: { index: false, follow: false },
    };
  }

  const title = `${course.title} Course — Free Online | Eduvantix`;
  const description = `Learn ${course.title} on Eduvantix. ${course.desc} ${course.lessons} lessons · ${course.duration} · ${course.difficulty} level. ${course.tags.join(", ")}. Enroll free today.`;
  const canonical = `https://eduvantix.com/courses/${courseId}`;
  const keywords = [
    `${course.title} course`,
    `${course.title} course online free`,
    `learn ${course.title}`,
    `${course.title} tutorial`,
    ...course.tags,
    `${course.difficulty} ${course.category}`,
    "Eduvantix course",
    "free coding course India",
    "tech course online",
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "Eduvantix",
      locale: "en_IN",
      images: [
        {
          url: "/logo-black-text.webp",
          width: 1200,
          height: 630,
          alt: `${course.title} Course on Eduvantix`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@eduvantix",
      title,
      description,
      images: ["/logo-black-text.webp"],
    },
  };
}

/* Build Course JSON-LD for a given courseId */
export function buildCourseJsonLd(courseId) {
  const course = coursesRegistry[courseId];
  if (!course) return null;

  const url = `https://eduvantix.com/courses/${courseId}`;

  return [
    /* Course Schema */
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "@id": `${url}#course`,
      name: course.title,
      description: course.desc,
      url,
      image: "https://eduvantix.com/logo.webp",
      provider: {
        "@type": "Organization",
        name: "Eduvantix",
        url: "https://eduvantix.com",
        logo: "https://eduvantix.com/logo.webp",
      },
      educationalLevel: course.difficulty,
      timeRequired: course.duration,
      numberOfCredits: course.lessons,
      inLanguage: "en",
      teaches: course.tags,
      hasCourseInstance: [
        {
          "@type": "CourseInstance",
          courseMode: "online",
          courseWorkload: course.duration,
          inLanguage: "en",
          instructor: {
            "@type": "Organization",
            name: "Eduvantix Instructors",
            url: "https://eduvantix.com/about",
          },
        },
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url,
        seller: {
          "@type": "Organization",
          name: "Eduvantix",
        },
      },
      about: {
        "@type": "Thing",
        name: course.category,
      },
    },
    /* BreadcrumbList */
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://eduvantix.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Courses",
          item: "https://eduvantix.com/courses",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: course.title,
          item: url,
        },
      ],
    },
    /* FAQPage */
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `What is the ${course.title} course about?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: course.desc,
          },
        },
        {
          "@type": "Question",
          name: `How long is the ${course.title} course?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `The ${course.title} course is ${course.duration} long with ${course.lessons} lessons. It is designed for ${course.difficulty} learners.`,
          },
        },
        {
          "@type": "Question",
          name: `Is the ${course.title} course free?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Eduvantix offers free access to many ${course.title} course lessons. Premium plans unlock additional content, live classes, and mentorship.`,
          },
        },
        {
          "@type": "Question",
          name: `What will I learn in the ${course.title} course?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `You will learn: ${course.tags.join(", ")}. ${course.desc}`,
          },
        },
      ],
    },
  ];
}

export default async function CoursePage({ params }) {
  const { courseId } = await params;
  const jsonLd = buildCourseJsonLd(courseId);

  return (
    <>
      {jsonLd && jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <CourseClient />
    </>
  );
}
