import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image"; // 1. Import the Image component
import Article from "@/models/Article"; 
import dbConnect from "@/lib/mongodb"; 

export default async function Home() {
  await dbConnect();

  const featuredArticles = await Article.find({ featured: true }).lean();

  return (
    <div>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col space-y-10">

        {/* Header Section */}
        <div className="relative flex flex-col items-center justify-center min-h-[70vh] space-y-6 w-full text-center">
          <div className="absolute inset-0 -z-10 hidden lg:flex items-center justify-center pointer-events-none">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="w-150 h-150 text-teal-50 fill-current opacity-70"
            >
              <path
                d="M45.7,-76.3C58.9,-69.3,69.1,-55.3,77.2,-40.5C85.3,-25.7,91.3,-10.1,88.7,4.3C86.1,18.8,75,32.1,64.2,44.2C53.4,56.3,43,67.2,29.8,74.6C16.6,82,-3.4,85.9,-21.8,81.7C-40.2,77.5,-57,65.2,-68.8,50.1C-80.6,35,-87.4,17.5,-86.3,0.6C-85.2,-16.3,-76.2,-32.6,-64.3,-45.5C-52.4,-58.4,-37.6,-67.9,-23,-73.8C-8.4,-79.7,6.4,-82,21.5,-80.7C36.6,-79.4,45.7,-76.3,45.7,-76.3Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-teal-600 relative z-10">
            Welcome to my blog!
          </h1>
          <p className="text-lg max-w-2xl text-slate-600 leading-relaxed relative z-10">
            I have made this website to keep track of things that I found interesting. Hope you also enjoy the stuff that I have written! Scroll down to browse through my featured articles.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {featuredArticles.map((article, index) => (
            <Link
              href={`/articles/${article.slug}`}
              key={article._id?.toString() || index} 
              className="rounded-xl border border-slate-300 overflow-hidden flex flex-col hover:border-teal-500 hover:cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 transition-colors"
            >
              {/* 2. Make this container relative, and render the Image component inside */}
              <div className="relative w-full aspect-video bg-slate-100 flex items-center justify-center text-slate-400 font-medium group-hover:bg-slate-200 transition-colors overflow-hidden">
                {article.banner ? (
                  <Image 
                    src={article.banner} 
                    alt={article.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105" 
                  />
                ) : (
                  <span>No Image Available</span> // Fallback if the database has no URL
                )}
              </div>

              <div className="p-6 flex flex-col">
                <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                  {article.title}
                </h2>
                <p className="text-slate-600">{article.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Button Wrapper */}
        <div className="flex justify-center">
          <Link href="/articles">
            <Button size="lg" className="bg-teal-600 text-lg p-6 hover:bg-teal-700 hover:cursor-pointer">
              More Articles
            </Button>
          </Link>
        </div>

      </main>
    </div>
  );
}
