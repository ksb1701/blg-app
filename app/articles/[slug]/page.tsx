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

  // 3. Fetch the article
  const article = await Article.findOne({ slug: slug }).lean();

  // 4. Trigger Next.js's built-in 404 page if it doesn't exist
  if (!article) {
    notFound();
  }

  // 5. Render the page
  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header Container */}
      <header className="relative mb-10">
        
        {/* Image Container:
            Maintains aspect ratios and acts as the positioning context for the text on larger screens.
        */}
        <div className="max-w-8xl relative w-full overflow-hidden rounded-2xl bg-slate-200 aspect-3/2 sm:aspect-2/1 lg:aspect-3/1 border border-slate-200 z-0">
          {/* FUTURE VERCEL BLOB IMAGE:
              <Image src={article.coverImage} alt="Cover" fill className="object-cover" />
          */}
        </div>

        {/* Text Container:
            Mobile: Flows naturally below the image (mt-6).
            Tablet/Desktop: Absolute positioned over the bottom-left of the image (sm:absolute).
        */}
        <div className="max-w-4xl relative z-10 mt-6 sm:mt-0 sm:absolute sm:bottom-0 sm:left-0 sm:p-8 pointer-events-none">
          
          {/* Wrapped in divs to ensure the inline-blocks stack vertically */}
          <div className="pointer-events-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-teal-600 mb-3 sm:mb-2 sm:bg-white sm:inline-block sm:px-2 sm:py-1 sm:-ml-2 sm:rounded">
              {article.title}
            </h1>
          </div>
          
          <div className="pointer-events-auto">
            <p className="text-lg text-slate-700 sm:bg-white/90 sm:inline-block sm:px-2 sm:py-1 sm:-ml-2 sm:rounded">
              {article.description}
            </p>
          </div>

        </div>
      </header>
      
      {/* Markdown Content rendered as HTML */}
      <article className="prose prose-lg prose-slate max-w-3xl prose-a:text-teal-600 hover:prose-a:text-teal-700 prose-headings:tracking-tight prose-img:rounded-xl">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {article.content}
        </ReactMarkdown>
      </article>
    </main>
  );
}
