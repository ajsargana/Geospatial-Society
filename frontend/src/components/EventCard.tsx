import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'workshop' | 'seminar' | 'conference' | 'webinar';
  capacity?: number;
  registered?: number;
  description: string;
}

export default function EventCard({ 
  title, 
  date, 
  time, 
  location, 
  type, 
  capacity, 
  registered, 
  description 
}: EventCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'seminar': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'conference': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'webinar': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <Card className="hover-elevate transition-all duration-200 h-full flex flex-col">
      <CardContent className="flex-1 p-6">
        <div className="flex items-start justify-between mb-4">
          <Badge className={`${getTypeColor(type)} border-0`} data-testid="badge-event-type">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
          {capacity && registered && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              <span data-testid="text-capacity">{registered}/{capacity}</span>
            </div>
          )}
        </div>
        
        <h3 className="font-semibold text-lg mb-3 line-clamp-2" data-testid="text-event-title">
          {title}
        </h3>
        
        <div className="space-y-2 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span data-testid="text-event-date">{date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span data-testid="text-event-time">{time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span data-testid="text-event-location">{location}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-3" data-testid="text-event-description">
          {description}
        </p>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button 
          className="w-full" 
          variant={capacity && registered && registered >= capacity ? "secondary" : "default"}
          disabled={!!(capacity && registered && registered >= capacity)}
          data-testid="button-register"
          onClick={() => {
            if (capacity && registered && registered >= capacity) {
              alert('This event is fully booked!');
            } else {
              window.location.href = '/contact';
            }
          }}
        >
          {capacity && registered && registered >= capacity ? 'Fully Booked' : 'Register Now'}
        </Button>
      </CardFooter>
    </Card>
  );
}