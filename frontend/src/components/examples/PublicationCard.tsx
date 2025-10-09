import PublicationCard from "../PublicationCard";
import publicationCover from "@assets/generated_images/Research_publication_cover_32786d22.png";

export default function PublicationCardExample() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl">
      <PublicationCard
        title="Machine Learning Applications in Satellite Image Classification for Urban Planning"
        authors={["Dr. Maria Santos", "Prof. João Silva", "Ana Costa"]}
        journal="International Journal of Remote Sensing"
        date="December 2024"
        type="journal"
        abstract="This study presents a comprehensive analysis of deep learning techniques for automatic classification of urban features in high-resolution satellite imagery, with applications in smart city planning and development."
        downloadUrl="/downloads/paper1.pdf"
        externalUrl="https://doi.org/example"
        cover={publicationCover}
      />
      
      <PublicationCard
        title="Advances in LiDAR Technology for Forest Monitoring"
        authors={["Dr. Pedro Oliveira", "Prof. Carla Mendes"]}
        journal="ISPRS Conference Proceedings"
        date="November 2024"
        type="conference"
        abstract="Comprehensive review of recent developments in LiDAR technology and its applications in forest inventory, biomass estimation, and environmental monitoring."
        downloadUrl="/downloads/paper2.pdf"
      />
      
      <PublicationCard
        title="GeoSpatial Society Annual Report 2024"
        authors={["IST GeoSpatial Society"]}
        journal="Internal Publication"
        date="January 2025"
        type="report"
        abstract="Annual summary of society activities, research achievements, member contributions, and strategic planning for the upcoming year."
        downloadUrl="/downloads/annual-report-2024.pdf"
      />
    </div>
  );
}