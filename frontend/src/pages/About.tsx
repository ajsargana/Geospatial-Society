import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import LeaderCard from "@/components/LeaderCard";
import { ArrowRight, Users, Target, Award, Globe } from "lucide-react";
import { Link } from "wouter";
import leaderPhoto from "../assets/leader-placeholder.svg";
import { apiFetch } from "@/lib/api";
import backdropImage from "@/assets/Gemini_Generated_Image_43q08343q08343q0.png";

export default function About() {
  // Fetch leadership data
  const { data: leadership, isLoading: isLoadingLeadership } = useQuery({
    queryKey: ["/api/leadership"],
    queryFn: async () => {
      const response = await apiFetch("/api/leadership?active=true");
      if (!response.ok) throw new Error("Failed to fetch leadership");
      return response.json();
    },
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={backdropImage} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-about-title">
            About IST GeoSpatial Society
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Advancing the frontiers of geospatial sciences through research, education,
            and community engagement at the Institute of Space Technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" data-testid="button-join-us">
                Join Our Community
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" data-testid="button-learn-more">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold" data-testid="text-mission-title">Our Mission</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To foster excellence in geospatial sciences by promoting cutting-edge research,
                facilitating knowledge exchange, and developing the next generation of geospatial
                professionals who will address global challenges through innovative spatial solutions.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold" data-testid="text-vision-title">Our Vision</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To become a leading center of excellence in geospatial sciences, recognized
                internationally for our contributions to remote sensing, GIS applications,
                and spatial data analysis that benefit society and the environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" data-testid="text-values-title">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-card">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-muted-foreground">
                Pursuing the highest standards in research, education, and professional development.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
              <p className="text-muted-foreground">
                Building strong partnerships within academia, industry, and the global community.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card">
              <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                Embracing new technologies and methodologies to solve complex spatial challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" data-testid="text-research-title">
            Research Areas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Remote Sensing",
                description: "Satellite and aerial imagery analysis for environmental monitoring and urban planning."
              },
              {
                title: "Geographic Information Systems",
                description: "Spatial data management and analysis for decision-making and policy development."
              },
              {
                title: "Cartography & Visualization",
                description: "Advanced mapping techniques and spatial data visualization methods."
              },
              {
                title: "Spatial Statistics",
                description: "Statistical analysis of spatial data and geographic patterns."
              },
              {
                title: "Environmental Modeling",
                description: "Climate change analysis and environmental impact assessment."
              },
              {
                title: "Urban Planning",
                description: "Smart city development and sustainable urban growth strategies."
              }
            ].map((area, index) => (
              <div key={index} className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-primary">{area.title}</h3>
                <p className="text-muted-foreground">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" data-testid="text-leadership-title">
            Leadership Team
          </h2>

          {isLoadingLeadership ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3 text-muted-foreground">Loading leadership team...</span>
            </div>
          ) : leadership && leadership.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {leadership.map((member: any) => (
                <LeaderCard
                  key={member.id}
                  name={member.name}
                  title={member.title}
                  role={member.role}
                  department={member.department}
                  bio={member.bio}
                  email={member.email}
                  linkedin={member.linkedin}
                  website={member.website}
                  photo={member.photoUrl || leaderPhoto}
                  expertise={member.expertise}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                Leadership information will be available soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" data-testid="text-cta-title">
            Get Involved
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Whether you're a student, researcher, or industry professional,
            there are many ways to engage with our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" data-testid="button-contact-us">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" data-testid="button-learn-opportunities">
              Explore Opportunities
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}