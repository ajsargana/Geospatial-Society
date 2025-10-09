import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, LogOut, FileText, Calendar, Users, Image, UserPlus, BookOpen } from "lucide-react";
import NewsManager from "./NewsManager";
import EventsManager from "./EventsManager";
import PublicationsManager from "./PublicationsManager";
import LeadershipManager from "./LeadershipManager";
import GalleryManager from "./GalleryManager";
import InductionFormsManager from "./InductionFormsManager";
import ResourcesManager from "./ResourcesManager";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api";

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  // Fetch dashboard stats
  const { data: stats } = useQuery({
    queryKey: ["/api/admin/stats"],
    queryFn: async () => {
      const [newsRes, eventsRes, publicationsRes, leadershipRes, galleryRes, formsRes] = await Promise.all([
        apiFetch("/api/news"),
        apiFetch("/api/events"),
        apiFetch("/api/publications"),
        apiFetch("/api/leadership"),
        apiFetch("/api/gallery"),
        apiFetch("/api/admin/induction-forms"),
      ]);

      const news = await newsRes.json();
      const events = await eventsRes.json();
      const publications = await publicationsRes.json();
      const leadership = await leadershipRes.json();
      const gallery = await galleryRes.json();
      const forms = await formsRes.json();

      return {
        news: news.length,
        publishedNews: news.filter((n: any) => n.published).length,
        events: events.length,
        upcomingEvents: events.filter((e: any) => new Date(e.date) > new Date()).length,
        publications: publications.length,
        leadership: leadership.length,
        gallery: gallery.length,
        publishedGallery: gallery.filter((g: any) => g.published).length,
        inductionForms: forms.length,
        pendingForms: forms.filter((f: any) => f.status === "pending").length,
      };
    },
  });

  const handleLogout = async () => {
    try {
      await apiFetch("/api/admin/logout", {
        method: "POST"
      });
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      onLogout();
    } catch (error) {
      console.error("Logout error:", error);
      onLogout(); // Force logout even if API call fails
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" data-testid="text-admin-title">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {user.username}
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            data-testid="button-logout"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-8 mb-6">
            <TabsTrigger value="overview" data-testid="tab-overview">
              Overview
            </TabsTrigger>
            <TabsTrigger value="news" data-testid="tab-news">
              <FileText className="h-4 w-4 mr-2" />
              News
            </TabsTrigger>
            <TabsTrigger value="events" data-testid="tab-events">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="publications" data-testid="tab-publications">
              <FileText className="h-4 w-4 mr-2" />
              Publications
            </TabsTrigger>
            <TabsTrigger value="leadership" data-testid="tab-leadership">
              <Users className="h-4 w-4 mr-2" />
              Leadership
            </TabsTrigger>
            <TabsTrigger value="gallery" data-testid="tab-gallery">
              <Image className="h-4 w-4 mr-2" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="resources" data-testid="tab-resources">
              <BookOpen className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="induction" data-testid="tab-induction">
              <UserPlus className="h-4 w-4 mr-2" />
              Induction
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total News</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="stat-total-news">
                    {stats?.news || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stats?.publishedNews || 0} published
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="stat-total-events">
                    {stats?.events || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stats?.upcomingEvents || 0} upcoming
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Publications</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="stat-total-publications">
                    {stats?.publications || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Research papers & reports
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Leadership</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="stat-total-leadership">
                    {stats?.leadership || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Team members
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Gallery</CardTitle>
                  <Image className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="stat-total-gallery">
                    {stats?.gallery || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stats?.publishedGallery || 0} published
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Induction Forms</CardTitle>
                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="stat-total-induction">
                    {stats?.inductionForms || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stats?.pendingForms || 0} pending
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <Button 
                    onClick={() => setActiveTab("news")}
                    variant="outline"
                    className="h-20 flex flex-col"
                    data-testid="button-quick-news"
                  >
                    <Plus className="h-6 w-6 mb-2" />
                    Add News
                  </Button>
                  <Button 
                    onClick={() => setActiveTab("events")}
                    variant="outline"
                    className="h-20 flex flex-col"
                    data-testid="button-quick-event"
                  >
                    <Plus className="h-6 w-6 mb-2" />
                    Add Event
                  </Button>
                  <Button 
                    onClick={() => setActiveTab("publications")}
                    variant="outline"
                    className="h-20 flex flex-col"
                    data-testid="button-quick-publication"
                  >
                    <Plus className="h-6 w-6 mb-2" />
                    Add Publication
                  </Button>
                  <Button 
                    onClick={() => setActiveTab("leadership")}
                    variant="outline"
                    className="h-20 flex flex-col"
                    data-testid="button-quick-leadership"
                  >
                    <Plus className="h-6 w-6 mb-2" />
                    Add Member
                  </Button>
                  <Button 
                    onClick={() => setActiveTab("gallery")}
                    variant="outline"
                    className="h-20 flex flex-col"
                    data-testid="button-quick-gallery"
                  >
                    <Plus className="h-6 w-6 mb-2" />
                    Add Image
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news">
            <NewsManager />
          </TabsContent>

          <TabsContent value="events">
            <EventsManager />
          </TabsContent>

          <TabsContent value="publications">
            <PublicationsManager />
          </TabsContent>

          <TabsContent value="leadership">
            <LeadershipManager />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>

          <TabsContent value="resources">
            <ResourcesManager />
          </TabsContent>

          <TabsContent value="induction">
            <InductionFormsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}