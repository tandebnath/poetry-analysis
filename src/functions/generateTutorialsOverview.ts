import { tutorialsListData } from "@/modules/TutorialsListData";
import { tutorialsOverviewIntroduction,  tutorialsOverviewConclusion} from "@/modules/TutorialsOverviewData";

// Helper function to sanitize descriptions
const sanitizeDescription = (description: string): string => {
  return description.trim().replace(/\.$/, ""); // Remove trailing whitespace and period
};

// Helper function to generate Tutorials Overview data
export const generateTutorialsOverview = () => {
  const introduction = tutorialsOverviewIntroduction.trim();
  const conclusion = tutorialsOverviewConclusion.trim();

  const seriesCount = tutorialsListData.length;

  const seriesNarratives = tutorialsListData.map((series, seriesIndex) => {
    // Determine the appropriate start phrase based on series position
    let startPhrase = "In the";
    if (seriesIndex === seriesCount - 1) {
      startPhrase = "Finally, in the";
    } else if (seriesIndex > 0) {
      startPhrase = "Next, in the";
    }

    // Series Introduction
    const seriesIntro = `${startPhrase} "<a href="/tutorials/list#${series.seriesSlug}" class="underline" style="color: var(--accent);">${series.seriesName}</a>" series, you will learn ${
      series.seriesSlug === "social-media-analytics"
        ? "the foundational concepts of social media analytics."
        : series.seriesSlug === "text-analysis-python"
        ? "essential techniques for processing and analyzing text data."
        : "how to present your data effectively through various visualization techniques."
    }`;

    // Tutorials Details
    const tutorialDetails = series.tutorials
      .map((tutorial, tutorialIndex, array) => {
        const separator =
          tutorialIndex === array.length - 2
            ? ", and " // Use ", and" for the second-last tutorial
            : tutorialIndex < array.length - 1
            ? ", " // Use ", " for all other tutorials
            : ""; // No separator for the last tutorial

        const formattedDescription = `, where you'll ${sanitizeDescription(
          tutorial.description
        )}`;

        if (tutorial.contentType === "text") {
          return `<a href="/tutorials/list/${series.seriesSlug}/${tutorial.slug}" class="underline" style="color: var(--accent);">${tutorial.title}</a>${formattedDescription}${separator}`;
        } else if (tutorial.contentType === "link") {
          return `<a href="${tutorial.content}" target="_blank" rel="noopener noreferrer" class="underline" style="color: var(--accent);">${tutorial.title}</a><sup style="font-size: 0.8rem; color: var(--text); text-decoration: none;"> (↗)</sup>${formattedDescription}${separator}`;
        }
      })
      .join("");

    // Combine the series intro and tutorial details
    return {
      type: "series",
      content: `${seriesIntro} The tutorials include ${tutorialDetails}.`,
      seriesName: series.seriesName,
      seriesSlug: series.seriesSlug,
    };
  });

  return [
    { type: "paragraph", content: introduction },
    ...seriesNarratives,
    { type: "paragraph", content: conclusion },
  ];
};