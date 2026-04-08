import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { buttonVariants } from "@/components/ui/button"; // Added standard shadcn button styles
import { cn } from "@/lib/utils"; // Added standard shadcn utility
import { ChevronLeft, ChevronRight } from "lucide-react"; // Added standard shadcn icons
import Link from "next/link";
import Article from "@/models/Article";
import dbConnect from "@/lib/mongodb";

export default async function Articles({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>; 
}) {
  await dbConnect();

  const resolvedParams = await searchParams; 

  const currentPage = Number(resolvedParams?.page) || 1;
  const limit = 6; 
  const skip = (currentPage - 1) * limit;
  const query = resolvedParams?.query || "";

  // MongoDB Query
  const dbQuery = query ? { title: { $regex: query, $options: "i" } } : {};

  // Concurrent fetching
  const [articles, totalCount] = await Promise.all([
    Article.find(dbQuery).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Article.countDocuments(dbQuery),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const getVisiblePages = () => {
    const delta = 2; 
    const range = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }
    return range;
  };
  const visiblePages = getVisiblePages();

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col space-y-10">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-teal-600">All Articles</h1>
          <p className="text-lg text-slate-600">Browse through my thoughts and writings.</p>
        </div>
        
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
              prefetch={false}
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
              
              {/* Previous Button */}
              {currentPage > 1 && (
                <PaginationItem>
                  <Link 
                    href={createPageURL(currentPage - 1)} 
                    prefetch={false} 
                    scroll={false}
                    className={cn(buttonVariants({ variant: "ghost" }), "gap-1 pl-2.5 hover:text-teal-600")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </Link>
                </PaginationItem>
              )}
              
              {/* First Page Always Visible */}
              <PaginationItem>
                <Link 
                  href={createPageURL(1)} 
                  prefetch={false} 
                  scroll={false}
                  className={cn(
                    buttonVariants({ variant: currentPage === 1 ? "outline" : "ghost", size: "icon" }),
                    currentPage === 1 && "bg-teal-50 text-teal-700 hover:bg-teal-100 border-none"
                  )}
                >
                  1
                </Link>
              </PaginationItem>

              {/* Left Ellipsis */}
              {visiblePages[0] > 2 && (
                <PaginationItem><PaginationEllipsis /></PaginationItem>
              )}

              {/* Dynamic Middle Pages */}
              {visiblePages.map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <Link 
                    href={createPageURL(pageNum)} 
                    prefetch={false} 
                    scroll={false}
                    className={cn(
                      buttonVariants({ variant: currentPage === pageNum ? "outline" : "ghost", size: "icon" }),
                      currentPage === pageNum && "bg-teal-50 text-teal-700 hover:bg-teal-100 border-none"
                    )}
                  >
                    {pageNum}
                  </Link>
                </PaginationItem>
              ))}

              {/* Right Ellipsis */}
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <PaginationItem><PaginationEllipsis /></PaginationItem>
              )}

              {/* Last Page Always Visible */}
              {totalPages > 1 && (
                <PaginationItem>
                  <Link 
                    href={createPageURL(totalPages)} 
                    prefetch={false} 
                    scroll={false}
                    className={cn(
                      buttonVariants({ variant: currentPage === totalPages ? "outline" : "ghost", size: "icon" }),
                      currentPage === totalPages && "bg-teal-50 text-teal-700 hover:bg-teal-100 border-none"
                    )}
                  >
                    {totalPages}
                  </Link>
                </PaginationItem>
              )}

              {/* Next Button */}
              {currentPage < totalPages && (
                <PaginationItem>
                  <Link 
                    href={createPageURL(currentPage + 1)} 
                    prefetch={false} 
                    scroll={false}
                    className={cn(buttonVariants({ variant: "ghost" }), "gap-1 pr-2.5 hover:text-teal-600")}
                  >
                    <span>Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </PaginationItem>
              )}

            </PaginationContent>
          </Pagination>
        </div>
      )}
    </main>
  );
}
