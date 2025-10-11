
import { useQuery } from "@tanstack/react-query";
import NewsCard from "@/components/NewsCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import backdropImage from "@/assets/Gemini_Generated_Image_m5e217m5e217m5e2.png";

export default function News() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Fetch published news
  const { data: news, isLoading } = useQuery({
    queryKey: ["/api/news", { published: true }],
    queryFn: async () => {
      const response = await apiFetch("/api/news?published=true");
      if (!response.ok) throw new Error("Failed to fetch news");
      return response.json();
    },
  });

  const filteredNews = news?.filter((article: any) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || article.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(news?.map((article: any) => article.category) || [])];

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-3 text-muted-foreground">Loading news...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img src={backdropImage} alt="" className="w-full h-full object-cover opacity-30 fixed" />
      </div>
      <div className="relative z-10 pt-16 pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-news-page-title">
            Latest News & Updates
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay informed with the latest developments, announcements, and achievements 
            from the IST GeoSpatial Society.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search news articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search-news"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="md:w-48" data-testid="select-category-filter">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* News Grid */}
        {filteredNews && filteredNews.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((article: any, index: number) => (
              <NewsCard
                key={article.id}
                title={article.title}
                excerpt={article.excerpt}
                date={new Date(article.createdAt).toLocaleDateString()}
                category={article.category}
                image={article.imageUrl}
                featured={index === 0 && article.featured}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="mb-4">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No news articles found</h3>
              <p className="text-muted-foreground">
                {searchTerm || categoryFilter !== "all" 
                  ? "Try adjusting your search or filter criteria."
                  : "Check back soon for the latest updates and announcements."}
              </p>
            </div>
            {(searchTerm || categoryFilter !== "all") && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                }}
                data-testid="button-clear-filters"
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
