import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
  featured?: boolean;
}

export default function NewsCard({ title, excerpt, date, category, image, featured = false }: NewsCardProps) {
  return (
    <Card className={`hover-elevate transition-all duration-200 h-full flex flex-col ${featured ? 'md:col-span-2' : ''}`}>
      {image && (
        <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
            data-testid="img-news-image"
          />
        </div>
      )}
      
      <CardContent className="flex-1 p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" data-testid="badge-category">
            {category}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span data-testid="text-date">{date}</span>
          </div>
        </div>
        
        <h3 className={`font-semibold mb-3 line-clamp-2 ${featured ? 'text-xl' : 'text-lg'}`} data-testid="text-title">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-3" data-testid="text-excerpt">
          {excerpt}
        </p>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button variant="ghost" size="sm" className="p-0 h-auto font-medium" data-testid="button-read-more">
          Read More
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}