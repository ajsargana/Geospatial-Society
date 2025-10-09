import EventCard from "../EventCard";

export default function EventCardExample() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl">
      <EventCard
        title="Advanced Remote Sensing Techniques Workshop"
        date="March 15, 2025"
        time="9:00 AM - 5:00 PM"
        location="IST Main Campus, Room 301"
        type="workshop"
        capacity={30}
        registered={24}
        description="Hands-on workshop covering the latest techniques in satellite image analysis, machine learning applications, and data processing workflows."
      />
      
      <EventCard
        title="GIS Applications in Environmental Monitoring"
        date="March 22, 2025"
        time="2:00 PM - 4:00 PM"
        location="Virtual Event"
        type="webinar"
        capacity={100}
        registered={67}
        description="Online seminar discussing the role of GIS in tracking climate change, biodiversity monitoring, and environmental impact assessment."
      />
      
      <EventCard
        title="International Geospatial Conference 2025"
        date="April 10-12, 2025"
        time="All Day"
        location="Lisbon Convention Center"
        type="conference"
        capacity={500}
        registered={432}
        description="Three-day conference bringing together researchers, industry professionals, and students to share the latest advances in geospatial technology."
      />
    </div>
  );
}