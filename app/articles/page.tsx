import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import Link from "next/link";
import Article from "@/models/Article";
import dbConnect from "@/lib/mongodb";

export default async function Articles({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  await dbConnect();

  // 1. Setup Pagination & Search Variables
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 6; // Articles per page
  const skip = (currentPage - 1) * limit;
  const query = searchParams?.query || "";

  // 2. Build MongoDB Query
  // Searches for titles containing the query string (case-insensitive)
  const dbQuery = query ? { title: { $regex: query, $options: "i" } } : {};

  // 3. Fetch Data & Total Count Concurrently
  const [articles, totalCount] = await Promise.all([
    Article.find(dbQuery).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Article.countDocuments(dbQuery),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  // Helper to generate pagination URLs keeping the search query intact
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col space-y-10">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-teal-600">All Articles</h1>
          <p className="text-lg text-slate-600">Browse through my thoughts and writings.</p>
        </div>
        
        {/* Native form updates the URL to ?query=value automatically */}
        <form method="GET" action="/articles" className="w-full md:w-72">
          <Field>
            <FieldLabel className="sr-only">Search your articles</FieldLabel>
            <Input 
              type="text" 
              name="query"
              defaultValue={query}
              placeholder="Search articles..." 
              className="border-slate-300 focus-visible:ring-teal-600"
            />
          </Field>
        </form>
      </div>

      {/* Articles List / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.length === 0 ? (
          <p className="text-slate-500">No articles found.</p>
        ) : (
          articles.map((article) => (
            <Link 
              href={`/articles/${article.slug}`} 
              key={article._id?.toString()}
              className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col hover:border-teal-500 hover:shadow-sm transition-colors cursor-pointer group"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                {article.title}
              </h2>
              <p className="text-slate-600">{article.description}</p>
            </Link>
          ))
        )}
      </div>

      {/* Pagination Wrapper */}
      {totalPages > 1 && (
        <div className="pt-8 border-t border-slate-200">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious href={createPageURL(currentPage - 1)} className="hover:text-teal-600" />
                </PaginationItem>
              )}
              
              {/* Render simple page numbers (expand logic if dealing with dozens of pages) */}
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink 
                      href={createPageURL(pageNum)} 
                      isActive={currentPage === pageNum}
                      className={currentPage === pageNum ? "bg-teal-50 text-teal-700 hover:bg-teal-100 border-none" : ""}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext href={createPageURL(currentPage + 1)} className="hover:text-teal-600" />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </main>
  );
}
