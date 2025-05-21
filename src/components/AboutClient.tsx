"use client";

import { motion } from "framer-motion";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import { richTextToHtml } from "@/utils/richTextParser";

interface AboutSection {
  id: string;
  order: number;
  type: "text" | "image";
  content?: DefaultTypedEditorState;
  imageUrl?: string | null;
  altText?: string;
  align?: "left" | "right";
}

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: index * 0.1, ease: "easeOut" },
  }),
};

export default function AboutClient({ aboutData }: { aboutData: AboutSection[] }) {
  return (
    <motion.section initial="hidden" animate="visible" exit="hidden">
      {aboutData.map((section, index) => {
        if (section.type === "text" && section.content) {
          return (
            <motion.div
              key={section.id}
              className="mb-6 text-base leading-relaxed tracking-normal"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              custom={index}
              dangerouslySetInnerHTML={{ __html: richTextToHtml(section.content) }}
            />
          );
        }

        if (section.type === "image" && section.imageUrl) {
          const alignment = section.align === "right" ? "float-right ml-6" : "float-left mr-6";
          return (
            <motion.img
              key={section.id}
              src={section.imageUrl}
              alt={section.altText || ""}
              className={`mb-6 max-w-[50%] ${alignment} rounded-lg shadow-md`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              custom={index}
            />
          );
        }

        return null;
      })}
      <div className="clear-both" />
    </motion.section>
  );
}
