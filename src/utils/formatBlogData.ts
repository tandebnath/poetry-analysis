// utils/formatBlogData.ts
import { richTextToHtml } from "@/utils/richTextParser";

export function formatBlogData(rawData: any[]) {
  return rawData.map((post) => ({
    ...post,
    id: String(post.id),
    shortDescriptionHtml: richTextToHtml(post.shortDescription),
    longDescriptionHtml: richTextToHtml(post.longDescription),
    keywords: post.keywords.map((k: any) => k.keyword.toLowerCase()), // normalize
  }));
}