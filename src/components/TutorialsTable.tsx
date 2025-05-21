'use client';
import { tutorialsData } from "@/modules/TutorialsListData";
import Link from "next/link";
import { motion } from "framer-motion";

interface Tutorial {
  title: string;
  slug: string;
  description: string;
}

interface TutorialSeries {
  seriesName: string;
  seriesSlug: string;
  tutorials: Tutorial[];
}

const TutorialsTable: React.FC = () => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="px-[5%] py-[2%]"
    >
      <h1 className="text-3xl font-bold text-[#800020] mb-8">Tutorials</h1>

      <motion.table
        className="w-full table-auto border-collapse border border-[#B8B8B8] bg-[#2F2F2F] text-[#D6D6D6]"
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <thead className="bg-[#3B3B3B] text-left">
          <tr>
            <th className="p-4 border border-[#B8B8B8] text-[#f4b700]">Series Name</th>
            <th className="p-4 border border-[#B8B8B8] text-[#f4b700]">Tutorial Title</th>
            <th className="p-4 border border-[#B8B8B8] text-[#f4b700]">Description</th>
          </tr>
        </thead>
        <tbody>
          {tutorialsData.map((series: TutorialSeries, index: number) => (
            <motion.tr
              key={index}
              className="hover:bg-[#3B3B3B] transition-all"
              variants={fadeInVariants}
              custom={index}
            >
              {/* Series Name Column */}
              <td className="p-4 border border-[#B8B8B8] font-medium">
                {series.seriesName}
              </td>

              {/* Tutorial Titles Column */}
              <td className="p-4 border border-[#B8B8B8]">
                <ul className="list-disc pl-4">
                  {series.tutorials.map((tutorial, tutorialIndex) => (
                    <li key={tutorialIndex} className="mb-2">
                      <Link
                        href={`/tutorials/${series.seriesSlug}/${tutorial.slug}`}
                        className="text-[#f4b700] hover:underline"
                      >
                        {tutorial.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </td>

              {/* Descriptions Column */}
              <td className="p-4 border border-[#B8B8B8]">
                <ul className="list-disc pl-4">
                  {series.tutorials.map((tutorial, tutorialIndex) => (
                    <li key={tutorialIndex} className="mb-2">
                      {tutorial.description}
                    </li>
                  ))}
                </ul>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </motion.div>
  );
};

export default TutorialsTable;
