import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, ExternalLink, Calendar } from "lucide-react";

interface PublicationCardProps {
  title: string;
  authors: string[];
  journal: string;
  date: string;
  type: 'journal' | 'conference' | 'report' | 'newsletter';
  abstract: string;
  downloadUrl?: string;
  externalUrl?: string;
  cover?: string;
}

export default function PublicationCard({
  title,
  authors,
  journal,
  date,
  type,
  abstract,
  downloadUrl,
  externalUrl,
  cover
}: PublicationCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'journal': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'conference': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'report': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'newsletter': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <Card className="hover-elevate transition-all duration-200 h-full flex flex-col">
      <CardContent className="flex-1 p-6">
        {cover && (
          <div className="w-16 h-20 bg-muted rounded mb-4 overflow-hidden flex-shrink-0">
            <img 
              src={cover} 
              alt="Publication cover" 
              className="w-full h-full object-cover"
              data-testid="img-publication-cover"
            />
          </div>
        )}
        
        <div className="flex items-start justify-between mb-4">
          <Badge className={`${getTypeColor(type)} border-0`} data-testid="badge-publication-type">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span data-testid="text-publication-date">{date}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2" data-testid="text-publication-title">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3" data-testid="text-publication-authors">
          {authors.join(', ')}
        </p>
        
        <p className="text-sm font-medium text-primary mb-3" data-testid="text-publication-journal">
          {journal}
        </p>
        
        <p className="text-sm text-muted-foreground line-clamp-3" data-testid="text-publication-abstract">
          {abstract}
        </p>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <div className="flex gap-2 w-full">
          {downloadUrl && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              data-testid="button-download"
              onClick={() => window.open(downloadUrl, '_blank')}
            >
              <Download className="h-4 w-4 mr-1" />
              PDF
            </Button>
          )}
          {externalUrl && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              data-testid="button-external"
              onClick={() => window.open(externalUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              View
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1"
            data-testid="button-details"
          >
            <FileText className="h-4 w-4 mr-1" />
            Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}