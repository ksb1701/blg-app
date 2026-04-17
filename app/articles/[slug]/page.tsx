import connectToDatabase from "@/lib/mongodb";
import Article from "@/models/Article";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectToDatabase();
  const article = await Article.findOne({ slug: slug }).lean();

  if (!article) {
    notFound();
  }

  return (
    // Removed the horizontal padding from the main wrapper to allow the header to expand
    <main className="w-full pb-16">
      
      {/* 1. Header Container: Expanded width, distinct from the reading column */}
      <header className="relative w-full max-w-7xl mx-auto mb-12 sm:mb-16 border-b border-slate-200">
        
        {/* 2. Image Container: Sharp edges, wider aspect ratio */}
        <div className="relative w-full bg-slate-100 aspect-video sm:aspect-21/9 z-0">
          {article.banner && (
            <Image 
              src={article.banner} 
              alt={article.title} 
              fill 
              priority 
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover" 
            />
          )}
        </div>

        {/* 3. Text Container: Solid white block, anchored to bottom-left */}
        <div className="relative z-10 w-full px-4 sm:px-0 sm:absolute sm:bottom-0 sm:left-0 sm:max-w-2xl md:max-w-3xl">
          {/* Solid background padding overriding the image */}
          <div className="bg-white pt-6 sm:p-6 md:p-8 lg:pr-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-4">
              {article.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
              {article.description}
            </p>
          </div>
        </div>
      </header>
      
      {/* 4. Reading Column: Centered, narrow, and easy to read */}
      <article className="prose prose-lg md:prose-xl prose-slate mx-auto px-4 sm:px-6 max-w-3xl prose-a:text-teal-600 hover:prose-a:text-teal-700 prose-headings:tracking-tight prose-img:rounded-xl">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {article.content}
        </ReactMarkdown>
      </article>
    </main>
  );
}
