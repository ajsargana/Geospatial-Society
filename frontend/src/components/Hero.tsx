import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Hero_background_satellite_imagery_a27f4155.png";
import { ArrowRight, Users, Globe, BookOpen } from "lucide-react";

export default function Hero() {
  return (
    <section 
      className="relative min-h-[80vh] flex items-center justify-center"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6" data-testid="text-hero-title">
          Advancing
          <span className="block text-blue-300">GeoSpatial Sciences</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200" data-testid="text-hero-description">
          The Institute of Space Technology GeoSpatial Society is dedicated to fostering innovation 
          in remote sensing, geographic information systems, and spatial information sciences through 
          research, education, and collaboration.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            data-testid="button-join-society"
            onClick={() => window.location.href = '/contact'}
          >
            Join Our Society
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8"
            data-testid="button-learn-more"
            onClick={() => window.location.href = '/about'}
          >
            Learn More
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center" data-testid="stat-members">
            <Users className="h-8 w-8 mx-auto mb-2 text-blue-300" />
            <div className="text-3xl font-bold mb-1">500+</div>
            <div className="text-sm text-gray-300">Active Members</div>
          </div>
          <div className="text-center" data-testid="stat-projects">
            <Globe className="h-8 w-8 mx-auto mb-2 text-blue-300" />
            <div className="text-3xl font-bold mb-1">150+</div>
            <div className="text-sm text-gray-300">Research Projects</div>
          </div>
          <div className="text-center" data-testid="stat-publications">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-300" />
            <div className="text-3xl font-bold mb-1">200+</div>
            <div className="text-sm text-gray-300">Publications</div>
          </div>
        </div>
      </div>
    </section>
  );
}