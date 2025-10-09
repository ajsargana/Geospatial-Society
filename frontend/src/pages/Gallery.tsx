
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Calendar, MapPin } from "lucide-react";
import { apiFetch } from "@/lib/api";
import backdropImage from "@/assets/Gemini_Generated_Image_vfx133vfx133vfx1.png";

export default function Gallery() {
  const { data: galleryItems = [], isLoading } = useQuery({
    queryKey: ["/api/gallery", "published"],
    queryFn: async () => {
      const response = await apiFetch("/api/gallery?published=true");
      if (!response.ok) throw new Error("Failed to fetch gallery");
      return response.json();
    },
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      Event: "bg-blue-100 text-blue-800",
      Workshop: "bg-green-100 text-green-800",
      Fieldwork: "bg-orange-100 text-orange-800",
      Seminar: "bg-purple-100 text-purple-800",
      Meeting: "bg-red-100 text-red-800",
      Showcase: "bg-yellow-100 text-yellow-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img src={backdropImage} alt="" className="w-full h-full object-cover opacity-30 fixed" />
      </div>
      <div className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-gallery-title">
            Photo Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our collection of memorable moments from events, workshops, fieldwork, 
            and research activities conducted by the IST GeoSpatial Society.
          </p>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="text-center">Loading gallery...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item: any) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <Camera className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <Badge 
                    className={`absolute top-3 left-3 z-20 ${getCategoryColor(item.category)} border-0`}
                  >
                    {item.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-3 line-clamp-2" data-testid="text-gallery-title">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {item.event && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span data-testid="text-gallery-event">{item.event}</span>
                      </div>
                    )}
                    {item.date && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span data-testid="text-gallery-date">
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {item.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span data-testid="text-gallery-location">{item.location}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Note */}
        {galleryItems.length === 0 && !isLoading && (
          <div className="text-center mt-12">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Photo Gallery Coming Soon</h3>
                <p className="text-muted-foreground">
                  We're currently working on organizing our photo collection. 
                  Check back soon to see photos from our latest events and activities!
                </p>
              </CardContent>
            </Card>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
