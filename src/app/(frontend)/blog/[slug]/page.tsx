import { blogData } from '@/static/blog'
import { notFound } from 'next/navigation'
import BlogPostContent from '@/components/BlogPostContent'
import Link from 'next/link'
import { richTextToHtml } from '@/utils/richTextParser'
import { SerializedEditorState, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'

interface Params {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }))
}

const BlogPostPage: React.FC<Params> = ({ params }) => {
  const blogPost = blogData.find((post) => post.slug === params.slug) as {
    title: string
    author: string
    datePosted: string
    readTime: number
    longDescription: SerializedEditorState<SerializedLexicalNode>
  }

  if (!blogPost) {
    return notFound()
  }

  console.log(blogPost.longDescription);

  const longDescriptionHtml = richTextToHtml(blogPost?.longDescription)

  console.log(longDescriptionHtml);

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm mb-4 text-gray-500">
        <ul className="flex space-x-2">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li className="text-gray-700 font-semibold">{blogPost.title}</li>
        </ul>
      </div>

      {/* Blog Post Content */}
      <BlogPostContent
        title={blogPost.title}
        author={blogPost.author}
        datePosted={blogPost.datePosted}
        readTime={blogPost.readTime}
        longDescriptionHtml={longDescriptionHtml}
      />
    </div>
  )
}

export default BlogPostPage
