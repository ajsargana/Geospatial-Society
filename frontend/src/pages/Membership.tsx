
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Calendar, Trophy } from "lucide-react";

export default function Membership() {
  const benefits = [
    "Access to exclusive research seminars and workshops",
    "Networking opportunities with industry professionals",
    "Priority registration for conferences and events",
    "Access to research resources and publications",
    "Mentorship programs with senior members",
    "Certificate of membership from IST GeoSpatial Society"
  ];

  const membershipTypes = [
    {
      title: "Student Membership",
      price: "Free",
      description: "For current IST students",
      features: ["Access to seminars", "Student workshops", "Peer networking", "Basic resources"]
    },
    {
      title: "Professional Membership",
      price: "Rs. 5,000/year",
      description: "For working professionals",
      features: ["All student benefits", "Professional workshops", "Industry networking", "Advanced resources", "Mentorship access"]
    },
    {
      title: "Lifetime Membership",
      price: "Rs. 25,000",
      description: "One-time payment",
      features: ["All benefits included", "Lifetime access", "VIP event access", "Research collaboration opportunities"]
    }
  ];

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-membership-title">
            Become a Member
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our community of geospatial professionals and students to advance your career 
            and contribute to cutting-edge research in remote sensing and GIS technologies.
          </p>
        </div>

        {/* Membership Benefits */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Membership Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Membership Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {membershipTypes.map((type, index) => (
            <Card key={index} className={`relative ${index === 1 ? 'border-primary' : ''}`}>
              {index === 1 && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle>{type.title}</CardTitle>
                <div className="text-3xl font-bold text-primary">{type.price}</div>
                <p className="text-muted-foreground">{type.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {type.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={index === 1 ? "default" : "outline"}
                  onClick={() => window.open('mailto:geospatial@ist.edu.pk?subject=Membership Application - ' + type.title, '_blank')}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How to Apply */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              How to Apply
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Choose Your Plan</h3>
                <p className="text-sm text-muted-foreground">Select the membership type that best fits your needs and career goals.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Submit Application</h3>
                <p className="text-sm text-muted-foreground">Send an email with your details and membership preference to our team.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Welcome Aboard</h3>
                <p className="text-sm text-muted-foreground">Once approved, you'll receive your membership confirmation and access details.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
