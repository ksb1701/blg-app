import { Button } from "@/components/ui/button";
import Link from "next/link";
import Article from "@/models/Article"; // Adjust import path as needed
import dbConnect from "@/lib/mongodb"; // You will need a standard Mongoose connection utility

export default async function Home() {
  // Ensure the database is connected before querying
  await dbConnect(); 

  // Fetch only featured articles and convert them to plain JS objects
  const featuredArticles = await Article.find({ featured: true }).lean();

  return (
    <div>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col space-y-10">
        
        {/* Header Section */}
        <div className="space-y-4 max-w-2xl text-center mx-auto sm:text-left sm:mx-0">
          <h1 className="text-4xl font-extrabold tracking-tight text-teal-600">
            Welcome to my blog!
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            I have made this website to keep track of things that I found interesting. Hope you also enjoy the stuff that I have written! Here are a few featured articles to start with:
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {featuredArticles.map((article, index) => (
            <div 
              key={article._id?.toString() || index} // Better to use _id for React keys
              className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col transition-colors hover:border-teal-500 hover:shadow-sm hover:cursor-pointer group"
            >
              <div className="h-48 bg-slate-100 flex items-center justify-center text-slate-400 font-medium group-hover:bg-slate-200 transition-colors">
                {article.banner}
              </div>
              
              <div className="p-6 flex flex-col">
                <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                  {article.title} {/* Changed from article.name to match schema */}
                </h2>
                <p className="text-slate-600">{article.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Button Wrapper */}
        <div className="flex justify-center sm:justify-start">
          <Link href="/articles">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white transition-colors">
              More Articles &gt;
            </Button>
          </Link>
        </div>

      </main>
    </div>
  );
}
