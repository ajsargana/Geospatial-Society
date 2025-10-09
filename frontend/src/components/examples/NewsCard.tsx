import NewsCard from "../NewsCard";
import conferenceImage from "@assets/generated_images/Academic_conference_presentation_70eacba1.png";

export default function NewsCardExample() {
  return (
    <div className="grid gap-6 max-w-4xl">
      <NewsCard
        title="Annual GeoSpatial Conference 2025 Registration Now Open"
        excerpt="Join us for our biggest conference yet, featuring keynote speakers from NASA, ESA, and leading research institutions. Early bird registration ends March 15th."
        date="January 15, 2025"
        category="Conference"
        image={conferenceImage}
        featured={true}
      />
      
      <div className="grid md:grid-cols-2 gap-6">
        <NewsCard
          title="New Remote Sensing Research Grant Opportunities"
          excerpt="The society announces new funding opportunities for graduate students and early career researchers in remote sensing applications."
          date="January 10, 2025"
          category="Research"
        />
        
        <NewsCard
          title="Partnership with International Space Agency"
          excerpt="Exciting new collaboration opens doors for student internships and joint research projects in satellite data analysis."
          date="December 20, 2024"
          category="Partnership"
        />
      </div>
    </div>
  );
}