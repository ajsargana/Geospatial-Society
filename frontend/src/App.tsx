import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import News from "@/pages/News";
import Events from "@/pages/Events";
import Publications from "@/pages/Publications";
import Admin from "@/pages/Admin";
import Membership from "@/pages/Membership";
import Gallery from "@/pages/Gallery";
import ResearchProjects from "@/pages/ResearchProjects";
import JobOpportunities from "@/pages/JobOpportunities";
import StudentResources from "@/pages/StudentResources";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import InductionForm from "@/pages/InductionForm";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/news" component={News} />
      <Route path="/events" component={Events} />
      <Route path="/publications" component={Publications} />
      <Route path="/admin" component={Admin} />
      <Route path="/membership" component={Membership} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/research-projects" component={ResearchProjects} />
      <Route path="/job-opportunities" component={JobOpportunities} />
      <Route path="/student-resources" component={StudentResources} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/induction" component={InductionForm} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <Header darkMode={theme === "dark"} toggleDarkMode={toggleTheme} />
      <main>
        <Router />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <AppContent />
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;