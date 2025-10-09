
import { useQuery } from "@tanstack/react-query";
import PublicationCard from "@/components/PublicationCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, FileText } from "lucide-react";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import backdropImage from "@/assets/Gemini_Generated_Image_uvunuguvunuguvun.png";

export default function Publications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Fetch published publications
  const { data: publications, isLoading } = useQuery({
    queryKey: ["/api/publications", { published: true }],
    queryFn: async () => {
      const response = await apiFetch("/api/publications?published=true");
      if (!response.ok) throw new Error("Failed to fetch publications");
      return response.json();
    },
  });

  const filteredPublications = publications?.filter((publication: any) => {
    const matchesSearch = publication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         publication.authors.some((author: string) => 
                           author.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         publication.abstract.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || publication.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const publicationTypes = ["journal", "conference", "report", "newsletter"];

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-3 text-muted-foreground">Loading publications...</span>
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
      <div className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-publications-page-title">
            Research Publications
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our latest research contributions, academic papers, and publications 
            in the field of geospatial sciences and related disciplines.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search publications by title, author, or abstract..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search-publications"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="md:w-48" data-testid="select-type-filter">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {publicationTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Publications Grid */}
        {filteredPublications && filteredPublications.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPublications.map((publication: any) => (
              <PublicationCard
                key={publication.id}
                title={publication.title}
                authors={publication.authors}
                journal={publication.journal}
                date={new Date(publication.date).toLocaleDateString()}
                type={publication.type as any}
                abstract={publication.abstract}
                cover={publication.coverUrl}
                downloadUrl={publication.downloadUrl}
                externalUrl={publication.externalUrl}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="mb-4">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No publications found</h3>
              <p className="text-muted-foreground">
                {searchTerm || typeFilter !== "all" 
                  ? "Try adjusting your search or filter criteria."
                  : "Check back soon for the latest research publications."}
              </p>
            </div>
            {(searchTerm || typeFilter !== "all") && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setTypeFilter("all");
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
