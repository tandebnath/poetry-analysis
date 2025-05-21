"use client";

import Heading from "@/components/Heading";
import { motion } from "framer-motion";
import Link from "next/link";
import { aboutData } from "@/static/about";
import { pageSettingsData } from "@/static/pageSettings";
import { richTextToHtml } from "@/utils/richTextParser";

// Colors
const accentColor = "#36aa5d";
const textColor = "#2f2f2f";
const secondaryTextColor = "#7f7f7f";

export default function About() {
  if (!aboutData || aboutData.length === 0) {
    return <p>No about content available.</p>;
  }

  // Optional dynamic title (fallback used here)
  const pageTitle =
    pageSettingsData.find((p) => p.page === "about")?.title || "A Fairer Future for Poetry";

  // Format and sort sections
  const formattedData = aboutData
    .map((doc: any) => ({
      ...doc,
      id: String(doc.id),
      contentHtml: doc.content ? richTextToHtml(doc.content) : "",
    }))
    .sort((a, b) => (a.order || a.id) - (b.order || b.id));

  return (
    <motion.div initial="hidden" animate="visible" exit="hidden">
      {/* Breadcrumbs */}
      <div className="breadcrumbs text-base mb-4" style={{ color: secondaryTextColor }}>
        <ul className="flex space-x-2">
          <li>
            <Link href="/" className="hover:underline" style={{ color: secondaryTextColor }}>
              Home
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li className="font-semibold" style={{ color: textColor }}>
            About
          </li>
        </ul>
      </div>

      {/* Page Heading */}
      <div className="mb-6">
        <Heading text={pageTitle} />
      </div>

      {/* About Content */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
          },
        }}
      >
        {formattedData.map((section) => (
          <motion.div
            key={section.id}
            className="mb-6 text-base leading-relaxed tracking-normal"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: section.id * 0.1 }}
            viewport={{ once: true }}
            style={{ color: textColor }}
            dangerouslySetInnerHTML={{ __html: section.contentHtml }}
          />
        ))}
      </motion.section>

      <div className="clear-both" />
    </motion.div>
  );
}