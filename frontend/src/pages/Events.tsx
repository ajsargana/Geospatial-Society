
import { useQuery } from "@tanstack/react-query";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar } from "lucide-react";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import backdropImage from "@/assets/Gemini_Generated_Image_nz3ahnz3ahnz3ahn.png";

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Fetch published events
  const { data: events, isLoading } = useQuery({
    queryKey: ["/api/events", { published: true }],
    queryFn: async () => {
      const response = await apiFetch("/api/events?published=true");
      if (!response.ok) throw new Error("Failed to fetch events");
      return response.json();
    },
  });

  const filteredEvents = events?.filter((event: any) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || event.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const eventTypes = ["workshop", "seminar", "conference", "webinar"];

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-3 text-muted-foreground">Loading events...</span>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-events-page-title">
            Events & Workshops
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our community events, workshops, seminars, and conferences to advance 
            your knowledge in geospatial sciences and network with professionals.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search-events"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="md:w-48" data-testid="select-type-filter">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {eventTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Events Grid */}
        {filteredEvents && filteredEvents.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event: any) => (
              <EventCard
                key={event.id}
                title={event.title}
                date={new Date(event.date).toLocaleDateString()}
                time={event.time}
                location={event.location}
                type={event.type as any}
                capacity={event.capacity}
                registered={event.registered}
                description={event.description}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="mb-4">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground">
                {searchTerm || typeFilter !== "all" 
                  ? "Try adjusting your search or filter criteria."
                  : "Check back soon for upcoming events and workshops."}
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
