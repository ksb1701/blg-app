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

export default function Articles() {
  const articles = [
    { id: 1, title: 'Article 1', description: 'A brief description of the first article.' },
    { id: 2, title: 'Article 2', description: 'A brief description of the second article.' },
    { id: 3, title: 'Article 3', description: 'A brief description of the third article.' },
    { id: 4, title: 'Article 4', description: 'A brief description of the fourth article.' },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col space-y-10">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-teal-600">All Articles</h1>
          <p className="text-lg text-slate-600">Browse through my thoughts and writings.</p>
        </div>
        
        <div className="w-full md:w-72">
          <Field>
            <FieldLabel className="sr-only">Search your articles</FieldLabel>
            <Input 
              type="text" 
              placeholder="Search articles..." 
              className="border-slate-300 focus-visible:ring-teal-600"
            />
          </Field>
        </div>
      </div>

      {/* Articles List / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <div 
            key={article.id} 
            className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col hover:border-teal-500 hover:shadow-sm transition-colors cursor-pointer group"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
              {article.title}
            </h2>
            <p className="text-slate-600">{article.description}</p>
          </div>
        ))}
      </div>

      {/* Pagination Wrapper */}
      <div className="pt-8 border-t border-slate-200">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" className="hover:text-teal-600" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              {/* Note: Depending on your shadcn/ui setup, you might need to style the active state inside the component or pass classes */}
              <PaginationLink href="#" isActive className="bg-teal-50 text-teal-700 hover:bg-teal-100 border-none">
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" className="hover:text-teal-600" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

    </main>
  );
}
