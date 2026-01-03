"use client";

export default function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://amankhan.dev";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aman Khan",
    jobTitle: "Tech Lead",
    description:
      "Tech Lead with 8+ years of experience in full-stack web development, specializing in building scalable applications using React, Node.js, and Kubernetes.",
    url: siteUrl,
    image: `${siteUrl}/images/profile.jpeg`,
    email: "aman2810khan@gmail.com",
    telephone: "+91-9911233029",
    sameAs: [
      "https://www.linkedin.com/in/aman-khan-57a0b67b",
      // Add other social profiles here
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "IIIT Delhi",
      description: "B.Tech in Computer Science and Engineering",
    },
    worksFor: {
      "@type": "Organization",
      name: "Innovaccer",
      jobTitle: "SDE-3",
    },
    knowsAbout: [
      "React",
      "Node.js",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Kubernetes",
      "Docker",
      "Microservices",
      "Full Stack Development",
      "Web Development",
      "Software Engineering",
    ],
  };

  const professionalProfileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Aman Khan",
      jobTitle: "Tech Lead",
      description:
        "Tech Lead with 8+ years of experience in full-stack web development",
      image: `${siteUrl}/images/profile.jpeg`,
      email: "aman2810khan@gmail.com",
      url: siteUrl,
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Aman Khan — Tech Lead",
    url: siteUrl,
    description:
      "Portfolio website of Aman Khan, Tech Lead and Full Stack Engineer",
    author: {
      "@type": "Person",
      name: "Aman Khan",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalProfileSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

