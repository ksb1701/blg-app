import connectToDatabase from "@/lib/mongodb";
import Article from "@/models/Article";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";

// Next.js 15 requires params to be treated as a Promise
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Await the params to extract the slug
  const { slug } = await params;

  // 2. Connect to the database
  await connectToDatabase(); 

  // 3. Fetch the article. 
  // .lean() makes it pure JSON, which Next.js loves.
  const article = await Article.findOne({ slug: slug }).lean();

  // 4. Trigger Next.js's built-in 404 page if it doesn't exist
  if (!article) {
    notFound(); 
  }

  // 5. Render the page
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-10 pb-6 border-b border-slate-200">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-white tracking-tight text-teal-600 mb-4">
          {article.title}
        </h1>
        <p className="text-lg text-slate-500">
          {article.description}
        </p>
      </header>
      
      {/* Markdown Content rendered as HTML */}
      <article className="prose prose-lg prose-slate max-w-none prose-a:text-teal-600 hover:prose-a:text-teal-700 prose-headings:tracking-tight prose-img:rounded-xl">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {article.content}
        </ReactMarkdown>
      </article>
    </main>
  );
}
