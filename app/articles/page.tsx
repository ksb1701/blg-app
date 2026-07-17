import { Suspense } from "react";
import Form from "next/form";
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

async function ArticleList({ query, currentPage }: { query: string; currentPage: number }) {
  await dbConnect();
  
  const limit = 6;
  const skip = (currentPage - 1) * limit;
  
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
    <>
      {/* Articles List */}
      <div className="flex flex-col">
        {articles.length === 0 ? (
          <p className="text-slate-500 py-10 text-center text-lg">No articles found.</p>
        ) : (
          articles.map((article) => (
            <Link 
              href={`/articles/${article.slug}`} 
              key={article._id?.toString()}
              className="group py-8 border-b border-slate-200 last:border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-4 rounded-sm"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
                {article.title}
              </h2>
              
              <p className="text-slate-600 text-lg leading-relaxed mb-4 line-clamp-3">
                {article.description}
              </p>
              
              <div className="flex items-center text-teal-600 font-semibold text-sm">
                Read article 
                <span aria-hidden="true" className="ml-2 transition-transform duration-100 group-hover:translate-x-1.5">
                  &rarr;
                </span>
              </div>
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
    </>
  );
}

function ArticleListSkeleton() {
  return (
    <div className="flex flex-col space-y-8 animate-pulse mt-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="py-8 border-b border-slate-200 last:border-none">
          <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-slate-200 rounded w-5/6 mb-4"></div>
          <div className="h-4 bg-slate-200 rounded w-24"></div>
        </div>
      ))}
    </div>
  );
}

export default async function Articles({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>; 
}) {
  const resolvedParams = await searchParams; 

  const currentPage = Number(resolvedParams?.page) || 1;
  const query = resolvedParams?.query || "";

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col space-y-10">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-teal-600">All Articles</h1>
          <p className="text-md text-slate-600">Browse through my thoughts and writings.</p>
        </div>
        
        <Form action="/articles" className="w-full md:w-72">
          <Field>
            <FieldLabel className="sr-only">Search your articles</FieldLabel>
            <Input 
              type="text" 
              name="query"
              defaultValue={query}
              placeholder="Search Articles" 
              className="border-slate-300 focus-visible:ring-teal-600"
            />
          </Field>
        </Form>
      </div>

      <Suspense fallback={<ArticleListSkeleton />} key={query + currentPage}>
        <ArticleList query={query} currentPage={currentPage} />
      </Suspense>
    </main>
  );
}
