
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Microscope, Users, Calendar, ExternalLink, FileText } from "lucide-react";

export default function ResearchProjects() {
  const projects = [
    {
      title: "Satellite-based Crop Monitoring System",
      description: "Development of an automated system for monitoring crop health and yield prediction using satellite imagery and machine learning algorithms.",
      status: "Ongoing",
      duration: "Jan 2024 - Dec 2024",
      team: ["Dr. Ahmad Hassan", "Muhammad Ali", "Fatima Khan"],
      technologies: ["Python", "TensorFlow", "QGIS", "Google Earth Engine"],
      category: "Agriculture"
    },
    {
      title: "Urban Heat Island Analysis",
      description: "Comprehensive study of urban heat patterns in major Pakistani cities using thermal satellite data and ground-based measurements.",
      status: "Completed",
      duration: "Mar 2023 - Nov 2023",
      team: ["Dr. Sarah Ahmed", "Hassan Raza", "Aisha Malik"],
      technologies: ["MATLAB", "ArcGIS", "Landsat", "MODIS"],
      category: "Urban Planning"
    },
    {
      title: "Flood Risk Assessment Model",
      description: "Development of a comprehensive flood risk assessment model for Pakistan using DEM data, precipitation patterns, and hydrological modeling.",
      status: "Ongoing",
      duration: "Jun 2023 - May 2024",
      team: ["Dr. Ali Rehman", "Omar Sheikh", "Zara Hussain"],
      technologies: ["R", "HEC-RAS", "ArcGIS Pro", "Python"],
      category: "Disaster Management"
    },
    {
      title: "Deforestation Monitoring in Northern Areas",
      description: "Time-series analysis of forest cover changes in northern Pakistan using multi-temporal satellite imagery and change detection algorithms.",
      status: "Planning",
      duration: "Apr 2024 - Mar 2025",
      team: ["Dr. Kamran Ali", "Salman Ahmed", "Nida Fatima"],
      technologies: ["Google Earth Engine", "JavaScript", "ENVI", "Python"],
      category: "Environmental"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ongoing": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Planning": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Agriculture: "bg-green-100 text-green-700",
      "Urban Planning": "bg-purple-100 text-purple-700",
      "Disaster Management": "bg-red-100 text-red-700",
      Environmental: "bg-blue-100 text-blue-700"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-research-title">
            Research Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our ongoing and completed research initiatives in geospatial sciences, 
            remote sensing, and geographic information systems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 mb-12">
          {projects.map((project, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                    <div className="flex gap-2 mb-3">
                      <Badge className={`${getStatusColor(project.status)} border-0`}>
                        {project.status}
                      </Badge>
                      <Badge className={`${getCategoryColor(project.category)} border-0`}>
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <Microscope className="h-8 w-8 text-primary flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{project.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Duration
                    </h4>
                    <p className="text-sm text-muted-foreground">{project.duration}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Research Team
                    </h4>
                    <div className="text-sm text-muted-foreground">
                      {project.team.map((member, memberIndex) => (
                        <div key={memberIndex}>{member}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Technologies & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open('mailto:geospatial@ist.edu.pk?subject=Research Project Inquiry - ' + project.title, '_blank')}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Request Details
                  </Button>
                  {project.status === "Completed" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open('/publications', '_self')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Publication
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="text-center">
          <CardContent className="p-8">
            <Microscope className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-4">Collaborate With Us</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Interested in collaborating on research projects or proposing new research initiatives? 
              Contact our research team to discuss opportunities.
            </p>
            <Button 
              onClick={() => window.open('mailto:geospatial@ist.edu.pk?subject=Research Collaboration Inquiry', '_blank')}
            >
              Get in Touch
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
