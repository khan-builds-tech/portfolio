"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar } from "lucide-react";
import Image from "next/image";

interface Experience {
  company: string;
  role: string;
  startYear: string;
  endYear: string;
  description: string[];
}

const experiences: Experience[] = [
  {
    company: "Innovaccer",
    role: "SDE-3",
    startYear: "Jan 2022",
    endYear: "Present",
    description: [
      "Built a UI interface for an LLM-powered Smart Assist using RAG pipelines and vector-DB-based knowledge retrieval, enabling faster clinical support responses and real-time assistance",
      "Engineered an ambient documentation workflow on the frontend that consumes streaming transcription data and auto-populates structured ticket fields",
      "Led cross-functional integration of a centralized Appointment Scheduler module used across four internal teams, reducing scheduling-related incidents by 25%",
      "Integrated backend-driven UI configuration through a GUI Console, reducing frontend code changes by 45% and cutting regression testing effort by two days per release",
      "Collaborated closely with design teams to convert complex Figma flows into pixel-perfect React implementations across multiple modules",
    ],
  },
  {
    company: "Collegedunia",
    role: "Software Engineer",
    startYear: "Mar 2021",
    endYear: "Jan 2022",
    description: [
      "Built high-impact SEO-optimized pages using Next.js, improving PageSpeed score from 44 → 92 and reducing load time from 5.1s → 1.6s",
      "Increased CARHP user engagement by integrating an interactive car review section, resulting in a 17% increase in session duration and 22% increase in user interactions",
      "Architected and delivered Zollege, a centralized college information platform with 5,000+ listings, leading a team of 5 engineers",
      "Developed responsive pages for 3dot14's ad-tech platform with content served from Ghost CMS, improving average mobile load performance by 35%",
    ],
  },
  {
    company: "Newgen Software",
    role: "Senior Software Engineer",
    startYear: "Jun 2017",
    endYear: "Mar 2021",
    description: [
      "Migrated frontend modules from JSF to React, improving deployment velocity by 30% and enabling scalable, modern UI foundations",
      "Optimized performance of a core BPM tool, reducing latency by 55% and improving enterprise client satisfaction",
      "Led the development of iForms—a configurable UI builder used by 12 enterprise clients to create over 500 complex forms",
      "Designed a dynamic theme designer enabling end-to-end branding configuration, reducing frontend redesign effort by 40%",
      "Managed a 7-engineer team delivering 20+ features with a 98% on-time delivery rate",
    ],
  },
];

// Company logo mapping
const companyLogos: Record<string, string> = {
  "Innovaccer": "/images/innovaccer.png",
  "Collegedunia": "/images/collegedunia.jpg",
  "Newgen Software": "/images/newgen.png",
};

// Company website mapping
const companyWebsites: Record<string, string> = {
  "Innovaccer": "https://innovaccer.com/",
  "Collegedunia": "https://collegedunia.com/",
  "Newgen Software": "https://newgensoft.com/",
};

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 scroll-mt-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
            Experience
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 px-4 max-w-2xl mx-auto">
            My professional journey and key achievements
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Animated connecting line - Hidden on mobile */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-1">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="w-full h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 rounded-full"
                style={{ transformOrigin: "top" }}
              />
            </div>

            {/* Experience cards */}
            <div className="space-y-8 md:space-y-12 lg:space-y-16">
              {experiences.map((exp, index) => (
                <ExperienceCard 
                  key={index} 
                  experience={exp} 
                  index={index} 
                  isLast={index === experiences.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  index,
  isLast,
}: {
  experience: Experience;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const gradients = [
    "from-blue-500 via-purple-500 to-pink-500",
    "from-purple-500 via-pink-500 to-blue-500",
    "from-pink-500 via-blue-500 to-purple-500",
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative flex items-start gap-6 md:gap-8"
    >
      {/* Timeline node with company logo - Hidden on mobile */}
      <div className="hidden md:block relative z-10 flex-shrink-0">
        {companyWebsites[experience.company] ? (
          <a
            href={companyWebsites[experience.company]}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
              whileHover={{ scale: 1.1 }}
              className={`relative w-16 h-16 rounded-full shadow-lg flex items-center justify-center border-4 border-white dark:border-gray-900 overflow-hidden transition-all duration-300 hover:shadow-xl ${
                experience.company === "Innovaccer" 
                  ? "bg-white dark:bg-white" 
                  : "bg-white dark:bg-gray-800"
              }`}
            >
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradient} opacity-10`}></div>
              {companyLogos[experience.company] && (
                <div className="relative w-12 h-12 z-10 rounded-full overflow-hidden">
                  <Image
                    src={companyLogos[experience.company]}
                    alt={`${experience.company} logo`}
                    fill
                    className="object-cover rounded-full"
                    sizes="48px"
                  />
                </div>
              )}
            </motion.div>
          </a>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
            className={`relative w-16 h-16 rounded-full shadow-lg flex items-center justify-center border-4 border-white dark:border-gray-900 overflow-hidden ${
              experience.company === "Innovaccer" 
                ? "bg-white dark:bg-white" 
                : "bg-white dark:bg-gray-800"
            }`}
          >
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradient} opacity-10`}></div>
            {companyLogos[experience.company] && (
              <div className={`relative w-12 h-12 z-10 rounded-full overflow-hidden ${
                experience.company === "Innovaccer" ? "bg-white" : ""
              }`}>
                <Image
                  src={companyLogos[experience.company]}
                  alt={`${experience.company} logo`}
                  fill
                  className="object-cover rounded-full"
                  sizes="48px"
                />
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Card content */}
      <div className="flex-1 group">
        {/* Main card */}
        <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 lg:p-10 border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent transition-all duration-500 overflow-hidden shadow-sm group-hover:shadow-md">
          {/* Gradient border on hover */}
          <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0`}></div>
          <div className="absolute inset-[2px] bg-white dark:bg-gray-800 rounded-3xl -z-0"></div>

          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 dark:opacity-10`}></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.2),transparent_50%)]"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {experience.role}
              </h3>
              <h4 className={`text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-4`}>
                {experience.company}
              </h4>
              
              {/* Date badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700/50 rounded-full border border-gray-200 dark:border-gray-600"
              >
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300">
                  {experience.startYear} - {experience.endYear}
                </span>
              </motion.div>
            </div>

            {/* Description list */}
            <ul className="space-y-3 md:space-y-4">
              {experience.description.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.2 + idx * 0.1 }}
                  className="flex items-start gap-3 group/item"
                >
                  <div className={`mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r ${gradient} group-hover/item:scale-150 transition-transform duration-200`}></div>
                  <span className="text-sm md:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Decorative corner element */}
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`}></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
