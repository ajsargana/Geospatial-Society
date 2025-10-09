import { useQuery } from "@tanstack/react-query";
import Hero from "@/components/Hero";
import NewsCard from "@/components/NewsCard";
import EventCard from "@/components/EventCard";
import PublicationCard from "@/components/PublicationCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { apiFetch } from "@/lib/api";

export default function Home() {
  // Fetch published news
  const { data: news } = useQuery({
    queryKey: ["/api/news", { published: true }],
    queryFn: async () => {
      const response = await apiFetch("/api/news?published=true");
      if (!response.ok) throw new Error("Failed to fetch news");
      return response.json();
    },
  });

  // Fetch published events
  const { data: events } = useQuery({
    queryKey: ["/api/events", { published: true }],
    queryFn: async () => {
      const response = await apiFetch("/api/events?published=true");
      if (!response.ok) throw new Error("Failed to fetch events");
      return response.json();
    },
  });

  // Fetch published publications
  const { data: publications } = useQuery({
    queryKey: ["/api/publications", { published: true }],
    queryFn: async () => {
      const response = await apiFetch("/api/publications?published=true");
      if (!response.ok) throw new Error("Failed to fetch publications");
      return response.json();
    },
  });

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Latest News Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2" data-testid="text-news-title">Latest News</h2>
              <p className="text-muted-foreground">Stay updated with our latest announcements and developments</p>
            </div>
            <Link href="/news">
              <Button variant="outline" data-testid="button-view-all-news">
                View All News
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {news?.slice(0, 3).map((article: any, index: number) => (
              <NewsCard
                key={article.id}
                title={article.title}
                excerpt={article.excerpt}
                date={new Date(article.createdAt).toLocaleDateString()}
                category={article.category}
                image={article.imageUrl}
                featured={index === 0 && article.featured}
              />
            )) || (
              // Fallback content if no news
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">No published news articles yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2" data-testid="text-events-title">Upcoming Events</h2>
              <p className="text-muted-foreground">Join our workshops, seminars, and conferences</p>
            </div>
            <Link href="/events">
              <Button variant="outline" data-testid="button-view-all-events">
                View All Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events?.slice(0, 3).map((event: any) => (
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
            )) || (
              // Fallback content if no events
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">No upcoming events yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Publications Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2" data-testid="text-publications-title">Recent Publications</h2>
              <p className="text-muted-foreground">Explore our latest research and academic contributions</p>
            </div>
            <Link href="/publications">
              <Button variant="outline" data-testid="button-view-all-publications">
                View All Publications
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publications?.slice(0, 3).map((publication: any) => (
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
            )) || (
              // Fallback content if no publications
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">No published publications yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" data-testid="text-cta-title">
            Join Our Community
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Become part of a vibrant community of researchers, students, and professionals 
            advancing the field of geospatial sciences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              data-testid="button-join-membership"
              onClick={() => window.location.href = '/contact'}
            >
              Become a Member
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" data-testid="button-contact-us">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}