import { Button } from "@/components/ui/button";

export default function Home() {
  const featuredArticles = [
    {
      name: 'A',
      banner: 'Banner Placeholder A',
      description: 'Article for grid 1'
    },
    {
      name: 'B',
      banner: 'Banner Placeholder B',
      description: 'Article for grid 2'
    },
    {
      name: 'C',
      banner: 'Banner Placeholder C',
      description: 'Article for grid 3'
    },
    {
      name: 'D',
      banner: 'Banner Placeholder D',
      description: 'Article for grid 4'
    }
  ];

  return (
    <div>
      
      {/* Main container matching the Navbar's max-width and padding */}
      <main className="max-w-6xl text-center mx-auto px-4 sm:px-6 lg:px-8 py-0.5 sm:py-6 flex flex-col space-y-8">
        
        {/* Header Section */}
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-teal-600">
            Welcome to my blog!
          </h1>
          <p className="text-lg text-slate-600">
            I have made this website to keep track of things that I found interesting. Hope you also enjoy the stuff that I have written! Here are a few featured articles to start with:
          </p>
        </div>

        {/* Responsive Grid: 1 column on mobile, 2 on sm screens and up */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {featuredArticles.map((article, index) => (
            // The key prop is required by React for mapped elements
            <div 
              key={index} 
              className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:cursor-pointer"
            >
              {/* Image / Banner Container */}
              <div className="h-48 bg-slate-200 flex items-center justify-center text-slate-500">
                {article.banner}
              </div>
              
              {/* Text Content Container */}
              <div className="p-6 flex flex-col">
                <h2 className="text-xl font-bold text-slate-900 mb-2">{article.name}</h2>
                <p className="text-slate-600">{article.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Button Wrapper */}
        <div>
          <Button size="lg">
            More Articles &gt;
          </Button>
        </div>

      </main>
    </div>
  );
}
