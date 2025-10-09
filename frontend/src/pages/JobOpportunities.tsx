
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Clock, DollarSign, Users, ExternalLink } from "lucide-react";

export default function JobOpportunities() {
  const jobs = [
    {
      title: "GIS Analyst",
      company: "Space & Upper Atmosphere Research Commission (SUPARCO)",
      location: "Karachi, Pakistan",
      type: "Full-time",
      salary: "Rs. 80,000 - 120,000",
      experience: "2-4 years",
      skills: ["ArcGIS", "QGIS", "Python", "SQL", "Remote Sensing"],
      description: "Join our team to work on satellite data analysis and geospatial mapping projects for national development initiatives.",
      posted: "2 days ago"
    },
    {
      title: "Remote Sensing Specialist",
      company: "National Disaster Management Authority (NDMA)",
      location: "Islamabad, Pakistan",
      type: "Full-time",
      salary: "Rs. 100,000 - 150,000",
      experience: "3-5 years",
      skills: ["ENVI", "ERDAS", "Google Earth Engine", "Machine Learning", "Disaster Assessment"],
      description: "Lead remote sensing projects for disaster monitoring and emergency response planning across Pakistan.",
      posted: "1 week ago"
    },
    {
      title: "Geospatial Data Scientist",
      company: "TkXel Technologies",
      location: "Lahore, Pakistan",
      type: "Full-time",
      salary: "Rs. 120,000 - 180,000",
      experience: "3-6 years",
      skills: ["Python", "R", "Machine Learning", "Big Data", "Cloud Computing"],
      description: "Develop innovative geospatial solutions using cutting-edge data science techniques for various industries.",
      posted: "3 days ago"
    },
    {
      title: "Junior GIS Developer",
      company: "Systems Limited",
      location: "Islamabad, Pakistan",
      type: "Full-time",
      salary: "Rs. 50,000 - 80,000",
      experience: "0-2 years",
      skills: ["JavaScript", "Web GIS", "Leaflet", "OpenLayers", "HTML/CSS"],
      description: "Entry-level position for fresh graduates to develop web-based GIS applications and mapping solutions.",
      posted: "5 days ago"
    },
    {
      title: "Surveying Engineer",
      company: "National Highway Authority (NHA)",
      location: "Multiple Cities",
      type: "Full-time",
      salary: "Rs. 70,000 - 100,000",
      experience: "2-5 years",
      skills: ["Land Surveying", "GPS", "Total Station", "AutoCAD", "Civil Engineering"],
      description: "Conduct field surveys and mapping for highway development and infrastructure projects.",
      posted: "1 week ago"
    },
    {
      title: "Spatial Database Administrator",
      company: "Punjab Land Records Authority",
      location: "Lahore, Pakistan",
      type: "Full-time",
      salary: "Rs. 90,000 - 130,000",
      experience: "3-7 years",
      skills: ["PostgreSQL", "PostGIS", "Oracle", "Database Design", "Data Management"],
      description: "Manage and optimize spatial databases for the provincial land records digitization project.",
      posted: "4 days ago"
    }
  ];

  const internships = [
    {
      title: "GIS Research Intern",
      company: "IST GeoSpatial Research Lab",
      duration: "3-6 months",
      stipend: "Rs. 15,000/month",
      requirements: ["BS/MS in relevant field", "Basic GIS knowledge", "Research interest"]
    },
    {
      title: "Remote Sensing Intern",
      company: "Pakistan Space Agency",
      duration: "4 months",
      stipend: "Rs. 20,000/month",
      requirements: ["Engineering/Science background", "Image processing knowledge", "Programming skills"]
    }
  ];

  const getTypeColor = (type: string) => {
    return type === "Full-time" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800";
  };

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-jobs-title">
            Job Opportunities
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover exciting career opportunities in geospatial sciences, remote sensing, 
            and GIS across Pakistan and beyond.
          </p>
        </div>

        {/* Job Listings */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8">Current Openings</h2>
          <div className="grid gap-6">
            {jobs.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <p className="text-lg text-primary font-semibold mb-2">{job.company}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={`${getTypeColor(job.type)} border-0`}>
                          {job.type}
                        </Badge>
                        <Badge variant="outline">{job.experience}</Badge>
                      </div>
                    </div>
                    <Briefcase className="h-8 w-8 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{job.description}</p>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{job.posted}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => window.open('mailto:geospatial@ist.edu.pk?subject=Job Application - ' + job.title, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Internships */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8">Internship Opportunities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {internships.map((internship, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{internship.title}</CardTitle>
                  <p className="text-primary font-semibold">{internship.company}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="font-medium">Duration:</span>
                      <span>{internship.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Stipend:</span>
                      <span>{internship.stipend}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Requirements</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {internship.requirements.map((req, reqIndex) => (
                        <li key={reqIndex}>• {req}</li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open('mailto:geospatial@ist.edu.pk?subject=Internship Application - ' + internship.title, '_blank')}
                  >
                    Apply for Internship
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Career Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Career Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Resume Building</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Get help crafting a professional resume tailored for geospatial careers.
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Interview Preparation</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Access our guide for common GIS and remote sensing interview questions.
                </p>
                <Button variant="outline" size="sm">View Guide</Button>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Skill Development</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Enhance your technical skills with our recommended courses and certifications.
                </p>
                <Button variant="outline" size="sm">Explore</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
