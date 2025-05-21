"use client";

import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface TutorialsContentProps {
  title: string;
  description: string;
  contentHtml: string;
  seriesSlug: string;
}

const TutorialsContent: React.FC<TutorialsContentProps> = ({
  title,
  description,
  contentHtml,
  seriesSlug,
}) => {
  const router = useRouter();

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      style={{
        color: "var(--text)",
      }}
    >
      {/* Back to Tutorials Button */}
      <button
        onClick={() => router.push(`/tutorials/list#${seriesSlug}`)}
        className="mb-6 px-4 py-2 text-sm font-semibold text-white"
        style={{
          backgroundColor: "var(--accent)",
          border: "none",
        }}
      >
        <FaArrowLeft className="inline mr-2" />
        Back to List of Tutorials
      </button>

      {/* Title */}
      <motion.h1
        className="text-3xl font-bold mb-4"
        style={{ color: "var(--primary)" }}
        variants={fadeInVariants}
      >
        {title}
      </motion.h1>

      {/* Rich HTML content */}
      <motion.div
        className="text-base leading-relaxed space-y-6"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
        variants={fadeInVariants}
      />
    </motion.div>
  );
};

export default TutorialsContent;