import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Download, ExternalLink, GraduationCap, Users, Calendar } from "lucide-react";
import { apiFetch } from "@/lib/api";

export default function StudentResources() {
  // Fetch published resources from API
  const { data: resourcesData, isLoading: resourcesLoading } = useQuery({
    queryKey: ["/api/resources", { published: true }],
    queryFn: async () => {
      const response = await apiFetch("/api/resources?published=true");
      if (!response.ok) throw new Error("Failed to fetch resources");
      return response.json();
    },
  });

  // Fetch published courses from API
  const { data: coursesData, isLoading: coursesLoading } = useQuery({
    queryKey: ["/api/courses", { published: true }],
    queryFn: async () => {
      const response = await apiFetch("/api/courses?published=true");
      if (!response.ok) throw new Error("Failed to fetch courses");
      return response.json();
    },
  });

  // Fetch published scholarships from API
  const { data: scholarshipsData, isLoading: scholarshipsLoading } = useQuery({
    queryKey: ["/api/scholarships", { published: true }],
    queryFn: async () => {
      const response = await apiFetch("/api/scholarships?published=true");
      if (!response.ok) throw new Error("Failed to fetch scholarships");
      return response.json();
    },
  });

  // Group resources by category
  const resources = resourcesData
    ? resourcesData.reduce((acc: any[], resource: any) => {
        const existingCategory = acc.find(cat => cat.category === resource.category);
        if (existingCategory) {
          existingCategory.items.push(resource);
        } else {
          acc.push({ category: resource.category, items: [resource] });
        }
        return acc;
      }, [])
    : [];

  const courses = coursesData || [];
  const scholarships = scholarshipsData || [];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      Software: "bg-blue-100 text-blue-700",
      Platform: "bg-purple-100 text-purple-700",
      License: "bg-green-100 text-green-700",
      PDF: "bg-red-100 text-red-700",
      Video: "bg-orange-100 text-orange-700",
      eBook: "bg-indigo-100 text-indigo-700",
      Dataset: "bg-cyan-100 text-cyan-700",
      Shapefile: "bg-teal-100 text-teal-700",
      Raster: "bg-pink-100 text-pink-700"
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  const isLoading = resourcesLoading || coursesLoading || scholarshipsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold">Loading resources...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-resources-title">
            Student Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access comprehensive learning materials, software tools, datasets, and opportunities
            to excel in your geospatial studies and research.
          </p>
        </div>

        {/* Learning Resources */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Learning Resources
          </h2>

          {resources.length > 0 ? (
            resources.map((category: any, categoryIndex: number) => (
              <Card key={categoryIndex} className="mb-6">
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.items.map((item: any, itemIndex: number) => (
                      <div key={itemIndex} className="flex items-start justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{item.name}</h4>
                            <Badge className={`${getTypeColor(item.type)} border-0 text-xs`}>
                              {item.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => item.link.startsWith('http') ? window.open(item.link, '_blank') : null}
                        >
                          {item.type === "PDF" || item.type === "eBook" ? <Download className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No resources available yet.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Available Courses */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            Available Courses
          </h2>
          {courses.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {courses.map((course: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <p className="text-muted-foreground">by {course.instructor}</p>
                      </div>
                      <Badge className={`${getLevelColor(course.level)} border-0`}>
                        {course.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                      {course.enrollmentUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(course.enrollmentUrl, '_blank')}
                        >
                          Enroll Now
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No courses available yet.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Scholarships & Grants */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8">Scholarships & Grants</h2>
          {scholarships.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {scholarships.map((scholarship: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{scholarship.name}</CardTitle>
                    <div className="text-2xl font-bold text-primary">{scholarship.amount}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-sm">Criteria:</div>
                        <div className="text-sm text-muted-foreground">{scholarship.criteria}</div>
                      </div>
                      <div>
                        <div className="font-medium text-sm">Deadline:</div>
                        <div className="text-sm text-muted-foreground">{scholarship.deadline}</div>
                      </div>
                    </div>
                    {scholarship.applicationUrl && (
                      <Button
                        className="w-full mt-4"
                        size="sm"
                        onClick={() => window.open(scholarship.applicationUrl, '_blank')}
                      >
                        Apply Now
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No scholarships available yet.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Study Groups */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Study Groups & Communities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">GIS Study Group</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Weekly sessions to practice GIS analysis and discuss projects.
                </p>
                <Button variant="outline" size="sm">Join Group</Button>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold mb-2">Research Circle</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Collaborative research projects and paper writing support.
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold mb-2">Peer Mentoring</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Get paired with senior students for academic guidance.
                </p>
                <Button variant="outline" size="sm">Find Mentor</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
