import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, ExternalLink } from "lucide-react";

interface LeaderCardProps {
  name: string;
  title: string;
  role: string;
  department: string;
  bio: string;
  email?: string;
  linkedin?: string;
  website?: string;
  photo?: string;
  expertise: string[];
}

export default function LeaderCard({
  name,
  title,
  role,
  department,
  bio,
  email,
  linkedin,
  website,
  photo,
  expertise
}: LeaderCardProps) {
  return (
    <Card className="hover-elevate transition-all duration-200 h-full flex flex-col">
      <CardContent className="flex-1 p-6 text-center">
        {/* Photo */}
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
          {photo ? (
            <img 
              src={photo} 
              alt={name} 
              className="w-full h-full object-cover"
              data-testid="img-leader-photo"
              onError={(e) => {
                // Fallback to default if image fails to load
                (e.target as HTMLImageElement).src = '/api/placeholder/96/96';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground text-2xl font-semibold">
              {name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
        </div>

        {/* Basic Info */}
        <h3 className="font-semibold text-lg mb-1" data-testid="text-leader-name">
          {name}
        </h3>
        <p className="text-primary font-medium text-sm mb-1" data-testid="text-leader-title">
          {title}
        </p>
        <Badge variant="secondary" className="mb-3" data-testid="badge-leader-role">
          {role}
        </Badge>

        <p className="text-sm text-muted-foreground mb-4" data-testid="text-leader-department">
          {department}
        </p>

        {/* Bio */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-4" data-testid="text-leader-bio">
          {bio}
        </p>

        {/* Expertise */}
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Expertise:</h4>
          <div className="flex flex-wrap gap-1 justify-center">
            {expertise.map((skill, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs"
                data-testid={`badge-expertise-${index}`}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Contact Links */}
        <div className="flex gap-2 justify-center mt-auto">
          {email && (
            <Button 
              variant="outline" 
              size="sm" 
              data-testid="button-email"
              onClick={() => window.open(`mailto:${email}`, '_blank')}
            >
              <Mail className="h-4 w-4" />
            </Button>
          )}
          {linkedin && (
            <Button 
              variant="outline" 
              size="sm" 
              data-testid="button-linkedin"
              onClick={() => window.open(linkedin, '_blank')}
            >
              <Linkedin className="h-4 w-4" />
            </Button>
          )}
          {website && (
            <Button 
              variant="outline" 
              size="sm" 
              data-testid="button-website"
              onClick={() => window.open(website, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}