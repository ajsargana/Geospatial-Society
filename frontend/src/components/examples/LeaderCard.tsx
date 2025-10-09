import LeaderCard from "../LeaderCard";
import leaderPhoto from "../../assets/leader-placeholder.svg";

export default function LeaderCardExample() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl">
      <LeaderCard
        name="Prof. Ana Rodriguez"
        title="President"
        role="Society Leadership"
        department="Department of Civil Engineering, IST"
        bio="Leading researcher in remote sensing applications for urban planning and environmental monitoring. Over 20 years of experience in geospatial technology development and education."
        email="ana.rodriguez@ist.edu"
        linkedin="https://linkedin.com/in/ana-rodriguez"
        website="https://ana-rodriguez.research.ist.edu"
        photo={leaderPhoto}
        expertise={["Remote Sensing", "Urban Planning", "Environmental Monitoring", "GIS Applications"]}
      />
      
      <LeaderCard
        name="Dr. Miguel Santos"
        title="Vice President"
        role="Society Leadership"
        department="Department of Mathematics, IST"
        bio="Expert in spatial statistics and geospatial data analysis. Focuses on developing new methodologies for processing large-scale satellite datasets and machine learning applications."
        email="miguel.santos@ist.edu"
        linkedin="https://linkedin.com/in/miguel-santos"
        expertise={["Spatial Statistics", "Machine Learning", "Data Analysis", "Satellite Processing"]}
      />
      
      <LeaderCard
        name="Dr. Sofia Pereira"
        title="Secretary"
        role="Society Leadership"
        department="Department of Computer Science, IST"
        bio="Specialist in geospatial software development and web-based GIS solutions. Leads several open-source projects in the geospatial community."
        email="sofia.pereira@ist.edu"
        expertise={["Software Development", "Web GIS", "Open Source", "Database Management"]}
      />
    </div>
  );
}